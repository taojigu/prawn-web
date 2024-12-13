
/**
 * 获取本地缓存
 * @param {*} 缓存key 
 */
export function getLocalItem(key){
    return localStorage.getItem(key)
}

/**
 * 保存本地缓存
 * @param {*} key 缓存key 
 * @param {*} value  缓存value
 */
export function setLocalItem(key,value){
    localStorage.setItem(key, value)
}