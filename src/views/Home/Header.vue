<script setup>

</script>

<template>
    <div class="container">
        <div class="logo"></div>
        <div class="title">饿了么点餐系统</div>
    </div>
</template>

<style scoped>
.container {
    height: 60px;
    width: 100vw;
    display: flex;
}
.logo {
    height: 60px;
    width: 200px;
    background-image: url('../../assets/icon/logo.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    line-height: 60px;
}
.title {
    height: 60px;
    background-color: #02b6fd;
    width: calc(100vw - 200px);
    text-align: center;
    line-height: 60px;
    color: white;
}
</style>