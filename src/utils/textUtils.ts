export const getTextLength = (str: string): number => {
  return str.split('').reduce((len, char) => {
    return len + (/[\u4e00-\u9fa5]/.test(char) ? 2 : 1)
  }, 0)
}

export const truncateText = (text: string, maxLength: number): string => {
  let result = ''
  let len = 0
  for (let char of text) {
    const charLen = /[\u4e00-\u9fa5]/.test(char) ? 2 : 1
    if (len + charLen <= maxLength) {
      result += char
      len += charLen
    } else {
      break
    }
  }
  return result
} 