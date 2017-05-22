const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');    //mz封装了标准的fs模块，不用使用回调函数，可以使用await

function staticFiles(url, dir) {
    return async (ctx, next) => {
        let upath = ctx.request.path;
        console.log(upath);
        if(upath.startsWith(url)) {
            let aboPath = path.join(dir, upath);

            if(await fs.exists(aboPath)) {
                ctx.response.type = mime.lookup(aboPath);
                ctx.response.body = await fs.readFile(aboPath);
            }
            else {
                ctx.response.status = 404;
            }
        }
        else {
            await next();
        }
    };
}

module.exports = staticFiles;