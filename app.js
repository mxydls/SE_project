const
    Koa = require('Koa');
    router = require('koa-router')();
    fs = require('fs');
    http = require('http');
    url = require('url');
    path = require('path');
    crypto = require('crypto');
    bodyParser = require('koa-bodyparser');
    controller = require('./controller');
    staticFiles = require('./static-files');
    templating = require('./templating');

const app = new Koa();

count = 0;

app.use(async (context, next) => {
	count++;
    console.log(`正在处理第${count}个请求`);
    let start = new Date().getTime();
    await next();
    // console.log(context.state);
    context.response.set('X-Response-Time', new Date().getTime() - start);
    console.log(`完成处理第${count}个请求`);
});

//添加request  body解析
app.use(bodyParser());

//添加静态文件处理
app.use(staticFiles('/static/', __dirname));

//给context映射render函数
app.use(templating('views', {
    noCache: (typeof isProduction == undefined) || !isProduction,
    watch: (typeof isProduction == undefined) || !isProduction,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
}));

//添加get  post处理
app.use(controller());

app.listen(8080);