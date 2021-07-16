<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行', '新款', '精选']" 
            ref="tabControl"
            @tabClick='tabClick'
            class="tab-control"
            v-show="isTabFixed"></tab-control>
        <scroll class="content" 
                ref="scroll" 
                :probe-type='3' 
                @scroll="contentScroll" 
                :pull-up-load='true' @pullingUp='loadMore'>
            <home-swiper :banners = 'banners'
                        @swiperImageLoad='swiperImageLoad'></home-swiper>  <!--传父组件的值出去-->
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view/>
            <tab-control :titles="['流行', '新款', '精选']" 
            ref="tabControl"
            @tabClick='tabClick'></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native='backClick' v-show="isShowBack"></back-top>
        
    </div> 
    
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'  //导入子组件
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils/Utils'

export default {
   name:'Home',
   components:{
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
   },
  
    data() {
       return {
            banners:[],
            recommends:[],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []},
            },
            currentType:'pop',
            isShowBack:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },

    // destroyed() {
    //     console.log('home destroyed');
    // },
    activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        // console.log(this.saveY);
    },

   created(){
       this.getHomeMultidata()

    //    请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')    
        
        
   },

   mounted() {
       // 监听Item中图片加载完成

       const refresh = debounce(this.$refs.scroll.refresh) 
        this.$bus.$on('itemImageLoad', () => { 
            refresh()
        })
        
   },

   methods: {  
    //    事件监听的相关方法
    tabClick(index) {
        switch(index) {
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

    //    网络请求的相关方法
       getHomeMultidata() {
           getHomeMultidata().then(res => {
                // console.log(res);
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list
            })
       },

        // getHomeGoods(type) {
        //     const page = this.goods[type].page + 1
        //     getHomeGoods(type, page).then(res => {
        //         const newList = res.data.list
        //         this.goods[type].list.push(...newList)
        //         this.goods[type].page += 1
        //     })
        // }

        getHomeGoods(type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1

                // 完成更多加载
                this.$refs.scroll.finishPullUp()
            })
        },

        backClick() {
           this.$refs.scroll.scrollTo(0, 0)
        },

        contentScroll(position) {
            // console.log(position); 判断BackTop是否显示
            this.isShowBack = -(position.y) > 1000

            // 2决定tabControl是否吸顶(position:fixed)
            this.isTabFixed = (-position.y) > this.tabOffsetTop
        },

        loadMore() {
            this.getHomeGoods(this.currentType)
        },

        swiperImageLoad() {
            // 获取tabControl的offsetTop
            this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
        }

   }


};
</script>

<style scoped>
/* scope作用域   */
    #home {
        padding-top: 44px;
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


    /* .content {
        height: calc(100% - 93px);
        overflow: hidden;
        margin-top: 44px;
    } */

    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
        /* background-color: white; */
    }

    .tab-control {
        position: relative;
        z-index: 9;
    }
</style>
