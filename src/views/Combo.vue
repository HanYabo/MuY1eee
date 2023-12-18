<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
const input = ref('')
const counts = ref(0)
const page = ref(1)
const pageSize = ref(10)
const tableData = ref([
    {
        name: '肯德基全家桶',
        image: '/src/assets/image/kfc.webp',
        category: '无',
        price: 49.9,
        status: '在售',
        last: '2023-11-05-00:00'
    },
    {
        name: '肯德基全家桶',
        image: '/src/assets/image/kfc.webp',
        category: '无',
        price: 49.9,
        status: '在售',
        last: '2023-11-05-00:00'
    },
    {
        name: '肯德基全家桶',
        image: '/src/assets/image/kfc.webp',
        category: '无',
        price: 49.9,
        status: '在售',
        last: '2023-11-05-00:00'
    },
    {
        name: '肯德基全家桶',
        image: '/src/assets/image/kfc.webp',
        category: '无',
        price: 49.9,
        status: '在售',
        last: '2023-11-05-00:00'
    },{
        name: '肯德基全家桶',
        image: '/src/assets/image/kfc.webp',
        category: '无',
        price: 49.9,
        status: '在售',
        last: '2023-11-05-00:00'
    }
])

const checkList = ref([])

</script>

<template>
    <div class="dashboard-container" id="combo-app">
        <div class="container">
            <div class="tableBar">
                <el-input v-model="input" placeholder="请输入套餐名称" style="width: 250px" clearable
                    @keyup.enter.native="handleQuery">
                    <i slot="prefix" class="el-input__icon el-icon-search" style="cursor: pointer" @click="init"></i>
                </el-input>
                <div class="tableLab">
                    <el-button class="span-btn delBut non" @click="deleteHandle('批量')">批量删除</el-button>
                    <el-button class="span-btn blueBug non" @click="statusHandle('1')">批量启售</el-button>
                    <el-button class="span-btn delBut non" @click="statusHandle('0')">批量停售</el-button>
                    <el-button type="primary" @click="addSetMeal('add')">
                        + 新建套餐
                    </el-button>
                </div>
            </div>
            <el-table :data="tableData" stripe class="tableBox" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"></el-table-column>
                <el-table-column prop="name" label="套餐名称"></el-table-column>
                <el-table-column label="图片" align="center">
                    <template #default="scope">
                        <img :src="scope.row.image" style="width: 100px; height: 100px;" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="categoryName" label="套餐分类"></el-table-column>
                <el-table-column prop="price" label="套餐价">
                    <template #default="scope">
                        {{ '￥' + scope.row.price }}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="售卖状态">
                </el-table-column>
                <el-table-column prop="last" label="最后操作时间">
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                        <el-button type="primary" size="small" style="margin-left: 10px;">
                            修改
                        </el-button>
                        <el-button type="danger" size="small">
                            删除
                        </el-button>
                        <el-button type="success" size="small">
                            起售
                        </el-button>
                        <el-button type="info" size="small">
                            停售
                        </el-button>
                </el-table-column>
            </el-table>
            <el-pagination class="pageList" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="counts" @size-change="handleSizeChange"
                :current-page.sync="page" @current-change="handleCurrentChange" style="margin: 20px 0 20px 0;"></el-pagination>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    width: calc(100vw - 200px);
}

.tableBar {
    margin-top: 20px;
    margin-left: 20px;
}
</style>
