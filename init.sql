create table ballparks(
    ballpark_id int(2),
    ballpark_name varchar(50),
    city char(25),
    team char(25)
);

insert into ballparks
    (ballpark_id, ballpark_name, city, team) VALUES
    (01, 'Chase Field', 'Phoenix', 'Diamondbacks'),
    (02, 'Truist Park', 'Atlanta', 'Braves'),
    (03, 'Camden Yards', 'Baltimore', 'Orioles'),
    (04, 'Fenway Park', 'Boston', 'RedSox'),
    (05, 'Wrigley Field', 'Chicago', 'Cubs'),
    (06, 'Guaranteed Rate Field', 'Chicago', 'WhiteSox'),
    (07, 'Great American Ballpark', 'Cincinatti', 'Reds'),
    (08, 'Progressive Field', 'Cleveland', 'Guardians'),
    (09, 'Coors Field', 'Denver', 'Rockies'),
    (10, 'Comerica Park', 'Detroit', 'Tigers'),
    (11, 'Minute Maid Park', 'Houston', 'Astros'),
    (12, 'Kauffman Stadium', 'KansasCity', 'Royals'),
    (13, 'Angel Stadium', 'Anaheim', 'Angels'),
    (14, 'Dodger Stadium', 'LosAngeles', 'Dodgers'),
    (15, 'loanDepot Park', 'Miami', 'Marlins'),
    (16, 'American Family Field', 'Milwaukee', 'Brewers'),
    (17, 'Target Field', 'Minneapolis', 'Twins'),
    (18, 'Citi Field', 'Queens', 'Mets'),
    (19, 'Yankee Stadium', 'Bronx', 'Yankees'),
    (20, 'Oakland Coliseum', 'Oakland', 'Athletics'),
    (21, 'Citizens Bank Park', 'Philadelphia', 'Phillies'),
    (22, 'PNC Park', 'Pittsburgh', 'Pirates'),
    (23, 'Petco Park', 'SanDiego', 'Padres'),
    (24, 'Oracle Park', 'SanFrancisco', 'Giants'),
    (25, 'T-Mobile Park', 'Seattle', 'Mariners'),
    (26, 'Busch Stadium', 'St.Louis', 'Cardinals'),
    (27, 'Tropicana Field', 'St.Petersburg', 'Rays'),
    (28, 'Globe Life Field', 'Arlington', 'Rangers'),
    (29, 'Rogers Centre', 'Toronto', 'BlueJays'),
    (30, 'Nationals Park', 'WashingtonDC', 'Nationals');



create table users(
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username char(25) unique not null,
    password char(50) not null,
    email varchar(50)
)

CREATE TABLE reviews (
    user_id int(10),
    team int(2),
    ballpark_id int(2) primary key,
    overall_rating int not null check(overall_rating between 1 and 5),
    location int not null check(location between 1 and 5),
    food int not null check(food between 1 and 5),
    seating int not null check(seating between 1 and 5),
    comments varchar(250)
);


