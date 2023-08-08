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
    <listComp ref="Mylist" :list="list" @getList="getSpecsList"></listComp>
    <!-- 表单区域：添加|编辑 -->
    <formComp
      ref="Myform"
      :isShow.sync="isShow"
      @getList="getSpecsList"
    ></formComp>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getSpecsList"
      :current-page.sync="params.page"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="params.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="params.total"
    >
    </el-pagination>
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
      params: {
        page: 1,
        size: 2,
        total: 0,
      },
    };
  },
  mounted() {
    this.getSpecsList();
  },
  methods: {
    getSpecsList() {
      this.getParamsTotal();
      this.$serve.getSpecsList(this.params).then((res) => {
        this.list = res.list;
      });
    },

    getParamsTotal() {
      this.$serve.getSpecsCount().then((res) => {
        this.params.total = res.list[0].total;
      });
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.params.page = 1;
      this.getSpecsList();
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
