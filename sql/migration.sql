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

INSERT INTO Passengers 
VALUES('admin', '$2a$10$AT/cjvxcuYZ12fkOe4MtbunNOdPeTN/BkeuFbVuaen55dYt2Ji2ni', 'Admin', 'Admin', '1234567890')

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

INSERT INTO dbo.BusStops VALUES ('Jasien PKM', 'Andersa', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Jasienska', 'Mysliwska', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Migowo', 'Bulonska', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Budapesztanska', 'Bulonska', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Warnenska', 'Rakoczego', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Piecewska', 'Jaskowa Dolina', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Galeria Baltycka', 'Kosciuszki', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Zaspa SKM', 'Hynka', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Zaspa - Szpital', 'Jana Pawla II', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Obronców wybrzeza', 'Obronców wybrzeza', 'Gdansk', '80-288', 0,0)
INSERT INTO dbo.BusStops VALUES ('Oliwa PKP', 'Droszynskiego', 'Gdansk', '80-288', 0,0)

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

INSERT INTO Tickets VALUES (1, GETDATE(), GETDATE() + 1, 3.00, 1, 1, NULL, GETDATE())
INSERT INTO Tickets VALUES (1, GETDATE(), GETDATE() + 7, 17.00, 1, NULL, NULL, GETDATE())
INSERT INTO Fines VALUES (1, 50, GETDATE(), 0)