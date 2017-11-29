const PORT = 8080
const http = require('http')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

var multipart = require('connect-multiparty') //在处理模块中引入第三方解析模块 
var multipartMiddleware = multipart()
var uploadPath = './upload'

var app = express()
var fileIndex

app.post('/upload', multipartMiddleware, (req, res, next) => {
  let data = req.body
  let fileData = req.files.fileContent

  // 上传目录是否存在，不存在则创建
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath)
  }

  if (!fileIndex || fileIndex < data.fileIndex) {
    fileIndex = parseInt(data.fileIndex)

    let fileChunk = fs.readFileSync(fileData.path)
    fs.appendFile('./upload/' + data.fileName, fileChunk)
  } else {
    fileIndex = ''
    fs.renameSync(fileData.path, './upload/' + data.fileName)
  } 

  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end()
})


app.get('/', (req, res) => {
  let form = fs.readFileSync(__dirname + '/index.html', {
    encoding: 'utf8'
  })

  res.send(form)
})

app.listen(PORT)
console.log('Listening the port: ' + PORT)