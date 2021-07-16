<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'

import {getDetail} from 'network/detail'
export default {
   name:'Detail',
   components:{
       DetailNavBar,
       DetailSwiper
   },
   data() {
       return {
           iid:null,
           topImages:[]
       }
   },
   created() {
    //    1.保存传入的iid
       this.iid = this.$route.params.iid

    //    2.根据iid请求详情页数据
    getDetail(this.iid).then(res => {
        console.log(res);
        this.topImages = res.result.itemInfo.topImages
    })
   }
};
</script>

<style scoped>

</style>
