-- MySQL dump 10.13  Distrib 8.0.32, for macos12.6 (arm64)
--
-- Host: localhost    Database: orphanage
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `credentials`
--

DROP TABLE IF EXISTS `credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credentials` (
  `id` int DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `what` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credentials`
--

LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;
INSERT INTO `credentials` VALUES (3,'niki_center@gmail.com','$2a$10$lMIorkDmQM3r6vYfvDMm8uiS2VPf7HSSK3Dah5Zv66mbxVPGe6dV2','1'),(1,'nikita','$2a$10$wlyp4/aDzH64ILPuTyjucOnHWysxkBJzXWM5jidTNb9z8gjMvkLx2','1'),(2,'nikita1','$2a$10$kmGXV5yxmLPQ5VWKvAVxhu30EWBnCjVzZE.4fdQ1PdegKBthYL/MO','2');
/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `doner_id` int DEFAULT NULL,
  `dquantity` int DEFAULT NULL,
  `requirement_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,20,5),(1,30,5),(1,60,5),(1,30,5);
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doner`
--

DROP TABLE IF EXISTS `doner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doner` (
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doner`
--

LOCK TABLES `doner` WRITE;
/*!40000 ALTER TABLE `doner` DISABLE KEYS */;
INSERT INTO `doner` VALUES ('niki','p','niki@gmail.com','1');
/*!40000 ALTER TABLE `doner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orphanage`
--

DROP TABLE IF EXISTS `orphanage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orphanage` (
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orphanage`
--

LOCK TABLES `orphanage` WRITE;
/*!40000 ALTER TABLE `orphanage` DISABLE KEYS */;
INSERT INTO `orphanage` VALUES ('niki child center','walvekar galli','niki_center@gmail.com','1');
/*!40000 ALTER TABLE `orphanage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requirement`
--

DROP TABLE IF EXISTS `requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requirement` (
  `item` varchar(255) NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `orphanage_id` int NOT NULL,
  `emergency_value` tinyint DEFAULT NULL,
  `requirement_id` int NOT NULL AUTO_INCREMENT,
  `category` int NOT NULL DEFAULT '1',
  `fullfilled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`requirement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requirement`
--

LOCK TABLES `requirement` WRITE;
/*!40000 ALTER TABLE `requirement` DISABLE KEYS */;
INSERT INTO `requirement` VALUES ('rice',10,1,0,1,2,0),('wheat',60,1,0,2,1,0),('rice',1,1,0,3,1,0),('jjj',9,1,0,4,1,0),('dal',0,1,0,5,1,1),('any',20,1,0,6,4,0),('money',10000,1,0,7,5,0),('pencils',100,1,0,8,3,0),('pencils',100,1,0,9,3,0),('pencils',100,1,0,10,3,0),('box',100,1,1,11,3,0);
/*!40000 ALTER TABLE `requirement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('vB-wylx4Dq-AX27n-q-rG5tijEb-2uf5',1684139889,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":1,\"username\":\"nikita\",\"what\":\"1\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-23 19:54:10
