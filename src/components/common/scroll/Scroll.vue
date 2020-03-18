<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: { //定义成属性
        type: Boolean,
        default: false
      }
    },
    data() {//保存
      return {
        scroll: null,
        message: "哈哈哈"
      }
    },
    mounted() {
      /*document.querySelector('.wrapper') 不准确明确 不建议使用这个 
        通过 ref 去拿保证准确性
        ref如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象.
        ref如果是绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象
      */ 
     //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true, //因为内涵div
        // probeType: 3, 不能写死 为什么？ 多页面不是每一个页面的模块功能都有，耗费性能
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // this.scroll.scrollTo(0, 0)//返回顶部 没体现封装s..
      
      //2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);     
        this.$emit('scroll', position)   
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    //top
    methods: {//体现封装方法的重要性哈哈
      scrollTo(x, y, time=300) { //time=默认值
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
    
  }
</script>

<style>

</style>