<script setup>
import { ref, onMounted } from 'vue'
import { getCategoryListAPI, deleteCategoryByIdAPI } from '../api/category'
import { ElMessage, ElMessageBox } from 'element-plus'

const action = ref('')

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
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  })
}


const classData = ref({
  title: '添加菜品',
  dialogVisible: false,
  categoryId: '',
  name: '',
  sort: ''
})


// pageSize改变事件
const handleSizeChange = (val) => {
  pageParam.value.pageSize = val
}

// 当前页改变事件
const handleCurrentChange = (val) => {
  pageParam.value.page = val
}

// 对话框关闭事件
const handleClose = () => {
  console.log('dialog is gonna close')
  classData.value.dialogVisible = false
}

onMounted(() => {
  getCategoryList()
})

</script>

<template>
  <div class="dashboard-container" id="category-app">
    <div class="container">
      <div class="tableBar" style="display: inline-block">
        <el-button type="primary" @click="classData.dialogVisible = true">
          + 新增菜品分类
        </el-button>
        <el-button type="primary" @click="classData.dialogVisible = true">
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
            <el-button type="primary" size="small">
            修改
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row.id)">
            删除
          </el-button>  
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pageList" :page-sizes="[10, 15]" :page-size="pageParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="pageParam.total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
    </div>
    <el-dialog :title="classData.title" v-model="classData.dialogVisible" width="30%" @close="handleClose">
      <el-form class="demo-form-inline" label-width="100px">
        <el-form-item label="分类名称：">
          <el-input v-model="classData.name" placeholder="请输入分类名称" maxlength="14" />
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="classData.sort" type="number" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="margin-left: 100px;">
        <el-button size="medium" @click="classData.dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="submitForm">确 定</el-button>
        <el-button v-if="action != 'edit'" type="primary" size="medium" class="continue" @click="submitForm('go')">
          保存并继续添加 </el-button>
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

  .pageList {
    margin-top: 300px;
  }
}
</style>