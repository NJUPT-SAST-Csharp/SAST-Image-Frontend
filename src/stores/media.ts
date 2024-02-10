const media = {
  isPC: isPC(),
  isWidthLargerThan(size: number): boolean {
    return isWidthLargerThan(size)
  }
}

function isPC(): boolean {
  const userAgentInfo = navigator.userAgent
  const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"]
  let flag = true
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

function isWidthLargerThan(size: number): boolean {
  return window.matchMedia(`(min-width: ${size}px)`).matches
}

export default media
