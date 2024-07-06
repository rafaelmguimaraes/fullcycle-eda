CREATE DATABASE IF NOT EXISTS wallet;
USE wallet;
CREATE TABLE `clients` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255),
    `email` VARCHAR(255),
    `created_at` DATE,
    PRIMARY KEY (`id`)
);
CREATE TABLE `accounts` (
    `id` VARCHAR(255) NOT NULL,
    `client_id` VARCHAR(255),
    `balance` INT,
    `created_at` DATE,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`)
);

CREATE TABLE `transactions` (
    `id` VARCHAR(255) NOT NULL,
    `account_id_from` VARCHAR(255),
    `account_id_to` VARCHAR(255),
    `amount` INT,
    `created_at` DATE,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`account_id_from`) REFERENCES `accounts` (`id`),
    FOREIGN KEY (`account_id_to`) REFERENCES `accounts` (`id`)
);
 
INSERT INTO
    `clients`
VALUES
    ('723895f9-7f29-457b-8431-5b7ec10d7444', 'John Doe', 'john@j.com', '2021-01-01'),
    ('cb4364f5-e4e2-4978-b18a-d33512716d69', 'Jane Doe', 'jane@j.com', '2021-01-01');

INSERT INTO
    `accounts`
VALUES
    ('9d723f4a-7123-4991-8283-fc9489fbf3ff', '723895f9-7f29-457b-8431-5b7ec10d7444', 1000, '2021-01-01'),
    ('847b1897-a733-47fd-b0ba-bcc338f5a2bd', 'cb4364f5-e4e2-4978-b18a-d33512716d69', 1000, '2021-01-01');


