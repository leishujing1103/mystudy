// 防抖 只执行一次 某一个时间段内节流
export function debounce (func, delay) {
    let timer
    return function(...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
export function findIndex (list, song) {
    return list.findIndex ((item) => {
        return item.id === song.id
    })
}