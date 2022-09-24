const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  database: 'my_database',
  user: 'my_user',
  password: 'root',
  port: 5432,
});


const getCompanies = (limit, who, how) => {
    const url = 'SELECT * FROM companies ORDER BY ' + who + " " + how + " LIMIT $1 OFFSET $2";
    console.log(url);

    return new Promise(function(resolve, reject) {
      pool.query(url, [10, 10*(limit-1)], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
}


const searchCompanies = (query, limit, who, how) => {
    const url = 'SELECT * FROM companies WHERE to_tsvector(name) @@ to_tsquery($1) OR to_tsvector(cin) @@ to_tsquery($2) ORDER BY ' + who + " " + how + " LIMIT $3 OFFSET $4";
    console.log(url);

    return new Promise(function(resolve, reject) {
        query = String(query).replace(" ", "+");
        console.log(query, limit)

        pool.query(url, [query+":*", query+":*", 10, 10*(limit-1)], (error, results) => {
        if (error) {
            reject(error)
        }
        resolve(results.rows);
        })

    })
    }


const createCompanies = (body) => {
return new Promise(function(resolve, reject) {
    const { cin, name } = body;

    pool.query(`INSERT INTO companies (cin, name) VALUES ($1, $2) RETURNING *`, [cin, name], (error, results) => {
    if (error) {
        reject(error)
    }
    resolve(`A new company has been added: ${results.rows[0]}`)
    })
})
}

module.exports = {
    getCompanies,
    createCompanies,
    searchCompanies
}