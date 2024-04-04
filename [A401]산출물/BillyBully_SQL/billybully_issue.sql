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
-- Table structure for table `issue`
--

DROP TABLE IF EXISTS `issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue` (
  `balance` int NOT NULL,
  `id` int NOT NULL,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue`
--

LOCK TABLES `issue` WRITE;
/*!40000 ALTER TABLE `issue` DISABLE KEYS */;
INSERT INTO `issue` VALUES (-200000000,1,'전세사기를 당했습니다. 전세금 2억을 지불합니다.','전세사기'),(-50000000,2,'연인에게 명품백을 사줬습니다. 명품백 구매비용 2억을 지불합니다.','명품백 구입'),(-50000000,3,'충동적으로 BNW를 구입했습니다. 자동차 구매비용 5천만원을 지불합니다.','자동차 구입'),(-10000000,4,'병원에서 전신성형수술을 받았습니다. 수술비 1천만원을 지불합니다.','수술비'),(-70000000,5,'연인과 결혼했습니다. 결혼비용 7천만원을 지불합니다.','결혼'),(50000000,6,'로또 2등에 당첨되었습니다. 당첨금 5천만원을 수령합니다.','로또 당첨'),(10000000,7,'직장에서 해고통지를 받았습니다. 실업급여 1천만원을 수령합니다.','실업'),(50000000,8,'적금이 만기되었습니다. 적금 5천만원을 수령합니다.','적금만기'),(-50000000,9,'소유 부동산이 가압류 되었습니다. 은행에게 5천만원을 지불합니다.','부동산 가압류'),(80000000,10,'정부로부터 창업지원금을 받았습니다. 창업지원금 8천만원을 수령합니다.','창업 지원금'),(-100000000,11,'자녀를 미국으로 유학보냈습니다. 유학비용 1억원을 지불합니다.','자녀 유학'),(40000000,12,'4년 장학금을 받았습니다. 전액 장학금 4천만원을 수령합니다.','전액 장학금');
/*!40000 ALTER TABLE `issue` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  1:49:52
