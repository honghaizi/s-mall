<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    
    <scroll class="content" ref="scroll" 
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"><!-- 滚动 -->
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control class="tab-control" 
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick" />
      <good-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

   import NavBar from 'components/common/navbar/NavBar'
   import TabControl from 'components/content/tabControl/TabControl'
   import GoodList from 'components/content/goods/GoodsList'
   import Scroll from 'components/common/scroll/Scroll'
   import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home'


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodList,
      Scroll,
      BackTop
    },
    data() {
      return {
        // result: null  Test
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',  //设置默认值
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() { //创建时请求数据
      //1.请求多个数据
      this.getHomeMultidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 事件监听方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }     
      },
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0, 0, 300) 没封装思想哈哈
        this.$refs.scroll.scrollTo(0, 0, 1000) 
      },
      contentScroll(position) {
        // console.log(position);
        this.isShowBackTop = (-position.y) >= 1000
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        //加载BUG解决-bScroll 默认的加载与异步加载冲突
        // this.$refs.scroll.scroll.refresh()
      },
      /* 网络请求相关方法 */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res;//获取信息 Test
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        // getHomeGoods('pop', 1).then(res => { 
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control { 
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  /*.content {
    overflow: hidden;

    /* height: 300px; 

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }*/
  
  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } 
</style>
