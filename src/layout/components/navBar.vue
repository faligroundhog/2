<template>
  <el-header>
    <!-- 导航路由标签 -->
    <el-breadcrumb separator=" /">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in $route.meta.title"
        :key="index"
        >{{ item }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <!-- 办公消息提示 -->
    <el-badge is-dot class="title_msg">
      <i class="el-icon-s-comment"></i>
    </el-badge>
    <!-- 切换主题区域 -->
    <div class="theme-select" :style="{ color: $store.getters.mainColor }">
      <span class="demonstration">{{ $t("title.theme") }}</span>
      <el-color-picker
        v-model="themeColor"
        size="mini"
        :predefine="predefineColors"
      ></el-color-picker>
    </div>

    <!-- 语言国际化区域 -->
    <el-dropdown
      class="dropdown1"
      :style="{ color: $store.getters.mainColor }"
      @command="changeLang"
    >
      <span class="el-dropdown-link"
        >{{ $t("title.lang") }}<i class="el-icon-arrow-down el-icon--right"></i
      ></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh">中文</el-dropdown-item>
          <el-dropdown-item command="en">英文</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 用户信息 退出登录区域 -->
    <el-dropdown
      class="dropdown2"
      :style="{ color: $store.getters.mainColor }"
      @command="changeUser"
    >
      <span class="el-dropdown-link"
        >{{ $store.getters.userInfo.username
        }}<i class="el-icon-arrow-down el-icon--right"></i
      ></span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="out">退出</el-dropdown-item>
          <el-dropdown-item command="edit">修改信息</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 全屏服务区域 -->
    <img
      :src="screenFull ? exitImg : fullImg"
      class="fullScreen"
      :style="{ background: $store.getters.mainColor }"
      @click="changeFullScreen"
    />
  </el-header>
</template>

<script>
import screenfull from "screenfull";
import { generateNewStyle, writeNewStyle } from "@/utils/theme/index.js";
export default {
  data() {
    return {
      screenFull: false, //全屏开关
      fullImg: require("@/assets/img/icon/index/full.svg"),
      exitImg: require("@/assets/img/icon/index/exitfull.svg"),
      themeColor: this.$store.getters.mainColor, //主题色
      predefineColors: [
        "#ff4500",
        "#ff8c00",
        "#ffd700",
        "#90ee90",
        "#00ced1",
        "#1e90ff",
        "#c71585",
        "rgba(255, 69, 0, 0.68)",
        "rgb(255, 120, 0)",
        "hsv(51, 100, 98)",
        "hsva(120, 40, 94, 0.5)",
        "hsl(181, 100%, 37%)",
        "hsla(209, 100%, 56%, 0.73)",
        "#c7158577",
      ],
    };
  },
  watch: {
    themeColor: {
      async handler(val) {
        const newStyleText = await generateNewStyle(val);
        writeNewStyle(newStyleText);
        this.$store.commit("theme/setMainColor", val);
      },
      immediate:true
    },
  },
  mounted() {
    screenfull.on("change", () => {
      this.screenFull = !this.screenFull;
    });
  },
  methods: {
    changeUser(info) {
      info == "out" ? this.loginOut() : this.editUser();
    },
    // 用户登出
    loginOut() {
      this.$confirm("是否继续本次操作?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.commit("user/outLogin");
        this.$router.replace("/login");
      });
    },
    // 用户信息编辑
    editUser() {},
    changeFullScreen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: "您的浏览器暂不支持全屏哦！",
          type: "warning",
        });
      } else {
        // 执行切换窗口
        screenfull.toggle();
      }
    },
    changeLang(lang) {
      this.$i18n.locale = lang;
    },
  },
};
</script>

<style scoped>
.el-header {
  width: 100%;
  background-color: white;
  color: #333;
  position: relative;
  overflow: hidden;
}

.tags-list {
  border: 2px solid #333;
  width: 100%;
  height: 30px;
}

.el-breadcrumb {
  position: absolute;
  left: 20px;
  line-height: 60px;
}

.title_msg {
  position: absolute;
  right: 450px;
  top: 23px;
}

.theme-select {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  line-height: 60px;
  right: 340px;
  font-size: 14px;
}

.el-header div[class*="dropdown"] {
  position: absolute;
  line-height: 60px;
}

.el-header .dropdown1 {
  right: 240px;
}

.el-header .dropdown2 {
  right: 140px;
}

.fullScreen {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 40px;
  top: 15px;
  cursor: pointer;
}
</style>
