# on host
docker ps
ls
docker cp client_uber.csv ndbs-mariadb-ndbs-1:/srv/
docker cp driver_uber.csv ndbs-mariadb-ndbs-1:/srv/
docker cp scenario_uber_ride.csv ndbs-mariadb-ndbs-1:/srv/
docker cp scenario_uber_waypoint.csv ndbs-mariadb-ndbs-1:/srv/

# inside docker or execute commands in phpmyadmin but relogin as root
docker exec -it ndbs-mariadb-ndbs-1 bash
cd srv/
mysql -u root -p

# in mariadb
use scenario_uber
load data infile "/srv/client_uber.csv" into table `client` fields terminated by "," ignore 1 lines;
load data infile "/srv/driver_uber.csv" into table driver fields terminated by "," ignore 1 lines;
load data infile "/srv/scenario_uber_ride.csv" into table ride fields terminated by "," ignore 1 lines;
load data infile "/srv/scenario_uber_waypoint.csv" into table waypoint fields terminated by "," ignore 1 lines;

# Is already executed by sequelize
CREATE UNIQUE INDEX id ON client(id);
CREATE UNIQUE INDEX clientnumber ON client(clientnumber);
CREATE UNIQUE INDEX license_plate ON driver(license_plate);
CREATE UNIQUE INDEX drivernumber ON driver(drivernumber);
CREATE UNIQUE INDEX id ON driver(id);
CREATE UNIQUE INDEX id ON ride(id);
CREATE UNIQUE INDEX id ON waypoint(id);
CREATE INDEX firstname ON driver(firstname);

# check unique entries
SHOW INDEX FROM client;
SHOW INDEX FROM driver;
SHOW INDEX FROM ride;
SHOW INDEX FROM waypoint;