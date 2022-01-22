IF NOT EXISTS (
        SELECT *
        FROM sys.databases
        WHERE name = 'LM-Transport'
    )
BEGIN
    CREATE DATABASE [LM-Transport]
END
GO
	USE [LM-Transport]
GO

-- tables

CREATE TABLE Passengers ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    Login VARCHAR(100) NOT NULL, 
    Password VARCHAR(255) NOT NULL, 
    FirstName VARCHAR(100) NOT NULL, 
    LastName VARCHAR(100) NOT NULL, 
    CardNumber VARCHAR(10) NOT NULL 
); 

CREATE TABLE Fines ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    PassengerId INT FOREIGN KEY(PassengerId) REFERENCES Passengers(Id) NOT NULL, 
    FinePrice FLOAT(24) NOT NULL ,
    Date DATETIME NOT NULL, 
    IsPaid BIT NOT NULL 
); 

CREATE TABLE FinePayments ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    FineId INT FOREIGN KEY(FineId) REFERENCES Fines(Id) NOT NULL, 
    PaymentDate DATE NOT NULL 
); 

CREATE TABLE TicketTypes ( 
    Id int IDENTITY(1,1) PRIMARY KEY, 
    Name VARCHAR(50) NOT NULL, 
    Price FLOAT(24) NOT NULL, 
    StaticDuration INT NULL 
); 


CREATE TABLE Discounts ( 
    Id int IDENTITY(1,1) PRIMARY KEY, 
    Name VARCHAR(50) NOT NULL, 
    Percentage FLOAT(24) NOT NULL 
); 

CREATE TABLE BusLines ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    LineNumber INT NOT NULL UNIQUE 
); 

CREATE TABLE Tickets ( 
    ID INT IDENTITY(1,1) PRIMARY KEY, 
    PassengerId INTEGER FOREIGN KEY(PassengerId) REFERENCES Passengers(Id), 
    StartDate DATETIME NOT NULL, 
    EstimatedEndDate DATETIME NOT NULL, 
    CalculatedPrice FLOAT NOT NULL, 
    TicketTypeId INTEGER FOREIGN KEY(TicketTypeId) REFERENCES TicketTypes(Id), 
    BusLineId INTEGER FOREIGN KEY(BusLineId) REFERENCES BusLines(Id) NULL, 
    DiscountId INTEGER FOREIGN KEY(DiscountId) REFERENCES Discounts(Id) NULL, 
    BoughtAt DATETIME NOT NULL 
); 

CREATE TABLE BusStops ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    Name VARCHAR(150) NOT NULL, 
    Street VARCHAR(150) NOT NULL, 
    City VARCHAR(150) NOT NULL, 
    PostCode VARCHAR(6) NOT NULL, 
    Lat FLOAT NOT NULL, 
    Lon FLOAT NOT NULL 
);

CREATE TABLE Schedules ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    Name VARCHAR(50) NOT NULL, 
    WeekNumFrom TINYINT NOT NULL, 
    WeekNumTo TINYINT NOT NULL 
); 

CREATE TABLE RunDecorations ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    Prefix VARCHAR(5) NOT NULL, 
    Name VARCHAR(100) NOT NULL 
); 

CREATE TABLE RouteRuns ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    BusLineId INT FOREIGN KEY(BusLineId) REFERENCES BusLines(Id) NOT NULL, 
    ScheduleId INT FOREIGN KEY(ScheduleId) REFERENCES Schedules(Id) NOT NULL, 
    RunDecorationId INT FOREIGN KEY(RunDecorationId) REFERENCES RunDecorations(Id) NULL, 
    Direction BIT NOT NULL 
); 

CREATE TABLE Arrivals ( 
    Id INT IDENTITY(1,1) PRIMARY KEY, 
    BusStopId INT FOREIGN KEY(BusStopId) REFERENCES BusStops(Id) NOT NULL, 
    RouteRunId INT FOREIGN KEY(RouteRunId) REFERENCES RouteRuns(Id) NOT NULL, 
    ArrivalTime TIME NOT NULL 
); 

-- inserts

INSERT INTO dbo.TicketTypes (Name, Price, StaticDuration)
VALUES('Jednorazowy', 3, 0)
INSERT INTO dbo.TicketTypes (Name, Price, StaticDuration)
VALUES('Tygodniowy', 17, 168)
INSERT INTO dbo.TicketTypes (Name, Price, StaticDuration)
VALUES('Miesięczny', 70, 720)

INSERT INTO dbo.Discounts (Name, Percentage)
VALUES('Student', 51)
INSERT INTO dbo.Discounts (Name, Percentage)
VALUES('Uczeń', 37)
INSERT INTO dbo.Discounts (Name, Percentage)
VALUES('Emeryt', 70)

