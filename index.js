const express = require('express');
const app = express();
const multer = require('multer');
const port = 3000;
app.use(express.static('public'));
const mysql = require('mysql');

// RDS MYSQL
require('dotenv').config()
const mysql_host=process.env.AWS_RDS_HOST;
const mysql_user=process.env.AWS_RDS_USER;
const mysql_password=process.env.AWS_RDS_PASSWORD;
const mysql_database=process.env.AWS_RDS_DATABASE;

// connectionPool
const pool = mysql.createPool({
  connectionLimit : 10,
  host: mysql_host,
  user: mysql_user,
  password: mysql_password,
  database: mysql_database,
  port: "3306"
});

// uploads目錄下
const upload = multer({ dest: 'uploads/' });

const { uploadFile }=require('./s3')

app.post('/images', upload.single('image'), (req, res) => {
  const file=req.file;
  const fileName=file.filename;
  const content=req.body.text;
  const result=uploadFile(file);
  console.log(result);
  pool.query("INSERT INTO CONNECT (CONTENT, ADDRESS) VALUE (?, ?)", [content, fileName], 
    (error, results, fields) => {if (error) throw error;});
  return res.json({"data":"OK"});
});

app.get('/images', (req, res)=>{
  pool.query("SELECT * FROM CONNECT ORDER BY ID DESC",(error, result, fields) => {
      if (error) throw error;
      console.log(result)
      return res.json({"data":result});
    })
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
});