drop database if exists scenario_uber;
create database scenario_uber character set = "utf8" collate = "utf8_general_ci";
use scenario_uber;

create table `client`(
  id int primary key auto_increment, 
  `name` varchar(100) not null, 
  gender char(1) check (gender in ("m", "f"))
);
create table driver(
  id int primary key auto_increment, 
  `name` varchar(100) not null, 
  city varchar(100) not null, 
  license_plate varchar(10) not null
);
create table ride(
  id int primary key auto_increment,
  client_id int not null,
  driver_id int not null,
  ride_date date not null, 
  distance decimal(7,2) not null,
  price decimal(7,2) not null,
  constraint fk_ride_client_id foreign key (client_id) references `client`(id),
  constraint fk_ride_driver_id foreign key (driver_id) references driver(id)
);
create table waypoint(
  id int primary key auto_increment,
  ride_id int not null,
  `number` int not null check (`number` > 0),
  latitude decimal(7,4),
  longitude decimal(7,4)
);

load data infile "./scenario_uber_client.csv" into table `client` fields terminated by "," ignore 1 lines;
load data infile "./scenario_uber_driver.csv" into table driver fields terminated by "," enclosed by "'" ignore 1 lines;
load data infile "./scenario_uber_ride.csv" into table ride fields terminated by "," ignore 1 lines;
load data infile "./scenario_uber_waypoint.csv" into table waypoint fields terminated by "," ignore 1 lines;
  
-- The following point column and the spatial index are not relevant for this exercise.
-- alter table waypoint add geo_point point not null default (point(latitude, longitude));
-- alter table waypoint add spatial index(geo_point);