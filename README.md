CREATE DATABASE my_database;<br/><br/>
CREATE TABLE companies( cin VARCHAR(30) PRIMARY KEY, name VARCHAR(300) );<br/><br/>
getCompanies => const url = 'SELECT * FROM companies ORDER BY ' + who + " " + how + " LIMIT $1 OFFSET $2";<br/><br/>
searchCompanies => const url = 'SELECT * FROM companies WHERE to_tsvector(name) @@ to_tsquery($1) OR to_tsvector(cin) @@ to_tsquery($2) ORDER BY ' + who + " " + how + " LIMIT $3 OFFSET $4";<br/><br/>
insertCompanies => const url = 'INSERT INTO companies (cin, name) VALUES ($1, $2) RETURNING *';
