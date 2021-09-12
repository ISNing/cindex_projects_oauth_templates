const utils = {
    GetQueryString: function (name) {
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        const r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2]); return null
    },
    isKeyExists: function (path, object) {
        // 将传入的对象路径字符串拆分为数组
        const pathList = path.split('.')
        let obj = null
        // 从全局对象中取出名字为 数组[0]的对象
        const globalObj = globalThis[pathList.shift()]
        // 如果指定了对象，就从对象中查找，如果没有就使用全局环境
        obj = object || globalObj

        if (!obj) {
            return false
        }

        for (let i = 0; i < pathList.length; i++) {
            const key = pathList[i]
            if (!obj[key]) {
                return false
            }
            obj = obj[key]
        }

        return true
    }
}

export default utils
