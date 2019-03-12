CREATE USER IF NOT EXISTS test;

CREATE DATABASE IF NOT EXISTS test_database;

CREATE TABLE IF NOT EXISTS test_database.taxonomy
(
  id TEXT,
  data jsonb,
  created_date timestamp with time zone DEFAULT now(),
  modified_date timestamp with time zone DEFAULT now(),
  CONSTRAINT configs_pkey PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS created_date ON test_database.taxonomy(created_date);
CREATE INDEX IF NOT EXISTS modified_date ON test_database.taxonomy(modified_date);

GRANT ALL ON TABLE test_database.* TO test;
