const PORT = 8080
const http = require('http')
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')

var multipart = require('connect-multiparty') //在处理模块中引入第三方解析模块 
var multipartMiddleware = multipart()
var uploadPath = './upload'
var md5Path = './file-md5'

var app = express()
var fileIndex = 1

app.post('/upload', multipartMiddleware, (req, res, next) => {
  let data = req.body
  let fileData = req.files.fileContent

  res.writeHead(200, {'Content-Type': 'text/plain'})

  // 上传目录是否存在，不存在则创建
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath)
  }

  // 保存文件MD5的目录是否存在，不存在则创建
  if (!fs.existsSync(md5Path)) {
    fs.mkdirSync(md5Path)
  }

  if (fileIndex == 1) {
    if (fs.existsSync(md5Path + '/md5.txt')) {
      let fileContent = fs.readFileSync(md5Path + '/md5.txt', 'utf-8')
      if(fileContent.indexOf(`[${data.fileMD5}]`) != -1) {
        res.write(JSON.stringify({exist: 1, success: true}))
        res.end()
        return
      }
    } else {
      fs.writeFile(md5Path + '/md5.txt', '')
    }
  }

  if (fileIndex == data.fileChunks) {
    fileIndex = 1
    fs.renameSync(fileData.path, './upload/' + data.fileName)
    fs.appendFileSync(md5Path + '/md5.txt', `[${data.fileMD5}]`)
  } else if (fileIndex == data.fileIndex) {
    fileIndex++
    let fileChunk = fs.readFileSync(fileData.path)
    fs.appendFile('./upload/' + data.fileName, fileChunk)
  }

  res.write(JSON.stringify({exist: 0, success: true}))
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