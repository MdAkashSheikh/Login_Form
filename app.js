const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8484;

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123',
    database: 'example'
});

connection.connect((err)=>{
    if(!err) {
        console.log('Connection successfully.')
    } else {
        console.log('Connection lost.', err)
    }
})

app.use(express.static('./views'));

app.get('/', (req, res) => {
    res.send('index')
});

app.post('/login', (req, res) => {
   
    console.log(req.body)
    connection.query('INSERT INTO newtable (email, password) VALUES (?,?)', [req.body.email, req.body.password],(error, results) => {
       if (error) {
        return res.json({ error: error })
       }
       else {
        res.redirect('/');
       }
       });
   });
   

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}...`);
})