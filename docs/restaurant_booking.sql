/*
 Navicat Premium Dump SQL

 Source Server         : homemysql
 Source Server Type    : MySQL
 Source Server Version : 80404 (8.4.4)
 Source Host           : home.sean.date:30786
 Source Schema         : restaurant_booking

 Target Server Type    : MySQL
 Target Server Version : 80404 (8.4.4)
 File Encoding         : 65001

 Date: 26/03/2025 17:34:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for available_dates
-- ----------------------------
DROP TABLE IF EXISTS `available_dates`;
CREATE TABLE `available_dates`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_id` int NOT NULL,
  `date` date NOT NULL COMMENT '日期',
  `is_available` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可预订',
  `reason` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '不可预订原因，如\"休息日\"、\"已满\"',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `restaurant_id`(`restaurant_id` ASC, `date` ASC) USING BTREE,
  CONSTRAINT `available_dates_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 128 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '餐厅可预订日期' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for booking_status_logs
-- ----------------------------
DROP TABLE IF EXISTS `booking_status_logs`;
CREATE TABLE `booking_status_logs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `old_status` enum('pending','confirmed','completed','canceled','no_show') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '原状态',
  `new_status` enum('pending','confirmed','completed','canceled','no_show') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '新状态',
  `reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '变更原因',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `booking_id`(`booking_id` ASC) USING BTREE,
  CONSTRAINT `booking_status_logs_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '预订状态变更日志' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for bookings
-- ----------------------------
DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '预订号',
  `user_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `booking_date` date NOT NULL COMMENT '预订日期',
  `time_slot_id` int NOT NULL COMMENT '预订时间段',
  `guest_count` int NOT NULL COMMENT '用餐人数',
  `deposit_amount` decimal(10, 2) NOT NULL COMMENT '订金总额',
  `remaining_payment` decimal(10, 2) NOT NULL COMMENT '到店需付金额',
  `total_amount` decimal(10, 2) NOT NULL COMMENT '总金额',
  `status` enum('pending','confirmed','completed','canceled','no_show') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'confirmed' COMMENT '预订状态',
  `notes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '备注信息',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `booking_number`(`booking_number` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `restaurant_id`(`restaurant_id` ASC) USING BTREE,
  INDEX `time_slot_id`(`time_slot_id` ASC) USING BTREE,
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `bookings_ibfk_3` FOREIGN KEY (`time_slot_id`) REFERENCES `time_slots` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '预订表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for date_slot_capacity
-- ----------------------------
DROP TABLE IF EXISTS `date_slot_capacity`;
CREATE TABLE `date_slot_capacity`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_id` int NOT NULL,
  `date` date NOT NULL COMMENT '日期',
  `time_slot_id` int NOT NULL COMMENT '时间段ID',
  `capacity` int NOT NULL COMMENT '当日该时间段容量（桌数）',
  `booked` int NOT NULL DEFAULT 0 COMMENT '已预订数量',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `restaurant_id`(`restaurant_id` ASC, `date` ASC, `time_slot_id` ASC) USING BTREE,
  INDEX `time_slot_id`(`time_slot_id` ASC) USING BTREE,
  CONSTRAINT `date_slot_capacity_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `date_slot_capacity_ibfk_2` FOREIGN KEY (`time_slot_id`) REFERENCES `time_slots` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1971 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '日期时间段容量表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for features
-- ----------------------------
DROP TABLE IF EXISTS `features`;
CREATE TABLE `features`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '特色名称',
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图标名称（FontAwesome）',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '特色标签表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for restaurant_features
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_features`;
CREATE TABLE `restaurant_features`  (
  `restaurant_id` int NOT NULL,
  `feature_id` int NOT NULL,
  PRIMARY KEY (`restaurant_id`, `feature_id`) USING BTREE,
  INDEX `feature_id`(`feature_id` ASC) USING BTREE,
  CONSTRAINT `restaurant_features_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `restaurant_features_ibfk_2` FOREIGN KEY (`feature_id`) REFERENCES `features` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '餐厅特色关联表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for restaurant_images
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_images`;
CREATE TABLE `restaurant_images`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_id` int NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片URL',
  `is_cover` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否为封面图',
  `display_order` int NOT NULL DEFAULT 0 COMMENT '显示顺序',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `restaurant_id`(`restaurant_id` ASC) USING BTREE,
  CONSTRAINT `restaurant_images_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '餐厅图片表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for restaurants
-- ----------------------------
DROP TABLE IF EXISTS `restaurants`;
CREATE TABLE `restaurants`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '餐厅名称',
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '餐厅类别，如中餐、西餐等',
  `price` decimal(10, 2) NOT NULL COMMENT '人均价格',
  `deposit` decimal(10, 2) NOT NULL COMMENT '每位订金',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '餐厅地址',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '餐厅描述',
  `opening_hours` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '营业时间',
  `lunch_duration` int NOT NULL DEFAULT 90 COMMENT '午市用餐时长(分钟)',
  `dinner_duration` int NOT NULL DEFAULT 120 COMMENT '晚市用餐时长(分钟)',
  `late_threshold` int NOT NULL DEFAULT 15 COMMENT '迟到取消阈值(分钟)',
  `cancellation_policy` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '取消政策',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '餐厅电话',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '餐厅表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int NOT NULL,
  `user_id` int NOT NULL,
  `restaurant_id` int NOT NULL,
  `rating` tinyint NOT NULL COMMENT '评分（1-5）',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '评价内容',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `booking_id`(`booking_id` ASC) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `restaurant_id`(`restaurant_id` ASC) USING BTREE,
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '评价表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for time_slots
-- ----------------------------
DROP TABLE IF EXISTS `time_slots`;
CREATE TABLE `time_slots`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant_id` int NOT NULL,
  `slot_time` time NOT NULL COMMENT '时间段，如11:00',
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `max_capacity` int NULL DEFAULT NULL,
  `is_active` int NULL DEFAULT 1,
  `is_lunch` tinyint(1) NOT NULL COMMENT '是否为午市时间',
  `default_capacity` int NOT NULL COMMENT '默认容量（桌数）',
  `active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否可用',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `restaurant_id`(`restaurant_id` ASC, `slot_time` ASC) USING BTREE,
  CONSTRAINT `time_slots_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '餐厅可预订时间段' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '手机号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码（加密后存储）',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户称呼',
  `gender` enum('先生','女士') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '先生' COMMENT '性别称呼',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '头像URL',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否激活',
  `last_login` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `phone`(`phone` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
