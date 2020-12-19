const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs').promises; //获取promise方法
const chalk = require('chalk');
const { createReadStream, createWriteStream, readFileSync } = require('fs');

const mime = require('mime'); // 获取文件的类型
const ejs = require('ejs'); // 模版引擎
const crypto = require('crypto');

class Server {
  constructor(options) {
    this.port = options.port;
    this.directory = options.directory;
    this.cache = options.cache;
  }
  async handleRequest(req, res) {
    let { pathname } = url.parse(req.url);
    pathname = decodeURIComponent(pathname);

    // 列出所有的文件夹
    // this.directory 这个目录是动态读取的 process.cwd()
    let requestUrl = path.join(this.directory, pathname);
    try {
      const statObj = await fs.stat(requestUrl);
      if (statObj.isDirectory()) {
        const dirs = await fs.readdir(requestUrl);
        let content = await ejs.renderFile(path.join(__dirname, 'template.html'), {
          dirs: dirs.map(item => {
            return {
              pathname: path.join(pathname, item),
              name: item
            }
          })
        })

        // 返回设置的 html 模版
        res.setHeader('Content-Type', 'text/html;chartset=utf-8');
        res.end(content);
      } else {
        // 文件读取
        // 缓存用的修改时间 statObj
        this.sendFile(requestUrl, req, res, statObj);
      }
    } catch (error) {
      this.sendError(error, req, res);
    }
  }
  sendError(err, req, res) {
    console.log(err);
    res.statusCode = 404;
    res.end('Not Found');
  }
  cacheFile(filePath, req, res, statObj) {
    // 强制缓存 Cache-Control
    res.setHeader('Cache-Control', 'max-age=10');
    // res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toUTCString()); // 兼容老的浏览器

    // 协商缓存 Last-Modified  Etag
    const LastModified = statObj.ctime.toUTCString();
    const content = readFileSync(filePath);
    const Etag = crypto.createHash('md5').update(content).digest('base64');

    res.setHeader('Last-Modified', LastModified);
    res.setHeader('Etag', Etag);

    let ifModifiedSince = req.headers['if-modified-since'];
    let ifNoneMatch = req.headers['if-none-match'];
    if (ifModifiedSince !== LastModified) {
      return false;
    }
    if (ifNoneMatch !== Etag) {
      return false;
    }
    return true;
  }
  sendFile(filePath, req, res, statObj) {
    if (this.cacheFile(filePath, req, res, statObj)) {
      res.statusCode = 304;
      return res.end(); // 走缓存
    }

    res.setHeader('Content-Type', `${mime.getType(filePath)};chartset=utf-8`);
    createReadStream(filePath).pipe(res);
  }
  start() {
    // http.createServer(() => this.handleRequest());
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(this.port, () => {
      console.log(`${chalk.yellow('Starting up http-server, serving')}`)
      console.log(`  http://127.0.0.1:${chalk.green(this.port)}`)
    })
  }
}

module.exports = Server;