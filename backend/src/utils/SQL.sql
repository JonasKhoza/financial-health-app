--CREATE EXTENSION IF NOT EXISTS "pgcrypto";
/*
  CREATE TABLE IF NOT EXISTS users (
      _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(100) NOT NULL,
      "password" VARCHAR(50) NOT NULL,
      username VARCHAR(100) DEFAULT NULL
    );
*/
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
 /*CREATE TABLE IF NOT EXISTS users (
      _id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      email VARCHAR(100) NOT NULL,
      "password" VARCHAR(50) NOT NULL,
      username VARCHAR(100) DEFAULT NULL
    );*/

--ALTER TABLE users ALTER COLUMN "password" TYPE TEXT;
--UPDATE users SET username = 'Test' WHERE email = 'test@example.com';
--ALTER TABLE users ALTER COLUMN username SET NOT NULL;
--ALTER TABLE users ADD CONSTRAINT unique_username UNIQUE (username);
--SELECT * FROM users;