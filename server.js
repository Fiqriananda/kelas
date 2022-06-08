const express = require('express');
const mysql = require('mysql');
const BodyParser = require('body-parser');
const app = express();
app.set("view engine", "ejs")
app.set("views", "views")
app.use(BodyParser.urlencoded({ extended: true }))


const db = mysql.createConnection({
    host: "localhost",
    database: "db_kelas",
    user: "root",
    password: "",
})



db.connect((err) => {
    if(err) throw err
    console.log("Database Connect..")

    //Getdata
    app.get("/", (req, res) => {
        const sql = "SELECT * FROM user"
        db.query(sql, (err, result) =>{
            const users = JSON.parse(JSON.stringify(result))
        res.render("table", {users: users, title: "Daftar Murid"})
    })
})

    //insert
        app.post('/tambah', (req, res) => {

            var insertSql = `INSERT INTO user (nama, status) VALUES('${req.body.nama}', '${req.body.status}')`
            db.query(insertSql, (err, result) =>{
                if(err) throw err
                res.redirect("/");
            })
        
    })
})

app.listen(8000, () =>{
    console.log('Server Ready');
});