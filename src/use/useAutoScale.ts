import {onMounted, onUnmounted} from 'vue'

const debounce = (fn, delay) => {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

/**
 * 大屏自适应
 * @param selector Element 对象
 * @param options 配置项
 */
export default function useAutoScale(selector, options) {
    const el = document.querySelector(selector)

    // 设计稿尺寸
    const {designWidth = 1920, designHeight = 1080} = options

    el.style.transformOrigin = 'top left'
    el.style.transition = 'transform 0.3s'
    el.style.overflow = 'hidden'

    const init = () => {
        // 浏览器视图尺寸
        const currentWidth = document.documentElement.clientWidth
        const currentHeight = document.documentElement.clientHeight

        // 宽高缩放比例
        const scaleX = currentWidth / designWidth
        const scaleY = currentHeight / designHeight

        // 选择最小比例缩放宽高
        const scale = Math.min(scaleX, scaleY)

        // 平移居中
        const translateX = (currentWidth - designWidth * scale) / 2
        const translateY = (currentHeight - designHeight * scale) / 2

        el.style.width = `${designWidth}px`
        el.style.height = `${designHeight}px`

        el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
    }

    init();

    const onResize = debounce(init, 100);

    onMounted(() => {
        window.addEventListener('resize', onResize)
    });

    onUnmounted(() => {
        window.removeEventListener('resize', onResize)
    });
}