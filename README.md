# html5-resume
基于HTML5 File API和node.js实现的断点续传——文件上传，以及秒传功能

主要使用 HTML5 File API 的 Blob 对象的slice方法对文件进行分块，然后进行上传操作
秒传功能，主要是前端通过 spark-md5.js 获取文件的MD5，然后发送给服务端，服务端进行判断MD5值是否存在

后端用node.js实现文件块的合并、重名、存储等操作，以及文件MD5值的存储和判断

本项目主要是体现下文件断点续传以及秒传功能的大概实现思路，代码还比较粗糙，后面将继续改进

```bash
$ npm install
$ npm run dev
```
浏览器输入：localhost:8080
