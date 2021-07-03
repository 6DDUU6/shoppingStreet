<template>
    <div>
        <slot name="item-icon"></slot>
        <slot name="item-text"></slot>
    </div>
</template>

<script>
export default {
   name:'TabBarItem'
};
</script>

<style scoped>
     .tab-bar-item {
        flex-grow: 1;
        text-align: center;
    }
</style>
