# html5-resume
基于HTML5 File API和node.js实现的断点续传——文件上传

主要使用 HTML5 File API 的 Blob 对象的slice方法对文件进行分块，然后进行上传操作

后端用node.js实现文件块的合并、重名、存储等操作

```bash
$ npm install
$ node app.js
```
浏览器输入：localhost:8080
