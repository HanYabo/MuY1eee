<script setup>
import { ref } from 'vue'
const tableData = ref([
    {
        number: '100020231001',
        status: '已完成',
        user: 'zhangsan',
        phone: '100000000',
        address: '北京市海淀区',
        date: '2023-11-05 00:00',
        pay: '￥39.0'
    },
    {
        number: '100020231001',
        status: '已完成',
        user: 'zhangsan',
        phone: '100000000',
        address: '北京市海淀区',
        date: '2023-11-05 00:00',
        pay: '￥39.0'
    },
    {
        number: '100020231001',
        status: '已完成',
        user: 'zhangsan',
        phone: '100000000',
        address: '北京市海淀区',
        date: '2023-11-05 00:00',
        pay: '￥39.0'
    },
    {
        number: '100020231001',
        status: '已完成',
        user: 'zhangsan',
        phone: '100000000',
        address: '北京市海淀区',
        date: '2023-11-05 00:00',
        pay: '￥39.0'
    },
    {
        number: '100020231001',
        status: '已完成',
        user: 'zhangsan',
        phone: '100000000',
        address: '北京市海淀区',
        date: '2023-11-05 00:00',
        pay: '￥39.0'
    },
    {
        number: '100020231001',
        status: '已完成',
        user: 'zhangsan',
        phone: '100000000',
        address: '北京市海淀区',
        date: '2023-11-05 00:00',
        pay: '￥39.0'
    }
])
</script>

<template>
    <div class="dashboard-container" id="order-app" v-loading="loading">
        <div class="container">
            <!-- 搜索项 -->
            <div class="tableBar">
                <el-input v-model="input" placeholder="请输入订单号" style="width: 250px">
                    <i slot="prefix" class="el-input__icon el-icon-search" style="cursor: pointer" @click="init"></i>
                </el-input>
                <el-date-picker v-model="orderTime" clearable value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange"
                    placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']" style="width: 400px;margin-left: 20px;"></el-date-picker>
                <el-button type="primary" class="search-btn" @click="init">查询</el-button>
            </div>
            <el-table :data="tableData" stripe class="tableBox">
                <el-table-column prop="number" label="订单号" min-width="110"></el-table-column>
                <el-table-column prop="status" label="订单状态">
                </el-table-column>
                <el-table-column prop="user" label="用户"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
                <el-table-column prop="date" label="下单时间" min-width="100"></el-table-column>
                <el-table-column prop="pay" label="实收金额">
                </el-table-column>
                <el-table-column label="操作">
                    <el-button type="primary">
                        查看
                    </el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="success">
                        派送
                    </el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="primary">
                        完成
                    </el-button>
                </el-table-column>
            </el-table>
            <el-pagination class="pageList" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :current-page.sync="page"
                layout="total, sizes, prev, pager, next, jumper" :total="counts" @size-change="handleSizeChange"
                @current-change="handleCurrentChange"></el-pagination>
        </div>

        <!-- 查看弹框部分 -->
        <el-dialog title="订单信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div class="info-box">
                <div class="item-box">
                    <span class="label">订单号：</span>
                    <span class="des">{{ diaForm.number }}</span>
                </div>
                <div class="item-box">
                    <span class="label">订单状态：</span>
                    <span class="des">{{ getOrderType(diaForm) }}</span>
                </div>
                <div class="item-box">
                    <span class="label">收货人：</span>
                    <span class="des">{{ diaForm.consignee }}</span>
                </div>
                <div class="item-box">
                    <span class="label">联系电话：</span>
                    <span class="des">{{ diaForm.phone }}</span>
                </div>
                <div class="item-box">
                    <span class="label">地址：</span>
                    <span class="des">{{ diaForm.address }}</span>
                </div>
                <div class="item-box">
                    <span class="label">支付金额：</span>
                    <span class="des">{{ diaForm.amount }}</span>
                </div>
                <div class="item-box">
                    <span class="label">下单时间：</span>
                    <span class="des">{{ diaForm.orderTime }}</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped>
.dashboard-container {
    width: calc(100vw - 200px);
}

.search-btn {
    margin-left: 20px;
}

.tableBar {
    justify-content: flex-start !important;
}

.info-box {
    margin: -15px -44px 20px;
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
</style>