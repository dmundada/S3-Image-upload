
const aws = require('aws-sdk')
const region = "us-west-2"
const bucketName = "image-upload-poc1"
const accessKeyId = 'AKIAU6GFPH7WWCJCNCWJ'
const secretAccessKey = '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'

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

  function generateUploadURL(image) {
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  const imageName = image+genRanHex(12)

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL =  s3.getSignedUrlPromise('putObject', params)
  console.log(uploadURL)
  return uploadURL
}

module.exports=generateUploadURL