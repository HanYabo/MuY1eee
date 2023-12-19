<script setup>
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

// router
const router = useRouter()

</script>

<template>
    <div class="container">
        <div class="left-menu">
            <el-menu :default-active="router.currentRoute.value.path" class="el-menu-vertical-demo" router>
                <el-menu-item index="/welcome">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>系统首页</span>
                </el-menu-item>
                <el-menu-item index="/emp">
                    <el-icon>
                        <Avatar />
                    </el-icon>
                    <span>员工管理</span>
                </el-menu-item>
                <el-menu-item index="/category">
                    <el-icon>
                        <Menu />
                    </el-icon>
                    <span>分类管理</span>
                </el-menu-item>
                <el-menu-item index="/dish">
                    <el-icon>
                        <Dish />
                    </el-icon>
                    <span>菜品管理</span>
                </el-menu-item>
                <el-menu-item index="/combo">
                    <el-icon>
                        <Bowl />
                    </el-icon>
                    <span>套餐管理</span>
                </el-menu-item>
                <el-menu-item index="/order">
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