<script setup>
import { ref } from 'vue'


const input = ref('')
const counts = ref(0)
const page = ref(1)
const pageSize = ref(10)
const tableData = ref([
    {
        dishname: '鱼香肉丝',
        image: '/src/assets/image/yxrs.jpg',
        category: '荤菜',
        price: 20,
        status: '在售',
        last: '2023-11-05 '
    },
    {
        dishname: '鱼香肉丝',
        image: '/src/assets/image/yxrs.jpg',
        category: '荤菜',
        price: 20,
        status: '在售',
        last: '2023-11-05 '
    },
    {
        dishname: '鱼香肉丝',
        image: '/src/assets/image/yxrs.jpg',
        category: '荤菜',
        price: 20,
        status: '在售',
        last: '2023-11-05 '
    },
    {
        dishname: '鱼香肉丝',
        image: '/src/assets/image/yxrs.jpg',
        category: '荤菜',
        price: 20,
        status: '在售',
        last: '2023-11-05 '
    },
    {
        dishname: '鱼香肉丝',
        image: '/src/assets/image/yxrs.jpg',
        category: '荤菜',
        price: 20,
        status: '在售',
        last: '2023-11-05 '
    },
])

</script>

<template>
    <div class="dashboard-container" id="food-app">
        <div class="container">
            <div class="tableBar">
                <el-input v-model="input" placeholder="请输入菜品名称" style="width: 250px" clearable
                    @keyup.enter.native="handleQuery">
                    <i slot="prefix" class="el-input__icon el-icon-search" style="cursor: pointer" @click="init"></i>
                </el-input>
                <div class="tableLab">
                    <el-button class="span-btn delBut non" @click="deleteHandle('批量', null)">批量删除</el-button>
                    <el-button class="span-btn blueBug non" @click="statusHandle('1')">批量启售</el-button>
                    <el-button class="span-btn delBut non" @click="statusHandle('0')">批量停售</el-button>
                    <el-button type="primary" @click="addFoodtype('add')">
                        + 新建菜品
                    </el-button>
                </div>
            </div>

            <el-table :data="tableData" stripe class="tableBox" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"></el-table-column>
                <el-table-column prop="dishname" label="菜品名称"></el-table-column>
                <el-table-column label="图片" align="center">
                    <template #default="scope">
                        <img :src="scope.row.image" style="width: 100px;height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="菜品分类"></el-table-column>
                <el-table-column label="售价">
                    <template #default="scope">
                        {{ '￥' + scope.row.price }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="售卖状态">
                </el-table-column>
                <el-table-column prop="last" label="最后操作时间">
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <el-button type="primary" size="small" style="margin-left: 10px;">
                        修改
                    </el-button>
                    <el-button type="danger" size="small">
                        删除
                    </el-button>
                    <el-button type="primary" size="small">
                        起售
                    </el-button>
                    <el-button type="primary" size="small">
                        停售
                    </el-button>
                </el-table-column>
            </el-table>
            <el-pagination class="pageList" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="counts" @size-change="handleSizeChange"
                :current-page.sync="page" @current-change="handleCurrentChange"></el-pagination>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    width: calc(100vw - 200px);
}
</style>