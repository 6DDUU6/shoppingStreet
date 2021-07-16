<template>
    <div id="">

    </div>
</template>

<script>
import {Swiper,SwiperItem} from 'componnets/common/swiper'
export default {
   name:'DetailSwiper',
   props:{
       topImages:{
           type:Array,
           default() {
               return []
           }
       }
   }
};
</script>

<style scoped>

</style>
