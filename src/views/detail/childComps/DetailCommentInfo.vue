<template>
    <div v-if="Object.keys(commentInfo).length !== 0" class="coment-info"> 
        <div class="info-header">
            <div class="header-title">用户评价</div>
            <div class="header-more">
                更多
                <i class="arrow-right"></i>
            </div>
        </div>
        <div class="info-user">
            <img :src="commentInfo.user.avatar" alt="">
            <span>{{commentInfo.user.uname}}</span>
        </div>
        <div class="info-detail">
            <p>{{commentInfo.content}}</p>
            <div class="info-other">
                <span class="data">{{commentInfo.created | showDate}}</span>
                <span>{{commentInfo.style}}</span>
            </div>
            <div class="info-imgs">
                <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from 'common/utils/Utils'
export default {
   name:'DetailCommentInfo',
   props:{
       commentInfo:{
           type:Object,
           default() {
               return {}
           }
       }
   },
   filters:{
       showDate:function(value) {
        //    1.将时间戳转换为Date对象
           const data = new Date(value * 1000)

        //    2.将data进行格式化
        return formatData(data, 'yyyy-MM-dd hh:mm:ss')
       }
   }
};
</script>

<style scoped>
    .info-header{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
    }

    .header-title{
        float: left;
        font-size: 15px;
    }

    .header-more {
        float: right;
        margin-right: 10px;
        font-size: 13px;
    }

    .info-user {
        padding: 10px 0 5px 10px;
    }

    .info-user img{
        width: 42px;
        height: 42px;
        border-radius: 50%;
        /* padding-left: 15px; */
    }

    .info-user span {
        margin-left: 15px;
        font-size: 15px;
        position: relative;
        top: -15px;
    }

    .info-detail {
        padding: 0px 5px 10px;
    }

    .info-detail p{
        color: #777;
        font-size: 14px;
        line-height: 1.5;
    }

    .info-detail .info-other {
        font-size: 12px;
        color: #999;
        /* margin-top: 10px; */
    }

    .info-other .date {
        margin-right: 8px;
    }

    .info-imgs {
        margin-top: 10px;
    }

    .info-imgs img {
        width: 70px;
        height: 70px;
        margin-right: 5px;
    }
</style>
