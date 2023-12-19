<script setup>
import { onMounted, ref } from 'vue'
import { getOrderListAPI, updateOrderStatusAPI } from '../api/order'
import { getOrderStatus } from '../constants/OrderStatus'
import { ElMessage } from 'element-plus';

// 分页参数
const pageParam = ref({
    page: 1,
    pageSize: 10,
    total: 0
})

// 查询条件
const queryParam = ref({
    number: '',
    rangeTime: '',
})

// 订单列表
const orderList = ref([])

const dialogVisible = ref(false)

// 表单对象
const form = ref({})

// 查询订单列表
const getOrderList = async () => {
    const { data: res } = await getOrderListAPI(pageParam.value.page, pageParam.value.pageSize)
    orderList.value = res.data
    pageParam.value.total = res.total
}

// 根据条件查询列表
const getOrderByCondition = async () => {
    const { data: res } = await getOrderListAPI(pageParam.value.page, pageParam.value.pageSize, { number: queryParam.value.number, startTime: queryParam.value.rangeTime[0], endTime: queryParam.value.rangeTime[1] })
    orderList.value = res.data
    pageParam.value.total = res.total
}

// 修改订单状态
const changeStatus = async (obj, target) => {
    // 未付款 不进行业务处理
    if (obj.status === 1) {
        return ElMessage({
            type: 'info',
            message: '该订单尚未付款'
        })
    } else if (obj.status === target) {
        // 订单状态相同时不进行更新
        return ElMessage({
            type: 'info',
            message: '该订单状态已最新'
        })
    } else if (obj.status > target) {
        // 订单状态不可返回上一步
        return ElMessage({
            type: 'error',
            message: '不可回退订单状态'
        })
    } else {
        // 更新订单状态
        const { data: res } = await updateOrderStatusAPI(target, obj)
        if (res.code === 200) {
            ElMessage({
                type: 'success',
                message: '修改成功'
            })
            getOrderList()
        } else {
            ElMessage({
                type: 'error',
                message: '修改失败'
            })
        }
    }
}

// 分页大小改变
const handleSizeChange = (val) => {
    pageParam.value.pageSize = val
    getOrderList()
}

// 当前分页改变
const handleCurrentChange = (val) => {
    pageParam.value.page = val
    getOrderList()
}

// 查看详情
const viewDetail = (obj) => {
    form.value = obj
    dialogVisible.value = true
}

// 根据条件查询订单
const queryByCondition = async () => {
    console.log(queryParam.value.rangeTime[0])
    getOrderByCondition()
}

// 重置查询条件
const resetCondition = () => {
    queryParam.value = {
        number: '',
        rangeTime: ''
    }
    getOrderList()
}

onMounted(() => {
    getOrderList()
})
</script>

<template>
    <div class="dashboard-container" id="order-app" v-loading="loading">
        <div class="container">
            <!-- 搜索项 -->
            <div class="tableBar">
                <el-input v-model="queryParam.number" placeholder="请输入订单号" style="width: 250px">
                    <i slot="prefix" class="el-input__icon el-icon-search" style="cursor: pointer" @click="init"></i>
                </el-input>
                <el-date-picker v-model="queryParam.rangeTime" clearable value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期"
                    end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"
                    style="width: 400px; margin-left: 20px;"></el-date-picker>
                <el-button type="primary" class="search-btn" @click="queryByCondition">查询</el-button>
                <el-button type="info" @click="resetCondition">重置</el-button>
            </div>
            <el-table :data="orderList" stripe class="tableBox">
                <el-table-column prop="number" label="订单号" min-width="110"></el-table-column>
                <el-table-column prop="status" label="订单状态">
                    <template #default="{ row }">
                        <span>{{ getOrderStatus(row.status) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="userId" label="用户"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="orderTime" label="下单时间" min-width="100">
                    <template #default="{ row }">
                        <span>{{ $dayjs(row.orderTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="实收金额">
                    <template #default="{ row }">
                        <span>{{ '￥' + row.amount.toFixed(2) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                    <template #default="{ row }">
                        <el-button type="primary" size="small" style="margin-left: 10px;" @click="viewDetail(row)">
                            查看
                        </el-button>
                        <el-button type="warning" size="small" @click="changeStatus(row, 3)">
                            派送
                        </el-button>
                        <el-button type="success" size="small" @click="changeStatus(row, 4)">
                            完成
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination class="pageList" :page-sizes="[10, 20, 30, 40]" :page-size="pageParam.pageSize"
                :current-page.sync="pageParam.page" layout="total, sizes, prev, pager, next, jumper"
                :total="pageParam.total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange"></el-pagination>
        </div>

        <!-- 查看弹框部分 -->
        <el-dialog title="订单信息" v-model="dialogVisible" width="50%" :before-close="handleClose">
            <div class="info-box">
                <div class="item-box">
                    <span class="label">订单号：</span>
                    <span class="des">{{ form.number }}</span>
                </div>
                <div class="item-box">
                    <span class="label">订单状态：</span>
                    <span class="des">{{ getOrderStatus(form.status) }}</span>
                </div>
                <div class="item-box">
                    <span class="label">收货人：</span>
                    <span class="des">{{ form.consignee }}</span>
                </div>
                <div class="item-box">
                    <span class="label">联系电话：</span>
                    <span class="des">{{ form.phone }}</span>
                </div>
                <div class="item-box">
                    <span class="label">地址：</span>
                    <span class="des">{{ form.address }}</span>
                </div>
                <div class="item-box">
                    <span class="label">支付金额：</span>
                    <span class="des">{{ form.amount }}</span>
                </div>
                <div class="item-box">
                    <span class="label">下单时间：</span>
                    <span class="des">{{ $dayjs(form.orderTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                </div>
            </div>
        </el-dialog>
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

.search-btn {
    margin-left: 20px;
}

.tableBar {
    justify-content: flex-start !important;
}

.info-box .item-box {
    display: flex;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    text-align: left;
    margin-bottom: 14px;
}

.info-box .item-box:last-child {
    margin-bottom: 0;
}

.info-box .item-box .label {
    width: 96px;
}

.info-box .item-box .des {
    flex: 1;
    color: #333333;
}

.pageList {
    margin-top: 20px;
    margin-left: 20px;
}
</style>