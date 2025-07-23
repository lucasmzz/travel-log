ALTER TABLE `location` ADD `userId` integer NOT NULL REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `locationLog` ADD `userId` integer NOT NULL REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `locationLogImage` ADD `userId` integer NOT NULL REFERENCES user(id);