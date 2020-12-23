const Layer = require("./layer");

function Route() {
    this.stack = [];
}
Route.prototype.get = function (handlers) { // handlers 为用户真实的所有的回调
    handlers.forEach(handler => {
        //                     里层不考虑路径 所以是什么都无所谓
        const layer = new Layer('/', handler);
        layer.method = 'get';
        this.stack.push(layer);
    });

}
Route.prototype.dispatch = function (req, res, out) { // 让用户定义的函数 依次执行
    // 等会请求来了 依次让this.stack 中的方法执行即可
    let requestMethod = req.method.toLowerCase();
    let idx = 0;
    const next = () => {
        // todo 当前 layer 中所有的回调执行完后，通过执行 out 回到 router 中继续执行
        if (idx >= this.stack.length) return out();
        let layer = this.stack[idx++];
        if (layer.method == requestMethod) {
            layer.handler(req, res, next);
        } else {
            next();
        }
    }
    next();
}
module.exports = Route