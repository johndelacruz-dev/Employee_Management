CREATE DATABASE  IF NOT EXISTS `employee_system_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `employee_system_db`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: employee_system_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department_table`
--

DROP TABLE IF EXISTS `department_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_table` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_table`
--

LOCK TABLES `department_table` WRITE;
/*!40000 ALTER TABLE `department_table` DISABLE KEYS */;
INSERT INTO `department_table` VALUES (1,'HR'),(2,'IT'),(3,'Finance'),(4,'Sales'),(5,'Marketing'),(6,'Operations'),(7,'Customer Service'),(8,'Administration');
/*!40000 ALTER TABLE `department_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_status_table`
--

DROP TABLE IF EXISTS `employee_status_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_status_table` (
  `employee_status_id` int NOT NULL AUTO_INCREMENT,
  `employee_status_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`employee_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_status_table`
--

LOCK TABLES `employee_status_table` WRITE;
/*!40000 ALTER TABLE `employee_status_table` DISABLE KEYS */;
INSERT INTO `employee_status_table` VALUES (1,'Full-time'),(2,'Part-time'),(3,'Contract'),(4,'Temporary'),(5,'Probationary'),(6,'Permanent'),(7,'Seasonal'),(8,'Intern'),(9,'Remote');
/*!40000 ALTER TABLE `employee_status_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_table`
--

DROP TABLE IF EXISTS `employee_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_table` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `contact` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `salary` int NOT NULL,
  `hire_date` date NOT NULL,
  `job_title_id` int NOT NULL,
  `job_position_id` int NOT NULL,
  `employee_status_id` int NOT NULL,
  `department_id` int NOT NULL,
  `gender_id` int NOT NULL,
  PRIMARY KEY (`employee_id`),
  KEY `employee_table_ibfk_1` (`job_title_id`),
  KEY `employee_table_ibfk_2` (`job_position_id`),
  KEY `employee_table_ibfk_3` (`employee_status_id`),
  KEY `employee_table_ibfk_4` (`department_id`),
  KEY `employee_table_ibfk_5` (`gender_id`),
  CONSTRAINT `employee_table_ibfk_1` FOREIGN KEY (`job_title_id`) REFERENCES `job_title_table` (`job_title_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_table_ibfk_2` FOREIGN KEY (`job_position_id`) REFERENCES `job_position_table` (`job_position_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_table_ibfk_3` FOREIGN KEY (`employee_status_id`) REFERENCES `employee_status_table` (`employee_status_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_table_ibfk_4` FOREIGN KEY (`department_id`) REFERENCES `department_table` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_table_ibfk_5` FOREIGN KEY (`gender_id`) REFERENCES `gender_table` (`gender_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=444 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_table`
--

LOCK TABLES `employee_table` WRITE;
/*!40000 ALTER TABLE `employee_table` DISABLE KEYS */;
INSERT INTO `employee_table` VALUES (1,'John','Dela Cruz','09276688879','john@gmail.com','267, talavera, Nueva Ecija',30000,'2026-08-02',1,4,3,2,1),(358,'Mary','Davis','09763068915','mary1@gmail.com','286 Cruz Street',50600,'2022-05-07',10,3,6,1,2),(359,'James','Smith','09142982334','james2@gmail.com','328 Sampaguita Street',36821,'2022-03-23',7,1,4,1,1),(360,'Sarah','Lopez','09252263568','sarah3@gmail.com','351 Lopez Street',55779,'2020-12-20',9,2,7,1,2),(361,'Joseph','Gonzalez','09545650086','joseph4@gmail.com','460 Camia Street',22283,'2022-06-03',10,3,7,1,1),(362,'John','Davis','09919688047','john5@gmail.com','264 Aguinaldo Street',36788,'2021-07-04',9,3,9,1,2),(363,'John','Williams','09905420690','john6@gmail.com','282 Del Pilar Street',24418,'2024-07-13',7,2,9,1,2),(364,'Brian','Rodriguez','09506631770','brian7@gmail.com','229 Acacia Street',69930,'2024-04-10',10,2,8,1,1),(365,'Jessica','Jones','09917710132','jessica8@gmail.com','92 Jacinto Street',62870,'2021-08-26',10,1,6,1,1),(366,'Justin','Martin','09294400442','justin9@gmail.com','96 Molave Street',58887,'2024-01-05',8,1,6,1,1),(367,'Ashley','Moore','09846022517','ashley10@gmail.com','297 Lopez Street',62991,'2025-01-12',9,1,5,1,1),(368,'Samuel','Moore','09947767395','samuel1@gmail.com','215 Mahogany Street',31170,'2026-07-07',1,4,5,2,1),(369,'Justin','Taylor','09341343197','justin2@gmail.com','317 Oak Street',28319,'2022-09-06',2,5,1,2,2),(370,'Daniel','Martin','09477876190','daniel3@gmail.com','105 Rizal Street',31052,'2020-01-21',6,4,3,2,2),(371,'Anthony','Lopez','09629652905','anthony4@gmail.com','39 Bonifacio Street',51973,'2022-02-05',1,6,6,2,1),(372,'James','Martin','09974267235','james5@gmail.com','84 Acacia Street',24702,'2021-12-23',1,4,4,2,1),(373,'Nicholas','Thomas','09237841600','nicholas6@gmail.com','158 Mabini Street',59284,'2024-03-29',2,4,4,2,1),(374,'James','Thomas','09517458299','james7@gmail.com','484 Pine Street',23634,'2024-05-18',4,4,6,2,1),(375,'Justin','Martin','09836804857','justin8@gmail.com','120 Mabini Street',23235,'2021-08-25',4,7,5,2,1),(376,'Nicholas','Brown','09209730195','nicholas1@gmail.com','254 Acacia Street',54028,'2023-11-27',11,8,9,3,2),(377,'Nicholas','Jones','09646372981','nicholas2@gmail.com','34 Magsaysay Avenue',56799,'2022-08-07',13,9,9,3,1),(378,'Daniel','Williams','09432207338','daniel3@gmail.com','368 Maple Street',52342,'2026-06-25',12,10,5,3,2),(379,'Christopher','Jones','09946975159','christopher4@gmail.com','219 Magsaysay Avenue',58190,'2025-11-08',13,10,7,3,2),(380,'Mark','Martinez','09151401258','mark5@gmail.com','335 Mahogany Street',63313,'2024-10-18',13,9,4,3,1),(381,'Ashley','Williams','09748578824','ashley6@gmail.com','374 Roxas Boulevard',42945,'2025-05-26',11,9,3,3,1),(382,'Isabella','Anderson','09708802082','isabella7@gmail.com','500 Molave Street',15678,'2025-12-03',12,9,2,3,2),(383,'Samuel','Moore','09695633787','samuel8@gmail.com','274 Jasmine Street',24448,'2020-09-22',11,8,5,3,2),(384,'Justin','Miller','09349801540','justin9@gmail.com','55 Molave Street',60462,'2026-06-11',12,9,5,3,2),(385,'Mary','Brown','09237610825','mary10@gmail.com','110 Mahogany Street',69197,'2026-07-27',11,10,7,3,2),(386,'Brian','Gonzalez','09866225835','brian1@gmail.com','80 Del Pilar Street',52594,'2023-06-09',24,12,4,4,2),(387,'Mark','Miller','09328204039','mark2@gmail.com','492 Roxas Boulevard',16999,'2025-06-28',22,11,6,4,2),(388,'Jessica','Martin','09436208533','jessica3@gmail.com','428 Maple Street',53575,'2024-11-25',26,11,3,4,2),(389,'Michael','Gonzalez','09156348585','michael4@gmail.com','431 Del Pilar Street',52312,'2024-09-06',24,11,8,4,2),(390,'Anthony','Davis','09861843652','anthony5@gmail.com','106 Camia Street',22671,'2024-12-22',24,12,2,4,2),(391,'James','Martinez','09962598764','james6@gmail.com','447 Pine Street',59986,'2025-05-10',23,11,6,4,2),(392,'Anthony','Smith','09452707852','anthony7@gmail.com','434 Pine Street',33323,'2022-12-07',26,11,5,4,1),(393,'Jennifer','Jackson','09932662379','jennifer8@gmail.com','13 Reyes Street',69917,'2023-08-28',23,11,5,4,2),(394,'Sophia','Moore','09620441450','sophia9@gmail.com','490 Sampaguita Street',48137,'2022-05-07',25,11,8,4,2),(395,'Mary','Wilson','09811775060','mary10@gmail.com','125 Aguinaldo Street',32475,'2020-03-25',24,11,4,4,2),(396,'Jennifer','Lopez','09517355219','jennifer11@gmail.com','220 Roxas Boulevard',41667,'2021-11-27',22,12,4,4,2),(397,'Emily','Jackson','09196264185','emily1@gmail.com','1 Oak Street',34274,'2025-12-19',19,15,1,5,1),(398,'Emily','Rodriguez','09514823758','emily2@gmail.com','62 Jasmine Street',19494,'2026-06-17',20,14,4,5,1),(399,'James','Johnson','09686939123','james3@gmail.com','478 Bonifacio Street',64350,'2024-01-29',17,15,3,5,2),(400,'Matthew','Martinez','09436917512','matthew4@gmail.com','415 Jasmine Street',16835,'2022-09-15',21,13,6,5,2),(401,'Jessica','Brown','09307848661','jessica5@gmail.com','194 Pine Street',25595,'2021-03-03',20,13,4,5,1),(402,'Andrew','Anderson','09531734289','andrew6@gmail.com','354 Quezon Avenue',32688,'2025-03-11',19,15,6,5,2),(403,'Anthony','Moore','09753895959','anthony7@gmail.com','166 Quezon Avenue',16835,'2022-12-20',17,13,7,5,2),(404,'Andrew','Johnson','09320542210','andrew8@gmail.com','285 Narra Street',16038,'2021-02-21',21,13,8,5,1),(405,'Justin','Davis','09817429429','justin9@gmail.com','120 Oak Street',22313,'2023-10-04',21,13,5,5,2),(406,'Nicholas','Jackson','09592890194','nicholas10@gmail.com','105 Jacinto Street',46369,'2025-01-18',19,15,3,5,1),(407,'Daniel','Davis','09133495205','daniel11@gmail.com','279 Gomez Street',35125,'2026-05-11',17,13,9,5,2),(408,'Isabella','Hernandez','09886853475','isabella12@gmail.com','317 Magsaysay Avenue',53517,'2024-12-12',20,13,5,5,2),(409,'Joseph','Wilson','09394104725','joseph13@gmail.com','210 Orchid Street',29420,'2023-06-20',17,14,3,5,2),(410,'Christopher','Anderson','09103182419','christopher1@gmail.com','116 Bonifacio Street',32341,'2020-10-23',27,16,6,6,1),(411,'Ashley','Thomas','09798900339','ashley2@gmail.com','55 Burgos Street',21748,'2024-11-06',28,16,9,6,2),(412,'Ashley','Rodriguez','09804022552','ashley3@gmail.com','344 Bonifacio Street',31985,'2022-04-29',30,17,6,6,1),(413,'Michael','Anderson','09266680518','michael4@gmail.com','86 Aguinaldo Street',60720,'2026-03-22',30,16,1,6,2),(414,'Andrew','Wilson','09824355769','andrew5@gmail.com','246 Santos Street',23732,'2020-07-15',29,17,3,6,1),(415,'Olivia','Rodriguez','09569492313','olivia6@gmail.com','205 Cruz Street',35755,'2025-08-21',30,17,1,6,2),(416,'Matthew','Miller','09468012579','matthew1@gmail.com','320 Reyes Street',51252,'2020-09-27',32,19,5,7,1),(417,'Christopher','Williams','09809929414','christopher2@gmail.com','375 Maple Street',40947,'2024-11-26',32,19,3,7,2),(418,'Daniel','Garcia','09948602695','daniel3@gmail.com','204 Maple Street',31065,'2020-07-26',34,18,5,7,1),(419,'Joseph','Brown','09866012488','joseph4@gmail.com','169 Roxas Boulevard',55145,'2022-09-05',32,19,4,7,2),(420,'Joshua','Taylor','09553002307','joshua5@gmail.com','255 Orchid Street',22447,'2020-07-14',33,19,1,7,1),(421,'Daniel','Johnson','09916582891','daniel6@gmail.com','342 Bonifacio Street',64223,'2024-05-19',32,18,9,7,1),(422,'Isabella','Taylor','09448596371','isabella7@gmail.com','146 Gomez Street',69114,'2026-02-08',34,18,4,7,1),(423,'Daniel','Martinez','09639949620','daniel8@gmail.com','242 Sampaguita Street',65056,'2022-10-31',32,19,4,7,1),(424,'Sophia','Anderson','09689861092','sophia9@gmail.com','90 Narra Street',69971,'2022-12-17',31,18,9,7,2),(425,'Sarah','Williams','09205945508','sarah1@gmail.com','395 Lopez Street',30098,'2025-12-10',14,22,3,8,1),(426,'Ryan','Brown','09711952985','ryan2@gmail.com','21 Garcia Street',37494,'2024-12-10',14,22,5,8,1),(427,'Ryan','Rodriguez','09625145278','ryan3@gmail.com','144 Burgos Street',66930,'2026-06-24',16,20,2,8,1),(428,'Sarah','Garcia','09654611970','sarah4@gmail.com','365 Magsaysay Avenue',36351,'2021-07-31',16,22,6,8,2),(429,'Matthew','Thomas','09245805314','matthew5@gmail.com','372 Gomez Street',27471,'2023-12-26',16,22,3,8,2),(430,'Anthony','Williams','09810276457','anthony6@gmail.com','474 Sampaguita Street',69359,'2025-05-24',15,22,9,8,1),(431,'Anthony','Anderson','09237013633','anthony7@gmail.com','301 Sunflower Street',37287,'2020-01-23',16,22,4,8,2),(432,'Anthony','Smith','09401939609','anthony8@gmail.com','242 Mabini Street',31031,'2024-01-06',15,20,2,8,2),(433,'Michael','Thomas','09574754417','michael9@gmail.com','394 Maple Street',52563,'2023-04-20',16,22,5,8,1),(434,'Nathan','Anderson','09512452624','nathan10@gmail.com','145 Camia Street',49456,'2025-07-20',14,22,4,8,2),(435,'Isabella','Miller','09933709729','isabella11@gmail.com','161 Acacia Street',53663,'2026-02-21',14,22,9,8,1),(436,'Ashley','Thomas','09704719005','ashley12@gmail.com','486 Bonifacio Street',65545,'2024-12-26',16,20,2,8,2);
/*!40000 ALTER TABLE `employee_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gender_table`
--

DROP TABLE IF EXISTS `gender_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender_table` (
  `gender_id` int NOT NULL AUTO_INCREMENT,
  `gender_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gender_table`
--

LOCK TABLES `gender_table` WRITE;
/*!40000 ALTER TABLE `gender_table` DISABLE KEYS */;
INSERT INTO `gender_table` VALUES (1,'male'),(2,'female');
/*!40000 ALTER TABLE `gender_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_position_table`
--

DROP TABLE IF EXISTS `job_position_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_position_table` (
  `job_position_id` int NOT NULL AUTO_INCREMENT,
  `job_position_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`job_position_id`),
  KEY `job_position_table_ibfk_1` (`department_id`),
  CONSTRAINT `job_position_table_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department_table` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_position_table`
--

LOCK TABLES `job_position_table` WRITE;
/*!40000 ALTER TABLE `job_position_table` DISABLE KEYS */;
INSERT INTO `job_position_table` VALUES (1,'HR Manager',1),(2,'HR Assistant',1),(3,'Recruiter',1),(4,'Software Developer',2),(5,'System Administrator',2),(6,'Network Engineer',2),(7,'IT Support',2),(8,'Accountant',3),(9,'Financial Analyst',3),(10,'Payroll Officer',3),(11,'Sales Representative',4),(12,'Sales Manager',4),(13,'Marketing Specialist',5),(14,'Content Creator',5),(15,'Graphic Designer',5),(16,'Operations Manager',6),(17,'Supervisor',6),(18,'Customer Service Representative',7),(19,'Call Center Agent',7),(20,'Administrative Assistant',8),(21,'Office Clerk',8),(22,'Secretary',8);
/*!40000 ALTER TABLE `job_position_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_title_table`
--

DROP TABLE IF EXISTS `job_title_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_title_table` (
  `job_title_id` int NOT NULL AUTO_INCREMENT,
  `job_title_name` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`job_title_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `job_title_table_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department_table` (`department_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_title_table`
--

LOCK TABLES `job_title_table` WRITE;
/*!40000 ALTER TABLE `job_title_table` DISABLE KEYS */;
INSERT INTO `job_title_table` VALUES (1,'Junior Software Developer',2),(2,'Senior Software Developer',2),(3,'System Administrator',2),(4,'Network Engineer',2),(5,'Database Administrator',2),(6,'IT Support Specialist',2),(7,'HR Assistant',1),(8,'HR Officer',1),(9,'Recruiter',1),(10,'HR Manager',1),(11,'Accountant',3),(12,'Payroll Officer',3),(13,'Financial Analyst',3),(14,'Administrative Assistant',8),(15,'Office Clerk',8),(16,'Secretary',8),(17,'Marketing Assistant',5),(18,'Marketing Specialist',5),(19,'Senior Marketing Specialist',5),(20,'Marketing Manager',5),(21,'Marketing Director',5),(22,'Sales Intern',4),(23,'Sales Assistant',4),(24,'Account Executive',4),(25,'Sales Manager',4),(26,'Sales Director',4),(27,'Operations Intern',6),(28,'Administrative Assistant',6),(29,'Inventory Specialist',6),(30,'Operations Director',6),(31,'Customer Service Intern',7),(32,'Call Center Agent',7),(33,'Customer Service Manager',7),(34,'Customer Experience Director',7);
/*!40000 ALTER TABLE `job_title_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `privilege_level` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `name` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'admin','$2a$12$02MDfXDJzujOvsJ7Rntfse8tw3oDHAtAnirqdfcxs.4zO5jWQBx/2',1),(2,'manager','$2a$12$zyRhjf26QvAMaTx57pIbgel7JaLb0e8W3BwH5OYlAJWw3H6iWH7Ri',2);
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-25 14:29:50
