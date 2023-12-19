<script setup>
import { ref, onMounted } from 'vue'
import { getDishListAPI, deleteDishByIdAPI, changeStatusAPI } from '../api/dish'
import { getSaleStatus } from '../constants/SaleStatus'
import { ElMessage } from 'element-plus'
import { useCategoryStore } from '../store/category'

// store引入
const categoryStore = useCategoryStore()

const input = ref('')

// 分页条件
const pageParam = ref({
    page: 1,
    pageSize: 10,
    total: 0
})

// 菜品列表
const dishList = ref([])

// 控制对话框
const dialogFormVisible = ref(false)

// form表单对象
const form = ref({

})

// formRef
const formRef = ref(null)

// 获取菜品列表
const getDishList = async () => {
    const { data: res } = await getDishListAPI(pageParam.value.page, pageParam.value.pageSize)
    dishList.value = res.data
    pageParam.value.total = res.total
}

// 分页大小改变事件
const handleSizeChange = (val) => {
    pageParam.value.pageSize = val
    getDishList()
}

// 分页切换事件
const handleCurrentChange = (val) => {
    pageParam.value.page = val
    getDishList()
}

// 删除事件
const handleDelete = async (id) => {
    const { data: res } = await deleteDishByIdAPI(id)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getDishList()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

// 修改事件
const handleUpdate = (obj) => {
    dialogFormVisible.value = true
    form.value = obj
}

// 对话框关闭事件
const handleClose = () => {
    formRef.value.resetFields()
    dialogFormVisible.value = false
}

// 起售 停售切换
const changeStatus = async (status, obj) => {
    // 状态相同不进行更改
    if(status === obj.status) {
        ElMessage({
            type: 'info',
            message: `当前已处于${getSaleStatus(status)}状态`
        })
    }else {
        // 更改
        const { data: res } = await changeStatusAPI(status, obj)
        console.log(res)
        if(res.code === 200) {
            ElMessage({
                type: 'success',
                message: '修改成功'
            })
            getDishList()
        }else {
            ElMessage({
                type: 'error',
                message: '修改失败'
            })
        }
    }
}

// 确认按钮
const handleConfirm = () => {
    console.log(form.value)
    dialogFormVisible.value = false
}

// 取消按钮
const handleCancel = () => {
    formRef.value.resetFields()
    dialogFormVisible.value = false
}

onMounted(() => {
    getDishList()
    categoryStore.getCategoryList()
})

</script>

<template>
    <div class="dashboard-container" id="food-app">
        <div class="container">
            <div class="tableBar">
                <el-input v-model="input" placeholder="请输入菜品名称" style="width: 250px" clearable>
                    <i slot="prefix" class="el-input__icon el-icon-search" style="cursor: pointer" @click="init"></i>
                </el-input>
                <div class="tableLab">
                    <el-button class="span-btn delBut non" @click="deleteHandle('批量', null)">批量删除</el-button>
                    <el-button class="span-btn blueBug non" @click="statusHandle('1')">批量起售</el-button>
                    <el-button class="span-btn delBut non" @click="statusHandle('0')">批量停售</el-button>
                    <el-button type="primary" @click="dialogFormVisible = true">
                        + 新增菜品
                    </el-button>
                </div>
            </div>

            <el-table :data="dishList" stripe class="tableBox" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="25"></el-table-column>
                <el-table-column prop="name" label="菜品名称"></el-table-column>
                <el-table-column label="图片" align="center" prop="image">
                    <template #default="{ row }">
                        <img :src="row.image" style="width: 100px;height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column prop="categoryId" label="菜品分类">
                    <template #default="{ row }">
                        <span>{{ categoryStore.getCategoryNameById(row.categoryId) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="售价" prop="price">
                    <template #default="{ row }">
                        {{ '￥' + row.price }}
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="菜品描述" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="售卖状态">
                    <template #default="{ row }">
                        <span>{{ getSaleStatus(row.status) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="updateTime" label="最后操作时间">
                    <template #default="{ row }">
                        <span>{{ $dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" style="margin-left: 10px;" @click="handleUpdate(row)">
                            修改
                        </el-button>
                        <el-button type="danger" size="small" @click="handleDelete(row.id)">
                            删除
                        </el-button>
                        <el-button type="success" size="small" @click="changeStatus(1, row)">
                            起售
                        </el-button>
                        <el-button type="info" size="small" @click="changeStatus(0, row)">
                            停售
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination class="pageList" :page-sizes="[10, 20, 30, 40]" :page-size="pageParam.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="pageParam.total" @size-change="handleSizeChange"
                :current-page.sync="pageParam.page" @current-change="handleCurrentChange"
                style="margin: 20px 0 20px 0;"></el-pagination>

            <!-- 新增菜品对话框 -->
            <el-dialog v-model="dialogFormVisible" title="新增菜品" width="80%" @close="handleClose">
                <el-form :model="form" ref="formRef">
                    <el-form-item label="菜品名称" label-width="200px">
                        <el-input v-model="form.name" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="菜品分类" label-width="200px">
                        <el-select v-model="form.categoryId" placeholder="请选择菜品分类" style="width: 100%">
                            <el-option v-for="item in categoryStore.categoryList.value" :label="item.name" :value="item.id" :key="item.id"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜品价格" label-width="200px">
                        <el-input v-model="form.price" />
                    </el-form-item>
                    <el-form-item label="菜品图片" label-width="200px">
                        <!-- TODO 上传图片功能 -->

                    </el-form-item>
                    <el-form-item label="菜品描述" label-width="200px">
                        <el-input type="textarea" v-model="form.description" placeholder="请输入菜品描述" />
                    </el-form-item>
                    <el-form-item label="菜品排序" label-width="200px">
                        <el-input-number v-model="form.sort" :min="0" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="handleCancel">取消</el-button>
                        <el-button type="primary" @click="handleConfirm">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>

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