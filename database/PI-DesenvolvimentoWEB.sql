CREATE DATABASE  IF NOT EXISTS `hamburgueria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hamburgueria`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: hamburgueria
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

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
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `CargoID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `Descricao` varchar(200) NOT NULL,
  PRIMARY KEY (`CargoID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (11,'Admin','Pode');
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `CategoriaID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  PRIMARY KEY (`CategoriaID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `FuncionarioID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `Cargo` int NOT NULL,
  `Usuario` varchar(60) DEFAULT NULL,
  `Senha` text,
  `RG` int DEFAULT NULL,
  PRIMARY KEY (`FuncionarioID`),
  KEY `Cargo_idx` (`Cargo`),
  CONSTRAINT `Cargo` FOREIGN KEY (`Cargo`) REFERENCES `cargos` (`CargoID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (17,'Admin',11,'Admin','$2b$10$aJFtplme//nmydLysBcjFO4ke4Wmxitr9lZitim8MuXj0Q8Bv6uZK',123333);
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `MesaID` int NOT NULL AUTO_INCREMENT,
  `Numero` int NOT NULL,
  PRIMARY KEY (`MesaID`),
  UNIQUE KEY `Numero` (`Numero`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `PedidosID` int NOT NULL AUTO_INCREMENT,
  `mesas_MesaID` int NOT NULL,
  `produtos_ProdutoID` int NOT NULL,
  `DataHora` datetime DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PedidosID`,`mesas_MesaID`,`produtos_ProdutoID`),
  KEY `fk_mesas_has_produtos_produtos1_idx` (`produtos_ProdutoID`),
  KEY `fk_mesas_has_produtos_mesas1_idx` (`mesas_MesaID`),
  CONSTRAINT `fk_mesas_has_produtos_mesas1` FOREIGN KEY (`mesas_MesaID`) REFERENCES `mesas` (`MesaID`),
  CONSTRAINT `fk_mesas_has_produtos_produtos1` FOREIGN KEY (`produtos_ProdutoID`) REFERENCES `produtos` (`ProdutoID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `ProdutoID` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(100) NOT NULL,
  `CategoriaID` int DEFAULT NULL,
  `Preco` decimal(10,2) NOT NULL,
  `IMG` text,
  `Descricao` text,
  PRIMARY KEY (`ProdutoID`),
  KEY `CategoriaID` (`CategoriaID`),
  CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`CategoriaID`) REFERENCES `categorias` (`CategoriaID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20 16:42:08
