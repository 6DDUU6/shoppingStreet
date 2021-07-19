<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images='topImages'></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo"
                                @imageLoad='imageLoad'></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
            <detail-comment-info :comment-info='commentInfo'></detail-comment-info>
        </scroll>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'
export default {
   name:'Detail',
   components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo
   },
   data() {
       return {
           iid:null,
           topImages:[],
           goods:{},
           shop:{},
           detailInfo:{},
           paramInfo:{},
           commentInfo:{}
       }
   },
   created() {
    //    1.保存传入的iid
       this.iid = this.$route.params.iid

    //    2.根据iid请求详情页数据
    getDetail(this.iid).then(res => {
        // 2.1获取顶部得图片轮播图信息
        console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages

        // 2.2获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 2.3获取店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        // this.shop = data.shopInfo

        // 2.4获取商品详情数据
        this.detailInfo = data.detailInfo

        // 2.5获取参数得信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    
        // 2.6获取评论信息
        if(data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0]
        }
    })
   },

   methods:{
       imageLoad() {
           this.$refs.scroll.refresh()
       }
   }
};
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    /* .content {
        height: calc(100% - 44px);
    } */

    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 49px;

    }
</style>