INSERT INTO dbo.BusLines(LineNumber)
VALUES(127)

INSERT INTO dbo.Schedules(Name, WeekNumFrom, WeekNumTo)
VALUES('Niedziela', 1, 1)
INSERT INTO dbo.Schedules(Name, WeekNumFrom, WeekNumTo)
VALUES('Sobota', 7, 7)
INSERT INTO dbo.Schedules(Name, WeekNumFrom, WeekNumTo)
VALUES('Pon-Pt', 2, 6)

INSERT INTO dbo.BusStops VALUES ('Jasieñ PKM', 'Andersa', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Jasieñska', 'Myœliwska', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Migowo', 'Buloñska', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Budapesztañska', 'Buloñska', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Warneñska', 'Rakoczego', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Piecewska', 'Jaœkowa Dolina', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Galeria Ba³tycka', 'Koœciuszki', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Zaspa SKM', 'Hynka', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Zaspa - Szpital', 'Jana Paw³a II', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Obroñców wybrze¿a', 'Obroñców wybrze¿a', 'Gdañsk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Oliwa PKP', 'Droszyñskiego', 'Gdañsk', '80-288', 0,0)

INSERT INTO RouteRuns VALUES (1, 3, null, 0)
INSERT INTO RouteRuns VALUES (1, 3, null, 0)
INSERT INTO RouteRuns VALUES (1, 3, null, 1)
INSERT INTO RouteRuns VALUES (1, 3, null, 1)

INSERT INTO Arrivals VALUES(1, 1, '7:00')
INSERT INTO Arrivals VALUES(2, 1, '7:10')
INSERT INTO Arrivals VALUES(3, 1, '7:20')
INSERT INTO Arrivals VALUES(4, 1, '7:30')
INSERT INTO Arrivals VALUES(5, 1, '7:40')
INSERT INTO Arrivals VALUES(6, 1, '7:50')
INSERT INTO Arrivals VALUES(7, 1, '8:00')
INSERT INTO Arrivals VALUES(8, 1, '8:10')
INSERT INTO Arrivals VALUES(9, 1, '8:20')
INSERT INTO Arrivals VALUES(10, 1, '8:30')
INSERT INTO Arrivals VALUES(11, 1, '8:40')

INSERT INTO Arrivals VALUES(1, 2, '8:00')
INSERT INTO Arrivals VALUES(2, 2, '8:10')
INSERT INTO Arrivals VALUES(3, 2, '8:20')
INSERT INTO Arrivals VALUES(4, 2, '8:30')
INSERT INTO Arrivals VALUES(5, 2, '8:40')
INSERT INTO Arrivals VALUES(6, 2, '8:50')
INSERT INTO Arrivals VALUES(7, 2, '9:00')
INSERT INTO Arrivals VALUES(8, 2, '9:10')
INSERT INTO Arrivals VALUES(9, 2, '9:20')
INSERT INTO Arrivals VALUES(10, 2, '9:30')
INSERT INTO Arrivals VALUES(11, 2, '9:40')

INSERT INTO Arrivals VALUES(11, 3, '7:00')
INSERT INTO Arrivals VALUES(10, 3, '7:10')
INSERT INTO Arrivals VALUES(9, 3, '7:20')
INSERT INTO Arrivals VALUES(8, 3, '7:30')
INSERT INTO Arrivals VALUES(7, 3, '7:40')
INSERT INTO Arrivals VALUES(6, 3, '7:50')
INSERT INTO Arrivals VALUES(5, 3, '8:00')
INSERT INTO Arrivals VALUES(4, 3, '8:10')
INSERT INTO Arrivals VALUES(3, 3, '8:20')
INSERT INTO Arrivals VALUES(2, 3, '8:30')
INSERT INTO Arrivals VALUES(1, 3, '8:40')

INSERT INTO Arrivals VALUES(11, 4, '8:00')
INSERT INTO Arrivals VALUES(10, 4, '8:10')
INSERT INTO Arrivals VALUES(9, 4, '8:20')
INSERT INTO Arrivals VALUES(8, 4, '8:30')
INSERT INTO Arrivals VALUES(7, 4, '8:40')
INSERT INTO Arrivals VALUES(6, 4, '8:50')
INSERT INTO Arrivals VALUES(5, 4, '9:00')
INSERT INTO Arrivals VALUES(4, 4, '9:10')
INSERT INTO Arrivals VALUES(3, 4, '9:20')
INSERT INTO Arrivals VALUES(2, 4, '9:30')
INSERT INTO Arrivals VALUES(1, 4, '9:40')

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