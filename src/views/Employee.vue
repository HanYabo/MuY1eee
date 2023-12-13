<template>
    <div class="emps">
        <div class="emps_1">
            <el-row>
                <el-col :span="5" :offset="1">
                    <el-input v-model="insertName" @change="getEmployeeList" class="w-50 m-2" placeholder="请输入员工姓名"
                        :prefix-icon="Search" />
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-button round type="primary" @click="findByName(insertName)">搜&nbsp;&nbsp;索</el-button>
                </el-col>
                <el-col :span="4" :offset="9">
                    <el-button round type="primary" @click="handleAdd">添加员工</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="emps_2">
            <el-table :data="empList" border style="width: 100%">
                <el-table-column align="center" label="员工姓名" prop="name" />
                <el-table-column align="center" label="账号" prop="username" />
                <el-table-column align="center" label="手机号码" prop="phone" />
                <el-table-column align="center" label="性别" prop="sex">
                    <template #default="{ row }">
                        <span>{{ Number(row.sex) === 0 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template #default="{ row }">
                        <el-button size="small" @click="handleEdit(row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(row.id)">删除</el-button></template>
                </el-table-column>
            </el-table>
        </div>
        <el-row>
            <el-col>
                <el-pagination background layout="prev, pager, next" :total="pageParam.total"
                    v-model:current-page="pageParam.page" v-model="pageParam.pageSize"
                    @current-change="handleCurrentChange" />
            </el-col>
        </el-row>
    </div>

    <!--添加员工对话框-->
    <el-dialog v-model="centerDialogVisible" :title="title" width="30%" align-center @close="closeDialog">
        <el-form :label-position="right" label-width="90px" :require-asterisk-position="left" :model="form" :rules="rules"
            ref="formRef">
            <el-form-item label="账号:" required prop="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="员工姓名:" required prop="name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="手机号码:" required prop="phone">
                <el-input v-model="form.phone" />
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <div class="mb-2 flex items-center text-sm">
                    <el-radio-group v-model="form.sex" class="ml-4">
                        <el-radio label="0" size="large">男</el-radio>
                        <el-radio label="1" size="large">女</el-radio>
                    </el-radio-group>
                </div>
            </el-form-item>
            <el-form-item style="margin-left: 80px;">
                <el-button type="primary" @click="submitForm">保存</el-button>
                <el-button @click="resetForm">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
  
<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getEmployeeListAPI, getEmployeeByNameAPI, addEmployeeAPI, deleteEmployeeByIdAPI, updateEmployeeByIdAPI } from '../api/employee'

// 分页
const pageParam = ref({
    page: 1,
    pageSize: 10,
    total: 0
})

// 员工列表
const empList = ref([])

// 切页触发事件
const handleCurrentChange = (val) => {
    pageParam.value.page = val
    // 重新刷新列表
    getEmployeeList()
}

// 查询姓名
const insertName = ref('')

// 表单数据
const form = ref({
    name: '',
    username: '',
    phone: '',
    sex: ''
})

// 校验规则
const rules = ref({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入员工姓名', trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' }
    ]
})

const centerDialogVisible = ref(false)

// form表单ref
const formRef = ref(null)

// 接收id
const editId = ref('')

// 表单提交按钮
const submitForm = () => {
    formRef.value.validate(async valid => {
        if (valid) {
            // 合法 进行状态判断
            if (isEdit.value) {
                // 修改状态
                const { data: res } = await updateEmployeeByIdAPI(editId.value, form.value)
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '更新成功'
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: '更新失败'
                    })
                }
            } else {
                // 新增状态
                title.value = '新增员工'
                const { data: res } = await addEmployeeAPI(form.value)
                if (res.code === 200) {
                    ElMessage({
                        type: 'success',
                        message: '新增成功'
                    })
                } else {
                    ElMessage({
                        type: 'error',
                        message: '新增失败'
                    })
                }
            }
        } else {
            // 不合法 拒接表单提交
            return false
        }
        await getEmployeeList()
        centerDialogVisible.value = false
    })
}

// 重置表单
const resetForm = () => {
    formRef.value.resetFields()
    centerDialogVisible.value = false
}

// 根据名字查找员工
const findByName = async (name) => {
    const res = await getEmployeeByNameAPI(name)
    empList.value = res.data.data
}

// 根据id删除员工
const deleteEmployeeById = async (id) => {
    const { data: res } = await deleteEmployeeByIdAPI(id)
    if (res.code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
}

// 编辑状态
const isEdit = ref(false)

// 设置动态标题
const title = ref('')

// 新增员工
const handleAdd = () => {
    title.value = '新增员工'
    isEdit.value = false
    editId.value = ''
    centerDialogVisible.value = true
}

// 编辑事件
const handleEdit = (obj) => {
    isEdit.value = true
    editId.value = obj.id
    title.value = '修改员工'


    centerDialogVisible.value = true

    nextTick(() => {
        form.value = {...obj}
    })
}

// 删除事件
const handleDelete = (id) => {
    ElMessageBox.confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(async () => {
        // 删除员工
        await deleteEmployeeById(id)
        // 重新更新列表
        await getEmployeeList()
    })
}

// 关闭对话框
const closeDialog = () => {
    formRef.value.resetFields()
}


// 获取员工列表
const getEmployeeList = async () => {
    const res = await getEmployeeListAPI(pageParam.value.page, pageParam.value.pageSize)
    empList.value = res.data.data
    pageParam.value.total = res.data.total
}

// 挂载完毕
onMounted(() => {
    getEmployeeList()
})
</script>

<style scoped>
.emps {
    width: calc(100vw - 200px);
}

.emps_1 {
    width: 100%;
    height: 80px;
}

.emps_2 {
    width: 100%;
    height: 500px;

}

.el-row {
    margin-top: 22px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>