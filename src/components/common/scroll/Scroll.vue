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
       pullUpLoad:{
           type:Boolean,
           default:false
       }
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
        //    console.log('----');
           this.scroll && this.scroll.refresh()
       },

       finishPullUp() {
           this.scroll && this.scroll.finishPullUp()
       },

       getScrollY() {
           return this.scroll ? this.scroll.y : 0
       }
   },

   mounted() {
       this.scroll = new BScroll(this.$refs.swiper, {
           click:true,
           probeType:this.probeType,
           pullUpLoad:this.pullUpLoad
       })

        if(this.probeType === 2 || this.probeType === 3) {
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll',position)
            })
        }
        

        // 监听scroll滚动到底部
        if(this.pullUpLoad) {
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })
        }

       
   }
};
</script>

<style scoped>

</style>
