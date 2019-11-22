// 必须 export 一个 function
// 返回值也必须是一个 webpack config
module.exports = function(webpackConf) {
  function test(rule) {
    if (rule.test.test) { // 正则
      return rule.test.test('.js')
    }
     // 函数
    return rule.test('.js')
  }
  webpackConf.module.rules.forEach(rule => {
    if (test(rule)) {
      const reg = /node_modules\/guji/
      if (rule.include) {
        if (typeof rule.include === 'object') {
          rule.include.unshift(reg)
        } else {
          rule.include = [rule.include, reg]
        }
      } else {
        rule.include = [/^((?!node_modules).)*$/, reg]
      }
    }
  })
  return webpackConf
}
