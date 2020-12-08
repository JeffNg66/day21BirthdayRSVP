// load modules
const express = require('express'),
      bodyParser = require('body-parser'),
      secureEnv = require('secure-env'),
      cors = require('cors'),
      mysql = require('mysql2/promise')

// create instance of express
const app = express()

// configure environment
app.use(cors())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb'}))

global.env = secureEnv({secret:'isasecret'})
const PORT = global.env.PORT

// configure database pool
const pool = mysql.createPool({
    host: global.env.MYSQL_SERVER,
    port: global.env.MYSQL_PORT,
    user: global.env.MYSQL_USERNAME,
    password: global.env.MYSQL_PASSWORD,
    database: global.env.MYSQL_DATABASE,
    connectionLimit: global.env.MYSQL_CONNECTION
})

// setup SQL statement
const queryAllRSVP = "select * from rsvp order by id desc"
const insertRSVP = "insert into rsvp (name, email, phone, status, createdBy, createdDt) values (?, ?, ?, ?, ?, CURDATE())"

// make SQL function 
const makeQuery = (sql, pool) => {
    return (async (args) => {
        const conn = await pool.getConnection();
        try {
            let results = await conn.query(sql, args || [])
            return results[0]
        } catch (err) {
            console.error(err)
        } finally {
            conn.release()
        }
    })
}

const findAllRsvp = makeQuery(queryAllRSVP, pool)
const saveRsvp = makeQuery(insertRSVP, pool)

// 
app.get("/api/rsvps", (req, res) => {
    findAllRsvp()
        .then( results => {
            // for (let r of results)
            //     console.log(r.id)
            res.status(200).json(results)
        })
        .catch( err => {
            console.error(err)
            res.status(500).end()
    })
})

app.post("/api/rsvps", (req, res) => {
    saveRsvp([req.body.name, req.body.email, req.body.phone, req.body.status, 1])
        .then( result => {
            res.status(200).json(result)
        })
        .catch( err => {
            console.error(err)
            res.status(500).json(err)
        })
})

// start PORT listening
app.listen(PORT, () => {
    console.log(`Express server started at ${PORT} on ${new Date()}`)
})