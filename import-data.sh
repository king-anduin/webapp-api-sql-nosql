# on host
docker ps
ls
docker cp client_uber.csv ndbs-mariadb-ndbs-1:/srv/
docker cp driver_uber.csv ndbs-mariadb-ndbs-1:/srv/
docker cp scenario_uber_ride.csv ndbs-mariadb-ndbs-1:/srv/
docker cp scenario_uber_waypoint.csv ndbs-mariadb-ndbs-1:/srv/

# inside docker
docker exec -it ndbs-mariadb-ndbs-1 bash
cd srv/
mysql -u root -p
use scenario_uber

# in mariadb
use scenario_uber
load data infile "/srv/client_uber.csv" into table `client` fields terminated by "," ignore 1 lines;
load data infile "/srv/driver_uber.csv" into table driver fields terminated by "," ignore 1 lines;
load data infile "/srv/scenario_uber_ride.csv" into table ride fields terminated by "," ignore 1 lines;
load data infile "/srv/scenario_uber_waypoint.csv" into table waypoint fields terminated by "," ignore 1 lines;
CREATE UNIQUE INDEX id ON client(id);
CREATE UNIQUE INDEX license_plate ON driver(license_plate);
CREATE UNIQUE INDEX id ON driver(id);
CREATE UNIQUE INDEX id ON ride(id);
CREATE UNIQUE INDEX id ON waypoint(id);

# check unique entries
SHOW INDEX FROM client;
SHOW INDEX FROM driver;
SHOW INDEX FROM ride;
SHOW INDEX FROM waypoint;