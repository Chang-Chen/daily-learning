/**
 * 管道函数
 * @param {*} functions 
 * @returns 
 */
function pipe(functions = []) {
    return (...args) => {
        return functions.reduce(async (prev, cur) => prev.then(cur), Promise.resolve(args));
    }
}


const fn = pipe([
    (data) => {
        console.log('data ==> ', data);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve("install 安装完成");
            }, 2000);
        });
    },
    async (data) => {
        console.log('data ==> ', data);
        return "build 打包完成";
    },
    async (data) => {
        console.log('data ==> ', data);
        return "发布完成";
    },
]);

fn(1, 2, 3, 4).then(res => {
    console.log('res ===> ', res);
});