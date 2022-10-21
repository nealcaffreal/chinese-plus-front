/*
  * json字符串解析
  * */
export function jsonParse(jsonString) {
  jsonString = jsonString.replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r')
  return (JSON.parse(jsonString))
}

/*
* 生成GUID
* */
export function generateGuid() {
  const randomData = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (randomData() + randomData() + randomData() + randomData() + randomData() + randomData() + randomData() + randomData())
}

/*
* 字符串按字数换行
* */
export function generateNewLine(str: string, n: number) {
  const len = str.length
  let strTemp = ''

  if (len > n) {
    strTemp = str.substring(0, n)
    str = str.substring(n, len)
    return `${strTemp}\n${generateNewLine(str, n)}`
  }
  return str
}

// Base64 编解码
export function strToBase64(str: string) {
  return window.btoa(unescape(encodeURIComponent(str)))
}
export function base64ToStr(str: string) {
  return window.atob(str)
}

// 获取 dataUrl
export function getDataURL(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
