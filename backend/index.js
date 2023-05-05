const connectToMongo=require('./db')
const express = require('express')
var cors = require('cors')
const  generateUploadURL  = require('./utils/s3') ;

connectToMongo()
const app = express()
const port = 5000

app.get('/',(req,res)=>{
  res.send("Hello")
})
app.get('/s3Url', async (req, res) => {
  console.log(req.body)
  const url = await generateUploadURL()
  res.send({url})
})

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`notebook listening on port ${port}`)
})
