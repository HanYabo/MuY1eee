<script setup>
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { checkUserAPI } from '../api/login'

const router = useRouter()
const ruleFormRef = ref(null)

const ruleForm = ref({
    username: '',
    password: ''
})

// 校验规则
const rules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
})

const submitForm = () => {
    if (!ruleFormRef.value) return;
    ruleFormRef.value.validate(async (valid) => {
        if (valid) {
            // 校验通过 放行
            // TODO 调用接口 校验账号密码是否正确
            const { data: res } = await checkUserAPI(ruleForm.value)
            if (res.code === 200) {
                // 登录成功
                ElMessage({
                    message: '登录成功！',
                    type: 'success'
                })
                // 跳转到主页
                router.push('/home')
            } else {
                ElMessage({
                    type: 'error',
                    message: res.message
                })
            }
        } else {
            return false;
        }
    })
}
</script>

<template>
    <div class="container">
        <div class="box">
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="账号:" required prop="username">
                    <el-col :span="17">
                        <el-input v-model="ruleForm.username" />
                    </el-col>
                </el-form-item>
                <el-form-item label="密码:" required prop="password">
                    <el-col :span="17">
                        <el-input type="password" v-model="ruleForm.password" />
                    </el-col>
                </el-form-item>
                <div class="btn">
                    <el-button type="primary" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    /* 主轴对齐方式 */
    /* 主轴给宽度 */
    justify-content: center;
    /* 侧轴对齐方式 */
    align-items: center;
    background-image: url('../assets/image/login_bg.jpg');
    background-size: cover;
}

.box {
    width: 400px;
    height: 300px;
    border-radius: 30px 0px 30px 0px;
    border: 1px solid white;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}

.btn {
    display: flex;
    margin-top: 30px;
    justify-content: center;
}
</style>