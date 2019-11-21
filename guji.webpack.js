// 必须 export 一个 function
// 返回值也必须是一个 webpack config
module.exports = function(webpackConf) {
  webpackConf.module.rules.forEach(rule => {
    if (rule.test.test('.js')) {
      const reg = /node_modules\/guji/
      if (rule.include) {
        if (typeof rule.include === 'object') {
          rule.include.push(reg)
        } else {
          rule.include = [rule.include, reg]
        }
      } else {
        rule.include = [reg]
      }
    }
  })
  return webpackConf
}
