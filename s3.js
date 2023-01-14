require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3');
const { response } = require('express');

const bucketName=process.env.AWS_BUCKET_NAME;
const region=process.env.AWS_BUCKET_REGION;
const accessKeyId=process.env.AWS_ACCESS_KEY;
const secretAccessKey=process.env.AWS_SECRET_KEY;

const s3=new S3({
    region,
    accessKeyId,
    secretAccessKey
});

// uploads to s3
function uploadFile(file){
    const fileStream=fs.createReadStream(file.path);

    const uploadParms={
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParms).promise();
    
}
exports.uploadFile=uploadFile;
