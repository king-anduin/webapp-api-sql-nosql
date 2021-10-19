CREATE VIEW ride_list AS
SELECT c.firstname as cust_firstname, c.surname as cust_surname, c.clientnumber as clientnumber, r.ride_date, 
d.firstname as driv_firstname, d.surname as driv_surname, d.drivernumber as drivernumber, d.city, d.country, d.license_plate,
r.price, r.distance
FROM client as c
INNER JOIN ride as r ON  c.id=r.client_id
INNER JOIN driver as d ON d.id=r.driver_id

CREATE VIEW statistic AS
SELECT r.id, r.price, d.city
FROM driver as d
INNER JOIN ride as r ON  d.id=r.client_id