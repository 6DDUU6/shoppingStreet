<template>
    <div class="wrapper" ref="swiper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
   name:'Scroll',
   props:{
       probeType:{
           type:Number,
           default:0
       },
   },
   data() {
       return {
           scroll:null
       }
   },

   methods:{
       scrollTo(x, y, time = 1000) {
           this.scroll && this.scroll.scrollTo(x, y, time)
       },

       refresh() {
           console.log('----');
           this.scroll && this.scroll.refresh()
       }
   },

   mounted() {
       this.scroll = new BScroll(this.$refs.swiper, {
           click:true,
           probeType:this.probeType,
           pullUpLoad:this.pullUpLoad
       })

       console.log(this.scroll);
        this.scroll.on('scroll', (position) => {
            this.$emit('scroll',position)
        })

       
   }
};
</script>

<style scoped>

</style>
