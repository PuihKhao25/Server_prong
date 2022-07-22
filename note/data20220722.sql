-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: prong_server
-- ------------------------------------------------------
-- Server version	5.7.38-log

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
-- Table structure for table `consultings`
--

DROP TABLE IF EXISTS `consultings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consultings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `place` varchar(550) DEFAULT NULL,
  `image` varchar(550) DEFAULT NULL,
  `dates` datetime DEFAULT NULL,
  `delete_flg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consultings`
--

LOCK TABLES `consultings` WRITE;
/*!40000 ALTER TABLE `consultings` DISABLE KEYS */;
INSERT INTO `consultings` VALUES (4,'Cafe Chair','Gimhae-si, Gyeongsangnam-d','image_1658081472514.png',NULL,'1'),(5,'beautiful one','singapo','http://res.cloudinary.com/dkehuqed7/image/upload/v1658330124/qgd9f5z9dkcgbsidjpbc.jpg','2020-11-09 00:00:00',NULL),(6,'caff','abc','http://res.cloudinary.com/dkehuqed7/image/upload/v1658328206/l8ilshj7qfbwl0dseqtd.jpg','2020-11-09 00:00:00',NULL),(7,'','singapo','http://res.cloudinary.com/dkehuqed7/image/upload/v1658330340/pzmyzokghmjgbbgrbo2n.jpg','2020-11-09 00:00:00',NULL),(8,'abc','singapo','http://res.cloudinary.com/dkehuqed7/image/upload/v1658366719/kttueohp7dmnlljycp7p.jpg','2020-11-09 00:00:00',NULL),(9,'danang','vietnam','http://res.cloudinary.com/dkehuqed7/image/upload/v1658393331/wpgyzgnqaf2amlp7tloz.jpg','2020-11-09 00:00:00',NULL),(10,'Ni','viétnam','http://res.cloudinary.com/dkehuqed7/image/upload/v1658415912/sug744g6bp8ofofzicpy.jpg','2020-11-09 00:00:00',NULL),(11,'Ni','Gialai','http://res.cloudinary.com/dkehuqed7/image/upload/v1658415042/b55fyt7w4gzg3kkcw5oo.jpg','2012-09-09 00:00:00',NULL),(12,'Ni','Gialai','http://res.cloudinary.com/dkehuqed7/image/upload/v1658419100/ovwul8rdgtl3lhjdyyre.jpg','2012-09-09 00:00:00',NULL),(13,'khao','Gialai','http://res.cloudinary.com/dkehuqed7/image/upload/v1658419114/mce3mzntkw0nsfkevwz1.jpg','2012-09-09 00:00:00',NULL);
/*!40000 ALTER TABLE `consultings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipments`
--

DROP TABLE IF EXISTS `equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `place` varchar(255) DEFAULT NULL,
  `image` varchar(550) DEFAULT NULL,
  `dates` datetime DEFAULT NULL,
  `delete_flg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipments`
--

LOCK TABLES `equipments` WRITE;
/*!40000 ALTER TABLE `equipments` DISABLE KEYS */;
INSERT INTO `equipments` VALUES (3,'book','korea','http://res.cloudinary.com/dkehuqed7/image/upload/v1658419492/q53ljwz0uualg1iio42y.jpg','2022-01-02 00:00:00',NULL),(4,'beautiful','singapo','image_1658106332753.jpg',NULL,NULL),(5,'hi','gialai','http://res.cloudinary.com/dkehuqed7/image/upload/v1658421209/ea48lxf75tyw2u3k2prw.jpg','2021-09-12 00:00:00',NULL),(6,'hils','gialai','http://res.cloudinary.com/dkehuqed7/image/upload/v1658421298/lgfrcvxq174udzfrqn3x.jpg','2021-09-12 00:00:00',NULL),(7,'json','gialai','http://res.cloudinary.com/dkehuqed7/image/upload/v1658421312/vxom8yfx4lsvipcnqnnf.jpg','2021-09-12 00:00:00',NULL),(8,'jsonpost','quynhon','http://res.cloudinary.com/dkehuqed7/image/upload/v1658453842/nonbqtkurf7mnnjghtj5.jpg','2021-09-12 00:00:00',NULL),(9,'jsonpostd','quynhonf','http://res.cloudinary.com/dkehuqed7/image/upload/v1658453965/db7pryphrkp7gnvwfvbz.jpg','2021-09-12 00:00:00',NULL),(10,'jsonpostd','quynhonf','http://res.cloudinary.com/dkehuqed7/image/upload/v1658453996/njuaoj6kvkgutuoze8ps.jpg','2021-09-12 00:00:00',NULL),(11,'','quynhonf','http://res.cloudinary.com/dkehuqed7/image/upload/v1658454377/vykttogua4v0kd9oj5li.jpg','2021-09-12 00:00:00',NULL);
/*!40000 ALTER TABLE `equipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `magazines`
--

DROP TABLE IF EXISTS `magazines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `magazines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `space` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `dates` datetime DEFAULT NULL,
  `delete_flg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `magazines`
--

LOCK TABLES `magazines` WRITE;
/*!40000 ALTER TABLE `magazines` DISABLE KEYS */;
INSERT INTO `magazines` VALUES (44,'Cafe Chair','Gimhae-si, Gyeongsangnam-d','abc',NULL,'1'),(45,'Cafe change','Gimhae-si','abcd',NULL,NULL),(46,'cafe black','Gimhae-si','abcd',NULL,NULL),(47,'cafe den','Gimhae-sid','korea','2020-11-09 00:00:00',NULL),(48,'abc','Gimhae-si','abcd',NULL,NULL),(49,'abcd','Gimhae-sid','abcdd',NULL,'1'),(50,'abcd','Gimhae-sid','abcdd',NULL,'1'),(51,'abcd','Gimhae-sid','abcdd',NULL,'1'),(52,'abcde','Gimhae-sid','abcdd','2020-11-09 00:00:00',NULL),(53,'abcd','Gimhae-sid','korea','2020-11-09 00:00:00',NULL);
/*!40000 ALTER TABLE `magazines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (28,'test','test@gmail.com','$2b$10$md4CqT5wz9aED4rKHCvcAuXWla13lKcLiA./jq0czu/hdwiz7dS/W');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-22  8:52:36
