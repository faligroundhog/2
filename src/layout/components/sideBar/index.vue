<template>
  <el-aside width="auto">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      text-color="#eee"
      active-text-color="#fff"
      :background-color="$store.getters.mainColor"
      :default-active="$route.path"
    >
      <!-- 收缩按钮 -->
      <img
        v-show="!isCollapse"
        src="../../../assets/img/pic/logo/white.png"
        class="aside_title_close"
        @click="isCollapse = true"
      />
      <!-- 展开按钮 -->
      <i
        class="el-icon-s-unfold aside_title_open"
        v-show="isCollapse"
        @click="isCollapse = false"
      ></i>
      <!-- 菜单区域 -->
      <subMenu v-for="item in $store.getters.userInfo.menus" :key="item.id" :item="item"></subMenu>
    </el-menu>
  </el-aside>
</template>

<script>
import subMenu from "./subMenu.vue";
export default {
  components: { subMenu },
  data() {
    return {
      isCollapse: false, //缩放左侧菜单栏
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.el-aside {
  overflow: hidden;
  height: 100vh;
}

.aside_title_close {
  width: 130px;
  height: 35px;
  margin: 20px 32px;
  cursor: pointer;
}

.aside_title_open {
  cursor: pointer;
  color: #eee;
  font-size: 50px;
}

.el-aside ul {
  height: 100vh;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}

/* 设置左侧菜单栏icon颜色 */
.el-submenu .el-i {
  color: #eee;
}

/* 仅设置左侧菜单展开按钮样式颜色 */
.el-submenu /deep/.el-icon-arrow-down::before {
  content: "\e6df";
  color: #eee;
}
</style>
