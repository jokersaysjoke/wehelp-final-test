const express = require('express');
const app = express();
const multer = require('multer');
const port = 3000;
app.use(express.static('public'));

// uploads目錄下
const upload = multer({ dest: 'uploads/' });

const { uploadFile, getFileStream }=require('./s3')

app.post('/images', upload.single('image'), (req, res) => {
  const file=req.file;
  // console.log(file);
  const result=uploadFile(file);
  console.log(result);

  return res.json({"data":"OK"});
});

app.get('/images', (req, res)=>{
  let list=[];
  getFileStream().then(data => {
    console.log(data)
    const files = data.Contents;
    for(let i=0; i<files.length; i++){
        list.push(`https://d3i2vvc6rykmk0.cloudfront.net/${files[i]["Key"]}`)
      }
      console.log(list)
      return res.json({"data":list});
  });

});

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
});