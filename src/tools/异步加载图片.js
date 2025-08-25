
/**
 * 异步加载图片
 * @param {string[]} srcs 需要加载的图片数据
 * @returns 某一张加载成功的src
 */
function loadImages(srcs) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(srcs) || srcs.length <= 0) {
            reject('没有传递任何需要加载的图片数据！');
        }
        function _loadImage(index) {
            const src = srcs[index];
            // 创建 img 对象
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = () => {
                if (index >= srcs.length - 1) {
                    reject('没有一张图片能加载出来！');
                } else {
                    _loadImage(index++);
                }
            }
        }

        _loadImage(0);
    });
}

loadImages([
    'https://www.baidu.com/a.png',
    'https://www.baidu.com/b.png',
    'https://www.baidu.com/c.png',
    'https://www.baidu.com/d.png',
]).then(src => {
    console.log('某一张图片加载成功了', src);
}).catch(() => {
    console.log('全部加载失败！');
});