<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getCategoryListAPI, deleteCategoryByIdAPI, addCategoryByTypeAPI, updateCategoryByIdAPI } from '../api/category'
import { ElMessage, ElMessageBox } from 'element-plus'

// 分页条件
const pageParam = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

// 分类列表对象
const categoryList = ref([])

// 查询分类列表
const getCategoryList = async () => {
  const res = await getCategoryListAPI(pageParam.value.page, pageParam.value.pageSize)
  categoryList.value = res.data.data
  pageParam.value.total = res.data.total
}

// 根据id删除分类
const deleteCategoryById = async (id) => {
  const { data: res } = await deleteCategoryByIdAPI(id)
  if(res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getCategoryList()
  }else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

// 删除事件
const handleDelete = (id) => {
  ElMessageBox.confirm('确认要删除吗？', '提示')
  .then(async () => {
    await deleteCategoryById(id)
    await getCategoryList()
  })
  .catch(() => {
    console.log('取消删除')
  })
}

// 修改分类
const updateCategoryById = async () => {
  const { data: res } = await updateCategoryByIdAPI(form.value)
  if(res.code === 200) {
    ElMessage({
      type:'success',
      message: '修改成功'
    })
    editDialogVisible.value = false
  }else {
    ElMessage({
      type: 'error',
      message: '修改失败'
    })
  }
}

// 修改事件
const handleEdit = (obj) => {
  editDialogVisible.value = true

  nextTick(() => {
    form.value = obj
  })
} 

// 修改提交按钮
const confirmEdit = () => {
  editRef.value.validate(async valid => {
    if(valid) {
      await updateCategoryById()
      await getCategoryList()
    }else {
      return false
    }
  })
}


// 表单数据
const form = ref({
  name: '',
  sort: 0
})

// 对话框
const dialogVisible = ref(false)

// 设置动态标题
const title = ref('')

// 设置类型
const type = ref(1)

// formRef
const formRef = ref(null)

// 新增菜品分类按钮
const addCategory = () => {
  title.value = '新增菜品'
  type.value = 1
  form.value = {
    name: '',
    sort: 0
  }
  dialogVisible.value = true
}

// 新增套餐分类按钮
const addCambo = () => {
  title.value = '新增套餐'
  type.value = 2
  form.value = {
    name: '',
    sort: 0
  }
  dialogVisible.value = true
}

// 表单校验规则
const rules = ref({
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' }
  ],
  sort: [
    { required: true, message: '请输入排序', trigger: 'blur' }
  ]
})

// 新增分类方法
const addCategoryByType = async () => {
  const { data: res } = await addCategoryByTypeAPI(type.value, form.value)
  if(res.code === 200) {
    ElMessage({
      type:'success',
      message: '新增成功'
    })
  }else {
    ElMessage({
      type:'error',
      message: '新增失败'
    })
  }
}

// 表单提交
const submitForm = () => {
  formRef.value.validate(valid => {
    if(valid) {
      // 合法
      addCategoryByType()
      // 刷新列表
      getCategoryList()
      dialogVisible.value = false
    }else {
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  formRef.value.resetFields()
  dialogVisible.value = false
}


// pageSize改变事件
const handleSizeChange = (val) => {
  pageParam.value.pageSize = val
  getCategoryList()
}

// 当前页改变事件
const handleCurrentChange = (val) => {
  pageParam.value.page = val
  getCategoryList()
}

// 对话框关闭事件
const handleClose = () => {
  formRef.value.resetFields()
  form.value.dialogVisible = false
}

// 修改对话框
const editDialogVisible = ref(false)

// 修改表单ref
const editRef = ref(null)

// 修改对话框关闭
const cancelEdit = () => {
  editRef.value.resetFields()
  editDialogVisible.value = false
}

const handleEditDialogClose = () => {
  editRef.value.resetFields()
  editDialogVisible.value = false
}

onMounted(() => {
  getCategoryList()
})

</script>

<template>
  <div class="dashboard-container" id="category-app">
    <div class="container">
      <div class="tableBar" style="display: inline-block">
        <el-button type="primary" @click="addCategory">
          + 新增菜品分类
        </el-button>
        <el-button type="primary" @click="addCambo">
          + 新增套餐分类
        </el-button>
      </div>
      <el-table :data="categoryList" stripe class="tableBox">
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="type" label="分类类型">
        </el-table-column>
        <el-table-column prop="updateTime" label="操作时间">
          <template #default="{ row }">
            <span>{{ $dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" />
        <el-table-column label="操作" width="160" align="center">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">
            修改
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row.id)">
            删除
          </el-button>  
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pageList" :page-sizes="[10, 15, 20]" :page-size="pageParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pageParam.total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" style="margin: 20px 0 20px 0;"></el-pagination>
    </div>

    <!-- 添加对话框 -->
    <el-dialog :title="title" v-model="dialogVisible" width="30%" @close="handleClose">
      <el-form class="demo-form-inline" label-width="100px" :model="form" :rules="rules" ref="formRef">
        <el-form-item label="分类名称："> 
          <el-input v-model="form.name" placeholder="请输入分类名称" maxlength="14" />
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="form.sort" type="number" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="margin-left: 160px;">
        <el-button  @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改对话框 -->
    <el-dialog title="修改分类" v-model="editDialogVisible" width="30%" @close="handleEditDialogClose">
      <el-form class="demo-form-inline" label-width="100px" :model="form" ref="editRef">
        <el-form-item label="分类名称："> 
          <el-input v-model="form.name" placeholder="请输入分类名称" maxlength="14" />
        </el-form-item>
        <el-form-item label="分类类型：">
          <el-select v-model="form.type" placeholder="请选择分类" size="default">
            <el-option :label="菜品分类" :value="1">菜品分类</el-option>
            <el-option :label="套餐分类" :value="2">套餐分类</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="form.sort" type="number" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="margin-left: 160px;">
        <el-button  @click="cancelEdit">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
.dashboard-container {
  width: calc(100vw - 200px);
  .tableBar {
    margin-left: 20px;
    margin-top: 20px;
  }
}
</style>