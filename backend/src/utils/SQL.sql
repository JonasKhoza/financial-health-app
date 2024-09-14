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
--DELETE FROM users WHERE username = 'john';
/*
CREATE TABLE IF NOT EXISTS profiles(
	_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	  salutation VARCHAR(10),
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      phone INT,
      user_id UUID,
	  FOREIGN KEY (user_id) REFERENCES users(_id)
)
*/

--DELETE FROM profiles WHERE _id = 'd8613492-d059-4487-894a-183ffc8066c5';
/*
ALTER TABLE profiles
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES users(_id)
ON DELETE CASCADE;
*/
/*
CREATE TABLE quiz_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),               -- Unique ID for each quiz submission
    user_id UUID REFERENCES users(_id),
	question_1 VARCHAR(255) NOT NULL,    -- Question 1 response (text)
    question_2 VARCHAR(255) NOT NULL,    -- Question 2 response (text)
    question_3 VARCHAR(255) NOT NULL,    -- Question 3 response (text)
    question_4 NUMERIC NOT NULL,         -- Question 4 response (numeric)
    question_5 VARCHAR(255) NOT NULL,    -- Question 5 response (text)
    question_6 NUMERIC NOT NULL,         -- Question 6 response (numeric)
    question_7 NUMERIC NOT NULL,         -- Question 7 response (numeric)
    question_8 NUMERIC NOT NULL,         -- Question 8 response (numeric)
    question_9 NUMERIC NOT NULL,         -- Question 9 response (numeric)
    question_10 VARCHAR(255) NOT NULL,   -- Question 10 response (text)
    question_11 VARCHAR(255) NOT NULL,   -- Question 11 response (text)
    question_12 VARCHAR(255) NOT NULL,   -- Question 12 response (text)
    question_13 NUMERIC NOT NULL,        -- Question 13 response (numeric)
    question_14 NUMERIC NOT NULL,        -- Question 14 response (numeric)
    question_15 VARCHAR(255) NOT NULL,   -- Question 15 response (text)
    question_16 VARCHAR(255) NOT NULL    -- Question 16 response (text)
);
*/

--ALTER TABLE quiz_responses RENAME COLUMN id TO _id;
--DELETE FROM quiz_responses WHERE id = '0b634a41-e4c7-4727-8a2a-0f382a305749';
--SELECT * FROM users;
--SELECT * FROM profiles;
SELECT * FROM quiz_responses;
