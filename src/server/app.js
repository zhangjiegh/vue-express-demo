import express from 'express'
import http from 'http'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import path from 'path'
const app = express()

//视图模板殷勤
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//基础配置
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));//favicon.ico 在 public下
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//解析json和form
app.use(cookieParser()); //COOKIES
app.use(express.static(path.join(__dirname, 'public')));//静态文件路径 JS CSS images
app.use(logger('dev'));


app.get('/', function (req, res) {
  res.render('index.html')
})

//创建http服务
var server = http.createServer(app);
server.listen(3000);
server.on('error', onError);
server.on('listening', onListening);



//错误回调
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof result.port === 'string'
    ? 'Pipe ' + result.port
    : 'Port ' + result.port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + '无权限启动');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error("启动失败,"+ bind + ' 已经被使用...');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//成功启动服务回调
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log("["+' 启动成功,端口号:' + addr.port+"]");
}
export default app
