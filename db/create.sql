
-- create statements for config.db

CREATE TABLE "configs" (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    `name` TEXT NOT NULL UNIQUE
)

CREATE TABLE "configs_lights" (
    `id_config` INTEGER NOT NULL,
    `id_light` INTEGER NOT NULL, 
    PRIMARY KEY(`id_config`,`id_light`)
)

CREATE TABLE "lights" (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, 
    `name` TEXT NOT NULL UNIQUE, 
    `url` TEXT NOT NULL, 
    `freq` INTEGER NOT NULL
)
