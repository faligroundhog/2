<template>
  <el-main style="background: #eee">
    <!-- 二级路由出口 -->
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="isRouterAlive"></router-view>
    </transition>
  </el-main>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  components: {},
  data() {
    return {
      isRouterAlive: true,
    };
  },
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style scoped>
.el-main {
  background: #eee !important;
  color: #333;
}
</style>
