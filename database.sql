CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY,
    "task" VARCHAR (256) NOT NULL,
    "complete" BOOLEAN DEFAULT false
);

INSERT INTO "tasks" ("task") 
    VALUES ('Feed the fish'),
    ('Look at memes'),
    ('Water plants'),
    ('Sing in the shower'),
    ('Walk the dog'),
    ('Weed the garden'),
    ('Play the floor is lava');
