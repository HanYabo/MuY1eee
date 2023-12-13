<script setup>
import { ref, reactive } from 'vue'
const action = ref('')
const counts = ref(0)
const page = ref(1)
const pageSize = ref(10)
const tableData = ref([
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  },
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  },
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  },
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  },
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  },
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  },
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  },
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  },
  {
    name: '经济实惠',
    type: '午饭',
    last: '2023-11-05 00:00',
    sort: '1',
  }
])
const classData = reactive({
  title: '添加菜品',
  dialogVisible: false,
  categoryId: '',
  name: '',
  sort: ''
})

</script>

<template>
  <div class="dashboard-container" id="category-app">
    <div class="container">
      <div class="tableBar" style="display: inline-block">
        <el-button type="primary">
          + 新增菜品分类
        </el-button>
        <el-button type="primary">
          + 新增套餐分类
        </el-button>
      </div>
      <el-table :data="tableData" stripe class="tableBox">
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="type" label="分类类型">
        </el-table-column>
        <el-table-column prop="last" label="操作时间">
        </el-table-column>
        <el-table-column prop="sort" label="排序" />
        <el-table-column label="操作" width="160" align="center">
          <el-button type="primary" size="small">
            修改
          </el-button>
          <el-button type="danger" size="small">
            删除
          </el-button>
        </el-table-column>
      </el-table>
      <el-pagination class="pageList" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="counts" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"></el-pagination>
    </div>
    <el-dialog :title="classData.title" :visible.sync="classData.dialogVisible" width="30%" :before-close="handleClose">
      <el-form class="demo-form-inline" label-width="100px">
        <el-form-item label="分类名称：">
          <el-input v-model="classData.name" placeholder="请输入分类名称" maxlength="14" />
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="classData.sort" type="number" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="classData.dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="medium" @click="submitForm()">确 定</el-button>
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
}
</style>