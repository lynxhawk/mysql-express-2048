/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50173
Source Host           : localhost:3306
Source Database       : gamedb

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2019-07-05 10:34:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES ('cy', '1', '7160', '1');
INSERT INTO `score` VALUES ('lynx', '1', '0', '0');
INSERT INTO `score` VALUES ('lynxhawk', '666', '56', '0');
INSERT INTO `score` VALUES ('sp', '1', '0', '0');
