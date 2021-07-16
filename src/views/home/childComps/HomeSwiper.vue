<template>
    <swiper>
        <swiper-item v-for="(item, index) in banners" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper';
export default {
   name:'HomeSwiper',
   props:{
       banners: {  //接受父组件传过来的信息
           type:Array,
           default() {
               return []
           }
       }
   },
   data(){
       return {
           isLoad:false
       }
   },
   components: { 
        Swiper,
        SwiperItem 
    },
    methods:{
        imageLoad() {
            if(!this.isLoad) {
                this.$emit('swiperImageLoad')
                this.isLoad = true
            }
        }
    }
};
</script>

<style scoped>

</style>
