
-- views
CREATE VIEW ArrivalsView AS
SELECT Arrivals.ArrivalTime, Street, BusStops.Name, BusLines.LineNumber
FROM Arrivals
LEFT JOIN BusStops
ON Arrivals.BusStopId = BusStops.Id
LEFT JOIN RouteRuns
ON Arrivals.RouteRunId = RouteRuns.Id
LEFT JOIN BusLines
ON RouteRuns.BusLineId = BusLines.Id

CREATE VIEW ActiveBoughtTicket AS
SELECT Tickets.EstimatedEndDate,StartDate, BusLines.LineNumber, TicketTypes.Name
FROM Tickets
LEFT JOIN BusLines
ON Tickets.BusLineId = BusLines.Id
LEFT JOIN TicketTypes
ON Tickets.TicketTypeId = TicketTypes.Id
WHERE EstimatedEndDate >= GETDATE()

CREATE VIEW All_Stops AS
SELECT BS.Id AS 'BusStopId', Bs.Name AS 'BusStopName', RR.Direction, RR.BusLineId
FROM Arrivals AS A
LEFT JOIN RouteRuns RR ON RouteRunId=RR.Id
LEFT JOIN BusStops BS ON BS.Id=A.BusStopId
GROUP BY BS.Id, BS.Name, RR.BusLineId, RR.Direction

CREATE VIEW EndStops
AS
SELECT 
V.BusLineId, V.Direction,
MIN(CASE WHEN seqnum_asc = 1 THEN V.Name END) AS FirstBusStop,
MIN(CASE WHEN seqnum_desc = 1 THEN V.Name END) AS LastBusStop
FROM (SELECT BS.Name, RR.Direction, RR.BusLineId,
			row_number() OVER (partition by RR.Id order by A.ArrivalTime asc) as seqnum_asc,
			row_number() over (partition by RR.Id order by A.ArrivalTime desc) as seqnum_desc
		from Arrivals A
		LEFT JOIN RouteRuns RR on RR.Id=RouteRunId
		LEFT JOIN BusStops BS on BS.Id=BusStopId
		) V
WHERE seqnum_asc = 1 OR seqnum_desc = 1
GROUP BY V.BusLineId, V.Direction

-- functions
CREATE FUNCTION GetLongestRun (@lineId INT)
RETURNS INT
AS
BEGIN
	Declare @result INT
	SELECT @result = (
		SELECT TOP 1
		DATEDIFF(MINUTE, MIN(case when v.seqnum_asc = 1 then v.ArrivalTime end), MIN(case when seqnum_desc = 1 then v.ArrivalTime end)) as 'Minutes'
		FROM 
			(SELECT
				RR.Id, A.ArrivalTime,
				row_number() OVER (PARTITION BY RR.Id ORDER BY A.ArrivalTime ASC) AS seqnum_asc,
				row_number() OVER (PARTITION BY RR.Id ORDER BY A.ArrivalTime DESC) AS seqnum_desc
			FROM Arrivals A
			LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
			WHERE RR.BusLineId=@lineId
			) v
		WHERE seqnum_asc = 1 OR seqnum_desc = 1
		GROUP BY v.Id
		ORDER BY Minutes DESC)
	return @result
END

CREATE FUNCTION GetScheduleId(@Date DATETIME)
RETURNS INT
AS
BEGIN
	DECLARE @daynum INT
	SET @daynum = DATEPART(WEEKDAY, @date)
	DECLARE @result INT
	SELECT @result = (SELECT Id from Schedules WHERE WeekNumFrom <= @daynum AND WeekNumTo >= @daynum)
	RETURN @result
END

CREATE FUNCTION GetTicketPrice(@typeId INT, @discountId INT NULL)
RETURNS FLOAT(24)
AS
BEGIN
	DECLARE @typePrice INT
	DECLARE @discount FLOAT
	SELECT @typePrice = (SELECT Price FROM TicketTypes WHERE Id=@typeId)
	IF @discountId IS NOT NULL
	BEGIN
		SELECT @discount = (SELECT Percentage FROM Discounts WHERE Id=@discountId)
		return ROUND((@typePrice * ((100 - @discount) / 100)), 2)
	END
	return ROUND(@typePrice, 2)
END

CREATE FUNCTION getBiggestFine(@passengerId INT)
RETURNS INT
AS
BEGIN
	DECLARE @result INT
	SELECT @result = (
	SELECT Max(finePrice) 
	FROM dbo.Fines 
	WHERE Fines.PassengerId = @passengerId)
	Return @result
END


-- procedures
CREATE PROCEDURE BuySingleTicket @passengerId INT, @busLineId INT, @startAt DATETIME, @ticketTypeId INT, @discountId INT NULL
AS
	DECLARE @EndAt DATETIME
	SELECT @EndAt = DATEADD(mi, dbo.GetLongestRun(@busLineId), @startAt)
	INSERT INTO Tickets VALUES (@passengerId, @startAt, @EndAt, ROUND(dbo.GetTicketPrice(@ticketTypeId, @discountId), 2), @ticketTypeId, @busLineId, @discountId, GETDATE())
GO

CREATE PROCEDURE GetConnection @from INT, @to INT, @schedule INT
AS
	SELECT
    A.Id, A.ArrivalTime,
	RR.Id AS 'RouteRun.Id', RR.Direction AS 'RouteRun.Direction',
	BL.Id AS 'RouteRun.BusLine.Id', BL.LineNumber AS 'RouteRun.BusLine.LineNumber'
    FROM Arrivals AS A
	LEFT JOIN RouteRuns RR ON RR.Id=RouteRunId
	LEFT JOIN BusLines BL ON BL.Id=BusLineId
	LEFT JOIN RunDecorations RD ON RD.Id=RunDecorationId
	LEFT JOIN (
		SELECT A.ArrivalTime, RR.Id, RR.Direction FROM Arrivals A
		LEFT JOIN BusStops BS on BS.Id=BusStopId 
		LEFT JOIN RouteRuns RR on RR.Id=RouteRunId
		WHERE A.BusStopId=@to
	) T on T.Id=RR.Id
    WHERE RR.ScheduleId=@schedule
	AND A.BusStopId=@from and T.ArrivalTime>A.ArrivalTime
	ORDER BY A.ArrivalTime
GO

-- triggers
CREATE TRIGGER TR_UPDATE_FINE ON Fines
AFTER UPDATE
AS
BEGIN
    DECLARE @oldIsPaid bit, @newIsPaid bit, @fineId int
    SELECT @oldIsPaid = IsPaid FROM DELETED
    SELECT @newIsPaid = IsPaid FROM INSERTED
    SELECT @fineId = Id FROM INSERTED
    IF @oldIsPaid = 0 AND @newIsPaid = 1
    BEGIN
        INSERT INTO FinePayments VALUES(@fineId, GETDATE())
    END
END
