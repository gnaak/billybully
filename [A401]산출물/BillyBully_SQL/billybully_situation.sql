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
-- Table structure for table `situation`
--

DROP TABLE IF EXISTS `situation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `situation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `story` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `situation`
--

LOCK TABLES `situation` WRITE;
/*!40000 ALTER TABLE `situation` DISABLE KEYS */;
INSERT INTO `situation` VALUES (1,'9.11 테러','2001년 9월 11일, 테러 공격으로 미국의 뉴욕과 워싱턴 D.C.가 공격당하며, 세계 경제에 큰 충격을 주었습니다.'),(2,'COVID 19','코로나 19 팬데믹으로 세계적으로 건강 위기를 초래하며 경제에도 심각한 영향을 미쳤습니다.'),(3,'오일 쇼크','중동에서 원유 생산 제한과 원유 가격 상승으로 경제와 에너지 의존성 위기가 부각됐습니다.'),(4,'세계 전쟁','대규모 국제전쟁이 발발하여, 전세계를 휩쓸며 엄청난 재정 손실 및 인명 손실을 끼쳤습니다.'),(5,'대공황','월스트리트 대폭락으로 시작되어 미국을 기준으로 세계적으로 경제 침체가 발생하고, 실업률 증가하고 빈곤 확산, 물가 하락에 영향을 미쳤습니다.'),(6,'한강의 기적','대한민국이 수출 중심 경제 모델과 기술 혁신을 기반으로 빠르게 성장하여 세계에 인상적인 성과를 이루었습니다.'),(7,'뉴딜정책','루즈벨트 대통령의 뉴딜정책은 대공황 시기에 경제 회복을 위해 공공 프로젝트와 사회복지 프로그램을 실시하는데 성공하여 미국경제를 활성화 시켰습니다.'),(8,'마셜플랜','제 2차 세계대전 이후 미국이 유럽 국가들의 경제 회복을 지원하기 위해 마셜 플랜을 시행하였습니다.'),(9,'아베노믹스','일본의 총리 아베 신조가 디플레이션과 경제 불확실성에 대항하기 위해 정책을 시행하였습니다. 통화 완화, 재정 정책, 구조개혁을 포함해 경제 회복과 더불어 인플레이션을 목표로 하였습니다.'),(10,'3저 호황','저달러·저유가·저금리를 동시에 경험하며, 대한민국의 경제 안정과 최대 호황에 기여하였습니다.');
/*!40000 ALTER TABLE `situation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  1:49:54
