CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY,
    "task" VARCHAR (256) NOT NULL,
    "complete" BOOLEAN DEFAULT false
);

INSERT INTO "tasks" ("task") 
VALUES ('Send sibling nostalgic gifs'),
    ('Play the floor is lava'),
    ('Look at memes'),
    ('Water plants'),
    ('Walk the dog'),
    ('Weed the garden');
