# Load Data 
client_raw <- read.csv(file = file.choose(), header = TRUE, sep = ",")
driver_raw <- read.csv(file = file.choose(), header = TRUE, sep = ",")
  
# Load library
library(tidyr)
# Edit data client
client <- extract(client_raw, name, c("firstname", "surname"), "([^ ]+) (.*)")
client <- subset(client, select = -c(id))
c_id <- c(1:89331)
client$clientnumber <- paste(client$firstname, client$surname, sep=".")
client$clientnumber <- paste(client$clientnumber, c_id, sep=".")
# Edit data driver
library(dplyr)
c_id <- c(1:9994)
#rename the columns
if(!require(data.table)){install.packages('data.table')}
setnames(driver_raw, old=c("id","name", "city"), new=c("name", "city", "country"))
#driver_raw$id <- c_id
driver <- extract(driver_raw, name, c("firstname", "surname"), "([^ ]+) (.*)")
driver <- driver[ , c("id", "firstname", "surname", "city", "country", "license_plate")]
driver$city <- gsub("^.{0,1}", "", driver$city)
driver$country <- gsub(".{1}$", "", driver$country)
client <- subset(client, select = -c(index))
driver$drivernumber <- paste(driver$firstname, driver$surname, sep=".")
driver$drivernumber <- paste(driver$drivernumber, c_id, sep=".")
# Save / export data on host
write.csv(client, quote=F, "/home/peter/client_uber.csv")
write.csv(driver, quote=F, "/home/peter/driver_uber.csv")

