-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: j10a401.p.ssafy.io    Database: billybully
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

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
-- Table structure for table `situation_effect`
--

DROP TABLE IF EXISTS `situation_effect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `situation_effect` (
  `fintech_id` int NOT NULL,
  `id` int NOT NULL,
  `percentage` int NOT NULL,
  `situation_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKt55l6twawxj49l9u6xxuatyj1` (`situation_id`),
  CONSTRAINT `FKt55l6twawxj49l9u6xxuatyj1` FOREIGN KEY (`situation_id`) REFERENCES `situation` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `situation_effect`
--

LOCK TABLES `situation_effect` WRITE;
/*!40000 ALTER TABLE `situation_effect` DISABLE KEYS */;
INSERT INTO `situation_effect` VALUES (1,1,-10,1),(9,2,-8,1),(5,3,-11,1),(4,4,-12,1),(7,5,-12,1),(3,6,-7,1),(6,7,-7,1),(10,8,-7,1),(3,9,-8,2),(6,10,-5,2),(10,11,-12,2),(9,12,-9,2),(3,13,-5,3),(6,14,-8,3),(10,15,-9,3),(8,16,-4,4),(12,17,-11,4),(2,18,-9,5),(8,19,-8,5),(12,20,-6,5),(1,21,-8,5),(25,22,-5,5),(26,23,-7,5),(27,24,-8,5),(28,25,-4,5),(29,26,-7,5),(30,27,-8,5),(31,28,-10,5),(32,29,-12,5),(33,30,-5,5),(34,31,-5,5),(35,32,-5,5),(8,33,8,6),(25,34,8,6),(26,35,8,6),(27,36,8,6),(28,37,1,6),(29,38,2,6),(30,39,3,6),(31,40,4,6),(32,41,5,6),(33,42,6,6),(34,43,7,6),(35,44,8,6),(1,45,6,7),(9,46,7,7),(5,47,3,7),(4,48,3,7),(7,49,4,7),(3,50,5,7),(6,51,6,7),(10,52,11,7),(2,53,7,7),(11,54,8,7),(8,55,9,7),(12,56,10,7),(2,57,8,8),(1,58,7,8),(12,59,8,8),(13,60,6,8),(11,61,10,9),(4,62,11,9),(7,63,6,9),(1,64,6,10),(5,65,5,10),(3,66,8,10),(10,67,4,10),(6,68,8,10),(25,69,7,10),(26,70,6,10),(27,71,8,10),(28,72,5,10),(29,73,8,10),(30,74,9,10),(31,75,10,10),(32,76,6,10),(33,77,5,10);
/*!40000 ALTER TABLE `situation_effect` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  1:49:51
