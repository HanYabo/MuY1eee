<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

// route
const route = useRoute()

// router
const router = useRouter()

</script>

<template>
    <div class="container">
        <div class="left-menu">
            <el-menu default-active="" class="el-menu-vertical-demo" router="true">
                <el-menu-item index="1" route="welcome">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>欢迎</span>
                </el-menu-item>
                <el-menu-item index="2" route="emp">
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>员工管理</span>
                </el-menu-item>
                <el-menu-item index="3" route="category">
                    <el-icon>
                        <Menu />
                    </el-icon>
                    <span>分类管理</span>
                </el-menu-item>
                <el-menu-item index="4" route="dish">
                    <el-icon>
                        <Dish />
                    </el-icon>
                    <span>菜品管理</span>
                </el-menu-item>
                <el-menu-item index="5" route="combo">
                    <el-icon>
                        <Bowl />
                    </el-icon>
                    <span>套餐管理</span>
                </el-menu-item>
                <el-menu-item index="6" route="order">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>订单明细</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 199px;
    height: 100%;
    border-right: 1px solid rgb(220, 223, 230);
}
.left-menu {
    height: 838px;
    width: 200px;
    line-height: 60px;
    text-align: center;
}
</style>