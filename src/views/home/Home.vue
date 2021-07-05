<template>
    <div  id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <swiper>
            <swiper-item v-for="(item, index) in bannars" :key=" index">
                <a :href="item.link">
                    <img :src="item.image" alt="">
                </a>
            </swiper-item>
        </swiper>
    </div>
    
</template>

<script>

import {getHomeMultidata} from 'network/home'
import NavBar from 'components/common/navbar/NavBar.vue';
import {Swiper, SwiperItem} from 'components/common/swiper'


export default {
   name:'Home',
   components:{
        NavBar,
        // getHomeMultidata,
        Swiper,
        SwiperItem,
      
   },
  
    data() {
        return {
            bannars:[],
            recommoends:[]
        }
    },
   created(){
       getHomeMultidata().then(res => {
            // console.log(res);
            this.bannars = res.data.bannar
            this.recommoends = res.data.recommoend
       })
   }
};
</script>

<style scoped>
    .home-nav {
        background-color: var(--color-tint);
        color: #fff;
    }
</style>
