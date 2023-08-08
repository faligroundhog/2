<template>
    <div class="common-layout">
        <el-container>
            <!-- 左侧区域 -->
            <siderBar></siderBar>
            <!-- 右侧区域 -->
            <el-container style="flex-direction: column;">
                <!-- 头部区域 -->
                <navBar></navBar>
                <!-- 路由导航标签区域 -->
                <tagsView></tagsView>
                <!-- 右侧内容区域 -->
                <appMain></appMain>
            </el-container>
        </el-container>
    </div>
</template>

<script>

// 引入布局子组件
import siderBar from "./components/sideBar/index.vue"
import navBar from "./components/navBar.vue"
import tagsView from "./components/tagsView.vue"
import appMain from "./components/appMain.vue"
export default {
    components: {
        siderBar,
        navBar,
        tagsView,
        appMain
    },
    data() {
        return {


        }
    },
    methods: {

    }
}
</script>
<!-- scoped：样式作用域  使用样式深度穿透 -->
<style scoped >
.common-layout,
.el-container {
    width: 100vw;
    height: 100vh;
}
</style>