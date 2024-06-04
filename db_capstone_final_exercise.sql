/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `categories` (
  `category_id` varchar(255) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_content` text,
  `created_date` timestamp NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `course_enrollment` (
  `enrollment_id` int NOT NULL AUTO_INCREMENT,
  `created_date` timestamp NULL DEFAULT NULL,
  `status` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `course_id` int NOT NULL,
  PRIMARY KEY (`enrollment_id`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_enrollment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `course_enrollment_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `aliases` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `description` text,
  `views` int DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `group_code` varchar(50) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `number_of_students` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `category_id` varchar(255) NOT NULL,
  PRIMARY KEY (`course_id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_type` (
  `user_type_id` int NOT NULL AUTO_INCREMENT,
  `user_type_code` varchar(255) DEFAULT NULL,
  `user_type_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `full_name` varchar(1000) DEFAULT NULL,
  `email` varchar(1000) DEFAULT NULL,
  `phone` varchar(1000) DEFAULT NULL,
  `pass_word` varchar(1000) DEFAULT NULL,
  `user_type_code` varchar(255) DEFAULT NULL,
  `user_type_name` varchar(255) DEFAULT NULL,
  `group_code` varchar(50) DEFAULT NULL,
  `birthday` varchar(50) DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  `face_app_id` varchar(255) DEFAULT NULL,
  `refresh_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
('BackEnd', 'Lập trình Backend');
INSERT INTO `categories` (`category_id`, `category_name`) VALUES
('Design', 'Thiết kế Web');
INSERT INTO `categories` (`category_id`, `category_name`) VALUES
('DiDong', 'Lập trình di động');
INSERT INTO `categories` (`category_id`, `category_name`) VALUES
('FrontEnd', 'Lập trình Front end'),
('FullStack', 'Lập trình Full Stack'),
('TuDuy', 'Tư duy lập trình');

INSERT INTO `comments` (`comment_id`, `comment_content`, `created_date`, `user_id`, `course_id`) VALUES
(1, 'This course is very useful and provides in-depth knowledge about the subject.', '2024-04-24 02:42:26', 3, 1);
INSERT INTO `comments` (`comment_id`, `comment_content`, `created_date`, `user_id`, `course_id`) VALUES
(2, 'I learned a lot from this course and have applied it to my daily work.', '2024-04-24 02:42:26', 3, 2);
INSERT INTO `comments` (`comment_id`, `comment_content`, `created_date`, `user_id`, `course_id`) VALUES
(3, 'The teaching style in the course was very clear and easy to understand, it was truly a great learning experience.', '2024-04-24 02:42:26', 5, 4);
INSERT INTO `comments` (`comment_id`, `comment_content`, `created_date`, `user_id`, `course_id`) VALUES
(4, 'I really like the way the teacher teaches, he/she is very dedicated and enthusiastic.', '2024-04-24 02:42:26', 3, 4),
(5, 'Course content is updated regularly and accurately reflects the real situation.', '2024-04-24 02:42:26', 6, 4),
(6, 'This course has helped me develop my skills and broaden my perspective on my field.', '2024-04-24 02:42:26', 10, 4),
(7, 'I am very satisfied with this course and will recommend it to my friends and colleagues.', '2024-04-24 02:42:26', 10, 9),
(8, 'Whether you are a beginner or experienced, this course is suitable and beneficial.', '2024-04-24 02:42:26', 8, 9),
(9, 'Lectures in the course are presented in a logical and orderly manner, making learning easier.', '2024-04-24 02:42:26', 6, 9),
(10, 'Lectures in the course are presented in a logical and orderly manner, making learning easier.', '2024-04-24 02:42:26', 5, 10);

INSERT INTO `course_enrollment` (`enrollment_id`, `created_date`, `status`, `user_id`, `course_id`) VALUES
(1, '2024-04-24 02:46:20', 1, 3, 1);
INSERT INTO `course_enrollment` (`enrollment_id`, `created_date`, `status`, `user_id`, `course_id`) VALUES
(2, '2024-04-24 02:46:20', 1, 5, 2);
INSERT INTO `course_enrollment` (`enrollment_id`, `created_date`, `status`, `user_id`, `course_id`) VALUES
(3, '2024-04-24 02:46:20', 1, 6, 3);
INSERT INTO `course_enrollment` (`enrollment_id`, `created_date`, `status`, `user_id`, `course_id`) VALUES
(4, '2024-04-24 02:46:20', 2, 8, 4),
(5, '2024-04-24 02:46:20', 2, 10, 5);

INSERT INTO `courses` (`course_id`, `aliases`, `course_name`, `description`, `views`, `image`, `group_code`, `created_date`, `number_of_students`, `user_id`, `category_id`) VALUES
(1, 'search-algorithm', 'Search algorithm', 'In computer science, a search algorithm is an algorithm that takes as input a problem and returns a solution to that problem, haha usually after considering a series of solutions. Maybe. Most algorithms studied by computer scientists to solve problems are search algorithms. The set of all possible solutions to a problem is called the search space. Brute-force search or \"primitive\" search algorithm without information uses the simplest and most intuitive method. Meanwhile, informed search algorithms use heuristics to apply knowledge about the structure of the search space to reduce the time needed to search...', 1000, 'giai-thuat-tim-kiem-gp09.jpg', 'GP09', '2024-04-24 02:31:54', 50, 1, 'BackEnd');
INSERT INTO `courses` (`course_id`, `aliases`, `course_name`, `description`, `views`, `image`, `group_code`, `created_date`, `number_of_students`, `user_id`, `category_id`) VALUES
(2, 'basic-data-structure', 'Basic data structures', 'In computer science, a data structure is a way of storing data in a computer so that it can be used effectively.\r\n\r\nWhen designing many types of programs, the choice of data structure is an important issue. Experience in building large systems shows that the difficulty of program implementation, and the quality and performance of the final result depend greatly on choosing the best data structure.\r\n\r\nEach type of data structure is suitable for a number of different types of applications, some data structures are for special tasks. For example, B-trees are particularly relevant in database design. Once the data structure is chosen, it\'s usually easy to know which algorithm to use. Sometimes the process works in reverse order: data structures are chosen because certain important problems have algorithms that run best with some particular data structure. In both cases, the choice of data structure is very important.', 2000, 'cau-truc-du-lieu-co-ban_gp09.png', 'GP09', '2024-04-24 02:31:54', 60, 2, 'Design');
INSERT INTO `courses` (`course_id`, `aliases`, `course_name`, `description`, `views`, `image`, `group_code`, `created_date`, `number_of_students`, `user_id`, `category_id`) VALUES
(3, 'binary-tree-search', 'Binary Tree Search', 'A binary search tree is a basic data structure used to build more abstract data structures such as sets, multiple sets, and combinations.\r\nIf the BST contains identical values then it represents multiple sets. Trees of this type use non-strict inequalities. Every node in the left subtree has a key smaller than the parent\'s key, every node in the right subtree has a key greater than or equal to the parent\'s key.\r\nIf the BST does not contain identical values then it represents a unary set as in set theory. Trees of this type use strict inequalities. Every node in the left subtree has a key smaller than the parent\'s key, every node in the right subtree has a key larger than the parent\'s key.\r\nIt is up to each person to choose to place equal values in the right (or left) subtree. Some people also give equal value to both sides but then the search becomes more complicated.', 3000, 'cay-nhi-phan-tim-kiem_gp09.png', 'GP09', '2024-04-24 02:31:54', 70, 1, 'TuDuy');
INSERT INTO `courses` (`course_id`, `aliases`, `course_name`, `description`, `views`, `image`, `group_code`, `created_date`, `number_of_students`, `user_id`, `category_id`) VALUES
(4, 'antd-introduction', 'Antd Introduction', 'Enterprise-grade UI design language and React UI library with high-quality React component set, one of the best React UI libraries for business.', 4000, 'antd-introduction_gp09.png', 'GP09', '2024-04-24 02:31:54', 80, 4, 'FrontEnd'),
(5, 'oop-basic', 'OOP Basic', 'OOP (abbreviation for Object Oriented Programming) - object-oriented programming is a programming method based on the concept of classes and objects. OOP focuses on manipulating objects rather than the logic to manipulate them, making code easier to manage, reuse, and maintain.\r\n\r\nAny developer who wants to go on the programming path must know about OOP.', 5000, 'oop-basic_gp09.jpg', 'GP09', '2024-04-24 02:31:54', 90, 7, 'TuDuy'),
(6, 'flutter-introduce', 'Flutter Introduce', 'Flutter is an open source mobile application development SDK created by Google. It is used to develop apps for Android and iOS and is also the primary method for creating apps for Google Fuchsia.', 6000, 'flutter-introduce_gp09.png', 'GP09', '2024-04-24 02:31:54', 100, 2, 'DiDong'),
(7, 'introduction-to-angular', 'Introduction To Angular', 'Angular is an open source code written in TypeScript and used to design web interfaces (front-end). Angular was built and developed by Google since 2009 and maintained by Google until now. This is considered a powerful and specialized front end framework for programmers using advanced HTML.', 7000, 'introduction-to-angular.png', 'GP09', '2024-04-24 02:31:54', 110, 9, 'DiDong'),
(8, 'java-basic', 'Java Basic', 'Java is a widely used programming language for coding web applications. This language has been a popular choice among developers for over 2 decades. There are millions of Java applications in use today. Java is a cross-platform, object-oriented, network-focused language and can be used as a platform. It is a fast, secure, reliable programming language for coding everything from mobile apps and enterprise software to big data applications and server-side technologies.', 8000, 'java-basic_gp09.png', 'GP09', '2024-04-24 02:31:54', 120, 1, 'BackEnd'),
(9, 'modern-react-with-redux', 'Modern React with Redux', 'Redux is a predictable state management engine for JavaScript applications. It helps you write consistent applications that can run in different environments (client, server, and native) and are easy to test. Redux is inspired by the ideas of the Elm language and Facebook\'s Flux architecture. Therefore, Redux is often used in combination with React.', 9000, 'modern-react-with-redux_gp09.jpg', 'GP09', '2024-04-24 02:31:54', 130, 9, 'FrontEnd'),
(10, 'vuejs-basic', 'VueJS Basic', 'The Vue.js course provides comprehensive training on how to build dynamic web applications with Vue.js, a progressive JavaScript framework. Participants will learn core concepts of Vue.js, including reactive data binding, component-based architecture, and Vue Router for efficient single-page applications, allowing them to create Modern and responsive user interface.', 10000, 'vuejs-basic_gp09.jpg', 'GP09', '2024-04-24 02:31:54', 140, 9, 'FrontEnd'),
(15, 'Next_JS', 'Next_JS', 'This course very good', 900, NULL, 'GP01', '2024-05-30 05:48:21', 900, 15, 'FrontEnd');

INSERT INTO `user_type` (`user_type_id`, `user_type_code`, `user_type_name`) VALUES
(1, 'GV', 'Giáo vụ');
INSERT INTO `user_type` (`user_type_id`, `user_type_code`, `user_type_name`) VALUES
(2, 'HV', 'Học viên');


INSERT INTO `users` (`user_id`, `account`, `full_name`, `email`, `phone`, `pass_word`, `user_type_code`, `user_type_name`, `group_code`, `birthday`, `avatar`, `face_app_id`, `refresh_token`) VALUES
(1, 'user1', 'User One', 'user1@gmail.com', '1234567890', '1aA@abcdef', 'GV', 'Giáo vụ', 'GP01', '01-01-1990', NULL, NULL, NULL);
INSERT INTO `users` (`user_id`, `account`, `full_name`, `email`, `phone`, `pass_word`, `user_type_code`, `user_type_name`, `group_code`, `birthday`, `avatar`, `face_app_id`, `refresh_token`) VALUES
(2, 'user2', 'User Two', 'user2@gmail.com', '0987654321', '2aA@abcdef', 'GV', 'Giáo vụ', 'GP01', '01-01-1991', NULL, NULL, NULL);
INSERT INTO `users` (`user_id`, `account`, `full_name`, `email`, `phone`, `pass_word`, `user_type_code`, `user_type_name`, `group_code`, `birthday`, `avatar`, `face_app_id`, `refresh_token`) VALUES
(3, 'user3', 'User Three', 'user3@gmail.com', '1357924680', '3aA@abcdef', 'HV', 'Học viên', 'GP01', '01-01-1992', NULL, NULL, NULL);
INSERT INTO `users` (`user_id`, `account`, `full_name`, `email`, `phone`, `pass_word`, `user_type_code`, `user_type_name`, `group_code`, `birthday`, `avatar`, `face_app_id`, `refresh_token`) VALUES
(4, 'user4', 'User Four', 'user4@gmail.com', '2468013579', '4aA@abcdef', 'GV', 'Giáo vụ', 'GP01', '01-01-1993', NULL, NULL, NULL),
(5, 'user5', 'User Five', 'user5@gmail.com', '3692581470', '5aA@abcdef', 'HV', 'Học viên', 'GP01', '01-01-1994', NULL, NULL, NULL),
(6, 'user6', 'User Six', 'user6@gmail.com', '4826317509', '6aA@abcdef', 'HV', 'Học viên', 'GP01', '01-01-1995', NULL, NULL, NULL),
(7, 'user7', 'User Seven', 'user7@gmail.com', '5738149620', '7aA@abcdef', 'GV', 'Giáo vụ', 'GP01', '01-01-1996', NULL, NULL, NULL),
(8, 'user8', 'User Eight', 'user8@gmail.com', '6849201735', '8aA@abcdef', 'HV', 'Học viên', 'GP01', '01-01-1997', NULL, NULL, NULL),
(9, 'user9', 'User Nine', 'user9@gmail.com', '7950312846', '9aA@abcdef', 'GV', 'Giáo vụ', 'GP01', '01-01-1998', NULL, NULL, NULL),
(10, 'user10', 'User Ten', 'user10@gmail.com', '8061423957', '10aA@abcdef', 'HV', 'Học viên', 'GP01', '01-01-1999', NULL, NULL, NULL),
(11, 'Phuoc', 'Phuoc', 'phuoc@gmail.com', '0942387549', '12345678', 'HV', 'Học viên', 'GP01', '01-01-2000', NULL, NULL, NULL),
(12, 'Phuc', 'Phuc', 'phuc@gmail.com', '0942387549', '12345678', 'HV', 'Học viên', 'GP01', '01-01-2001', NULL, NULL, NULL),
(14, 'Phat', 'Phat', 'phat@gmail.com', '0942387549', '$2b$10$1M7/o7APwJu63a/iXxGef.MI6FrsWEF.A0UC82hKFevILL3Rp743m', 'HV', 'Học viên', 'GP01', '01-01-2002', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE3MTQ5OTMwMTgsImV4cCI6MTc0NjU1MDYxOH0.SAWUVW9WE1zGA75I5pHwIRMjAH29r1QM7IMEiEeucMM'),
(15, 'Phuong', 'Phuong', 'phuong@gmail.com', '0948758714', '123456', 'GV', 'Giáo vụ', 'GP01', '01-02-1991', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE3MTcwNDYwMTIsImV4cCI6MTc0ODYwMzYxMn0.Upp-v3shmzfmQKBJzhTDmMr_hsmLg0AlesH9JYZi03M'),
(24, 'Phi', 'Phi', 'phi@gmail.com', '0948758714', '123', 'HV', 'Học viên', 'GP01', '01-02-1991', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJhY2NvdW50IjoiUGhpIiwiaWF0IjoxNzE1MjMwMzAxLCJleHAiOjE3NDY3ODc5MDF9.r4tcAsqEdNcjdRd0Rnsbh0S4hC9vea9yw2Tko84_GTc'),
(25, 'Phut', 'Phut', 'phut@gmail.com', '0948758714', '2953460395', 'HV', 'Học viên', 'GP02', '01-02-1991', NULL, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE1LCJpYXQiOjE3MTUyNDk3NTUsImV4cCI6MTc0NjgwNzM1NX0.QYz7a1FgCdaYLyUUaF1BX8ACA7WJw5PTiJ4rC86maM4');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;