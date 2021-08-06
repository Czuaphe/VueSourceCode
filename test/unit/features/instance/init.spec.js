import Vue from 'vue'

describe('Initialization', () => {
  // it('without new', () => {
  //   try { Vue() } catch (e) {}
  //   expect('Vue is a constructor and should be called with the `new` keyword').toHaveBeenWarned()
  // })

  it('with new', () => {
    // console.log('Vue.options :>> ', JSON.stringify(Vue.options))
    // console.log('Vue.options :>> ', Vue.options)
    const vue = new Vue({
      data: () => {
        return {
          url: 'https://www.github.com',
          title: 'Vue源码解析',
          img: 'https://pic1.zhimg.com/092406f3919e915fffc7ef2f2410e560_is.jpg'
        }
      },
      // eslint-disable-next-line no-multi-str
      template: '<div id="app">\
        这里是文本<箭头之后的文本\
        <a :href="url" target="_blank" >前面的文本{{title}}后面的文本</a>\
        <img :src="img" />\
      </div>'
    })
    vue.$mount()
    expect(vue instanceof Vue).toBe(true)
  })
})
