Here is the info from my checkpoint presentation
At the time I had an individual reviews and an average reviews table but i have combined those into one table, reviews



User information: 
get(all), 
get(by username),
delete(delete user) - restricted,
--(under auth section)--
post(create new user), 
post(login),

CREATE TABLE users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username char(25) unique,
        password varchar(1000),
        email varchar(50) unique
);

ballpark information: 
get(all), 
get(by team),
post(create new ballpark) - restricted, 
put(edit ballpark) - restricted

CREATE TABLE ballparks(
ballpark_id int(2),
ballpark_name varchar(50),
city char(25),
team char(25)
);

Indiviudal reviews:
get(all), 
get(by team),
post(create new review)

CREATE TABLE reviews (
    user_id int(10),
    team(2),
    ballpark_id int(2) primary key,
    overall_rating int(1),
    location int(1),
    food int(1),
    seating int(1),
    comments varchar(250), 
)

Average scores: 
get(all),
get(by team), 
put(update average when new review is created)

CREATE TABLE avg_score (
	ballpark_id INT NOT NULL PRIMARY KEY,
    team char(25),
    avg_rating int(1),
    avg_location int(1),
    avg_food int(1),
    avg_seating int(1),
);