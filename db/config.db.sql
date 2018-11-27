
-- create statements for config.db, exported from DB Browser (http://sqlitebrowser.org/)

BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `lights` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`name`	TEXT NOT NULL UNIQUE,
	`url`	TEXT NOT NULL,
	`freq`	INTEGER NOT NULL,
	`description`	TEXT
);
INSERT INTO `lights` (id,name,url,freq,description) VALUES (1,'200','/status?code=200',10,'200 OK'),
 (2,'301','/status?code=301',10,'301 Moved Permanently'),
 (3,'404','/status?code=404',10,'404 Not Found'),
 (4,'500','/status?code=500',10,'500 Internal Server Error'),
 (5,'503','/status?code=503',11,'503 Service Unavailable'),
 (6,'Pattern 1','/status?pattern=1',7,'Error every other second'),
 (7,'Pattern 2','/status?pattern=2',10,'Down for 10 seconds per two minutes'),
 (8,'Pattern 3','/status?pattern=3',10,'Down for 20 seconds per two minutes'),
 (9,'Pattern 4','/status?pattern=4',10,'Down for 35 seconds per two minutes');
CREATE TABLE IF NOT EXISTS `configs_lights` (
	`id_config`	INTEGER NOT NULL,
	`id_light`	INTEGER NOT NULL,
	PRIMARY KEY(`id_config`,`id_light`)
);
INSERT INTO `configs_lights` (id_config,id_light) VALUES (1,1),
 (1,2),
 (1,3),
 (2,1),
 (2,3),
 (2,4),
 (3,1),
 (3,3),
 (3,4),
 (3,5),
 (4,6),
 (4,7),
 (4,8),
 (4,9);
CREATE TABLE IF NOT EXISTS `configs` (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
	`name`	TEXT NOT NULL UNIQUE,
	`description`	TEXT
);
INSERT INTO `configs` (id,name,description) VALUES (1,'config 1','200, 301, 404'),
 (2,'config 2','200, 404, 500'),
 (3,'config 3','200, 404, 500, 503'),
 (4,'config 4','Pattern 1, Pattern 2, Pattern 3, Pattern 4');
COMMIT;
