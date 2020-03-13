<template>
  <div class="tab-bar-item"  @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
<!--    <div :class="{active: isActive}"><slot name="item-text"></slot></div>-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>

<!--    <slot name="item-text"></slot>
插槽默认是会被对应属性覆盖的 所以设置属性在外嵌套div比较好-->


<!--    <img src="../../assets/img/06-tabbar/home.svg"/>-->
<!--    <div>首页</div>-->

</template>

<script>
    export default {
      name: "TabBarItem",
      props: {
        path: String,
        activeColor: {
          type: String,
          default: 'red'
        }
      },
      data() {
        return{
          // isActive: true
        }
      },
      computed: {
        isActive() {
          /*indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
          如果在数组中没找到字符串则返回 -1。
           */
          return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle() {
          return this.isActive ? {color: this.activeColor} : {}
        }
      },
      methods:{
        itemClick() {
          // console.log('itemClick');
          this.$router.replace(this.path)
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {  /* 均等分 背景框*/
    flex: 1;
    text-align: center;
    height: 49px;  /* 通用高度 49px*/
    font-size: 14px;
    font-weight: bold;
  }

  .tab-bar-item img {  /* 设置图片大小 */
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;/*去除图片默认3像素*/
    margin-bottom: 2px; /*增加2像素*/
  }

  /*.active {
    color: red;
  }*/
</style>
