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
      <el-col :span="4"> </el-col>
      <el-col :span="10">
        <el-button size="small" @click="reload">刷新</el-button>
        <el-button type="primary" size="small" @click="isShow = true"
          >添加</el-button
        >
        <el-button type="warning" size="small" @click="showExcelDialog = true"
          >导入excel表格</el-button
        >
        <input type="file" v-if="0" />
        <el-button type="success" size="small" @click="exprotExcel"
          >导出excel表格</el-button
        >
      </el-col>
    </el-row>
    <excelDialog :showExcelDialog.sync="showExcelDialog"></excelDialog>
    <!-- 数据列表区域 -->
    <listComp
      ref="Mylist"
      :list="list"
      @getList="getUserList"
      @exportVal="exportVal"
    ></listComp>
    <!-- 表单区域：添加|编辑 -->
    <formComp
      ref="Myform"
      :menuList="menuList"
      :isShow.sync="isShow"
      @getList="getUserList"
    ></formComp>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getUserList"
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
import xlsx from "xlsx";
import excelDialog from "./components/excelDialog.vue";
import listComp from "./components/list.vue";
import formComp from "./components/form.vue";
export default {
  components: {
    listComp,
    formComp,
    excelDialog,
  },
  inject:['reload'],
  data() {
    return {
      isShow: false,
      showExcelDialog: false,
      menuList: [],
      list: [],
      params: {
        page: 1,
        size: 2,
        total: 0,
      },
      exportList: [],
    };
  },
  mounted() {
    this.getRoleList();
    this.getUserList();
    this.getParamsTotal();
  },
  methods: {
    exportVal(val) {
      this.exportList = val;
    },
    exprotExcel() {
      if (this.exportList.length == 0) {
        this.$message({
          message: "请先选择需要导出的数据！",
          type: "warning",
        });
        return;
      }
      let array = this.exportList.map((item) => {
        return {
          管理员姓名: item.username,
          管理员密码: item.password,
          管理员状态: item.status,
        };
      });
      let sheetData = xlsx.utils.json_to_sheet(array);
      let book = xlsx.utils.book_new(); //构建excel表
      xlsx.utils.book_append_sheet(book, sheetData, "管理员信息"); //将数据放到表中
      xlsx.writeFile(book, `user${new Date().getTime()}.xls`); //生成excel表
    },
    getRoleList() {
      this.$serve.getRoleList().then((res) => {
        this.menuList = res.list;
      });
    },
    getUserList() {
      this.$serve.getUserList(this.params).then((res) => {
        this.list = res.list;
      });
    },
    getParamsTotal() {
      this.$serve.getUserCount().then((res) => {
        this.params.total = res.list[0].total;
      });
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.params.page = 1;
      this.getUserList();
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
