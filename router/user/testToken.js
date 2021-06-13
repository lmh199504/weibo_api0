

module.exports = async (ctx,next) => {
    // if () {
    //
    // }

    ctx.status = 200;
    ctx.body = {
        code: 0,
        resMsg: "token 已经过期了"
    }

}