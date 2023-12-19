import  { defineStore } from 'pinia'
import { reactive } from 'vue'
import { getAllCategoryListAPI } from '../api/category'

export const useCategoryStore = defineStore('category', () => {
    // 定义一个category列表
    const categoryList = reactive([])

    // 获取分类列表（全查询）
    const getCategoryList = async () => {
        const { data: res } = await getAllCategoryListAPI()
        categoryList.value = res.data
    }

    // 根据id返回分类名称
    const getCategoryNameById = (id) => {
        // 根据id返回分类名称
        const category = categoryList.value.find(item => item.id === id)
        return category ? category.name : ''
    }

    return {
        categoryList,
        getCategoryList,
        getCategoryNameById
    }
})