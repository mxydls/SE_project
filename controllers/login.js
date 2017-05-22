var fn_login = async (ctx, next) => {
    var
        name = ctx.request.body.email || '',
        password = ctx.request.body.password || '';

    console.log(`signing with name: ${name}, password: ${password}`);

    if (/*数据库查询判断*/true) {
        ctx.render('signin-ok.html', {
            title: '登录成功！',
            name: `${name}`
        });
    } else {
        ctx.render('signin-failed.html', {
            title: '登录失败！'
        });
    }
};

module.exports = {
    'POST /signin': fn_login
};