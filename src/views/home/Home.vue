<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        
           <home-swiper :banners = 'banners'></home-swiper>  <!--传父组件的值出去-->
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view/>
            <tab-control :titles="['流行', '新款', '精选']" 
            class="tab-control" 
            @tabClick='tabClick'></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        
    </div> 
    
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'  //导入子组件
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'


import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
   name:'Home',
   components:{
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
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
            currentType:'pop'
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },

   created(){
       this.getHomeMultidata()

    //    请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')     
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
            })
        },

        backClick() {
            // this.$refs.scroll.scroll.scrollTo(0,0)
            // console.log('回到顶部');
            console.log(this.$refs.scroll.messages);
            // this.$refs.scroll.scroll.scrollTo(0,0)
            this.$refs.scroll.scrollTo(0,0)
        }
   }


};
</script>

<style scoped>
/* scope作用域   */
    #home {
        padding-top: 44px;
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
        top:43px;
        z-index: 9;
    }

    
</style>
