<template>
  <div>
    <!-- 搜索区域 -->
    <el-row type="flex" justify="space-around">
      <el-col :span="10">
        <el-input
          class="w-50 m-2"
          placeholder="请输入搜索关键词"
          prefix-icon="el-icon-search"
          size="medium"
        >
          <el-button
            type="info"
            size="medium"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="11"> </el-col>
      <el-col :span="7">
        <el-button
          type="primary"
          size="small"
          @click="isShow = true"
          >添加</el-button
        >
      </el-col>
    </el-row>

    <!-- 数据列表区域 -->
    <listComp ref="Mylist" :list="list" @getList="getCateList"></listComp>
    <!-- 表单区域：添加|编辑 -->
    <formComp ref="Myform" :list="list" :isShow.sync="isShow" @getList="getCateList"></formComp>
  </div>
</template>

<script>
import listComp from "./components/list.vue";
import formComp from "./components/form.vue";
export default {
  components: {
    listComp,
    formComp,
  },
  data() {
    return {
      isShow: false,
      menuList: [],
      list: [],
    };
  },
  mounted() {
    this.getCateList()
  },
  methods: {
    getCateList() {
      this.$serve.getCateList({istree:true}).then((res) => {
        this.list = res.list;
      });
    },
  },
};
</script>

<style scoped>
.color {
  background: #ff4500;
  border: 0;
}
.el-row {
  margin: 20px 0;
}
</style>
