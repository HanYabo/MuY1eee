<template>
    <div class="app">
        <Header></Header>
        <Aside></Aside>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
import Header from './Header.vue'
import Aside from './Aside.vue'
</script>
<style scoped>
.app {
    position: relative;
    overflow-x: hidden;
}
.content {
    position: absolute;
    top: 60px;
    left: 200px;
}
</style>