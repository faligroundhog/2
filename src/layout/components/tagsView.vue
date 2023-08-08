<template>
  <div class="route-tags-list">
    <!-- 当tag是首页时候不能删除 -->
    <el-tag
      v-for="item in list"
      :key="item.path"
      :hit="true"
      :closable="item.name=='首页'?false:true"
      size="small"
      :effect="item.path != $route.path?'plain':'dark'"
      @click="change(item.path)"
      @close="close(item.path)"
    >
      {{ item.name }}
    </el-tag>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [{ name: "首页", path: "/home" }],
    };
  },
  mounted() {},
  methods: {
    change(path) {
      this.$router.push(path);
    },
    close(path) {
      this.list = this.list.filter((item) => item.path != path);
      if (path == this.$route.path) {
        this.$router.push(this.list[this.list.length - 1].path);
      }
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(val) {
        let res = this.list.find((item) => item.path == val.path);
        if (!res) {
          this.list.push({ name: val.meta.title[1], path: val.path });
        }
      },
      immediate:true
    },
  },
};
</script>

<style scoped>
.active {
  opacity: 0.5;
}
.route-tags-list {
  box-shadow: 2px 1px 5px #ddd;
  width: 100%;
  height: 35px;
  margin: 2px 0;
  padding: 0 5px;
  display: flex;
  align-items: center;
}

.route-tags-list .el-tag {
  margin: 0 3px;
}
</style>
