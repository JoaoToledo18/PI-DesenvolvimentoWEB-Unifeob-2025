-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema hamburgueria
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hamburgueria
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hamburgueria` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `hamburgueria` ;

-- -----------------------------------------------------
-- Table `hamburgueria`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`cargos` (
  `CargoID` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  `Descricao` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`CargoID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`categorias` (
  `CategoriaID` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`CategoriaID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`funcionarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`funcionarios` (
  `FuncionarioID` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(100) NOT NULL,
  `Cargo` INT NOT NULL,
  `Usuario` VARCHAR(60) NULL DEFAULT NULL,
  `Senha` TEXT NULL DEFAULT NULL,
  `RG` INT NULL DEFAULT NULL,
  PRIMARY KEY (`FuncionarioID`),
  INDEX `Cargo_idx` (`Cargo` ASC) VISIBLE,
  CONSTRAINT `Cargo`
    FOREIGN KEY (`Cargo`)
    REFERENCES `hamburgueria`.`cargos` (`CargoID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`ingredientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`ingredientes` (
  `IngredienteID` INT NOT NULL AUTO_INCREMENT,
  `Descricao` VARCHAR(100) NOT NULL,
  `Quantidade` INT NULL DEFAULT NULL,
  PRIMARY KEY (`IngredienteID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`mesas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`mesas` (
  `MesaID` INT NOT NULL AUTO_INCREMENT,
  `Numero` INT NOT NULL,
  PRIMARY KEY (`MesaID`),
  UNIQUE INDEX `Numero` (`Numero` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`pedidos` (
  `PedidoID` INT NOT NULL AUTO_INCREMENT,
  `MesaID` INT NULL DEFAULT NULL,
  `DataHora` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `Observacao` TEXT NULL DEFAULT NULL,
  `Status` ENUM('Em preparo', 'Pronto', 'Entregue') NULL DEFAULT 'Em preparo',
  PRIMARY KEY (`PedidoID`),
  INDEX `MesaID` (`MesaID` ASC) VISIBLE,
  CONSTRAINT `pedidos_ibfk_1`
    FOREIGN KEY (`MesaID`)
    REFERENCES `hamburgueria`.`mesas` (`MesaID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`produtos` (
  `ProdutoID` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(100) NOT NULL,
  `CategoriaID` INT NULL DEFAULT NULL,
  `Preco` DECIMAL(10,2) NOT NULL,
  `IMG` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`ProdutoID`),
  INDEX `CategoriaID` (`CategoriaID` ASC) VISIBLE,
  CONSTRAINT `produtos_ibfk_1`
    FOREIGN KEY (`CategoriaID`)
    REFERENCES `hamburgueria`.`categorias` (`CategoriaID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`itenspedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`itenspedido` (
  `ItemID` INT NOT NULL AUTO_INCREMENT,
  `PedidoID` INT NULL DEFAULT NULL,
  `ProdutoID` INT NULL DEFAULT NULL,
  `Quantidade` INT NOT NULL,
  PRIMARY KEY (`ItemID`),
  INDEX `PedidoID` (`PedidoID` ASC) VISIBLE,
  INDEX `ProdutoID` (`ProdutoID` ASC) VISIBLE,
  CONSTRAINT `itenspedido_ibfk_1`
    FOREIGN KEY (`PedidoID`)
    REFERENCES `hamburgueria`.`pedidos` (`PedidoID`),
  CONSTRAINT `itenspedido_ibfk_2`
    FOREIGN KEY (`ProdutoID`)
    REFERENCES `hamburgueria`.`produtos` (`ProdutoID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`produtoingredientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`produtoingredientes` (
  `ProdutoID` INT NOT NULL,
  `IngredienteID` INT NOT NULL,
  PRIMARY KEY (`ProdutoID`, `IngredienteID`),
  INDEX `IngredienteID` (`IngredienteID` ASC) VISIBLE,
  CONSTRAINT `produtoingredientes_ibfk_1`
    FOREIGN KEY (`ProdutoID`)
    REFERENCES `hamburgueria`.`produtos` (`ProdutoID`),
  CONSTRAINT `produtoingredientes_ibfk_2`
    FOREIGN KEY (`IngredienteID`)
    REFERENCES `hamburgueria`.`ingredientes` (`IngredienteID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `hamburgueria`.`vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hamburgueria`.`vendas` (
  `VendaID` INT NOT NULL AUTO_INCREMENT,
  `PedidoID` INT NULL DEFAULT NULL,
  `Total` DECIMAL(10,2) NOT NULL,
  `DataHora` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`VendaID`),
  INDEX `PedidoID` (`PedidoID` ASC) VISIBLE,
  CONSTRAINT `vendas_ibfk_1`
    FOREIGN KEY (`PedidoID`)
    REFERENCES `hamburgueria`.`pedidos` (`PedidoID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;