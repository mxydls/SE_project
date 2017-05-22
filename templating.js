const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var
        autoescape = (typeof opts.autoescape) === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

//从views文件夹下读取模板
// var env = createEnv('views', {
//     watch: true,
//     filters: {
//         hex: function (n) {
//             return '0x' + n.toString(16);
//         }
//     }
// });

function templating(path, opts) {
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // ctx.render = (view, model) => {
        //     ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
        //     ctx.response.type = 'text/html';
        // };

        ctx.mysqlConn = null;

        await next();
    };
}

module.exports = templating;