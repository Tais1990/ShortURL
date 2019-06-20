drop database if exists shortUrl;
create database shortUrl; 
use shortUrl;                  
                                 
CREATE TABLE `urls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `longUrl` varchar(255) NOT NULL,
  `shortUrl` varchar(45) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `countLink` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

insert into `urls`(`longUrl`, `shortUrl`) 
values ('https://www.youtube.com/watch?v=1aaT4pkstMs','1111');

commit;