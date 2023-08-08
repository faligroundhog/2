<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    :header-cell-style="{ background: $store.getters.mainColor,color: 'white' }"
    border
    ref="multipleTable"
     @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55"> </el-table-column>
    <el-table-column
      prop="id"
      label="数据编号"
      sortable
      width="150px"
    ></el-table-column>
    <el-table-column
      prop="username"
      label="管理员名称"
      sortable
      width="150px"
    ></el-table-column>
    <el-table-column prop="rolename" label="管理员角色" sortable width="150px">
    </el-table-column>
    <el-table-column label="管理员状态">
      <template slot-scope="{ row }">
        <el-button v-if="row.status == 1" plain type="success">启用</el-button>
        <el-button v-else type="warning" plain>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" width="160px">
      <template slot-scope="scope">
        <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: { list: Array },
  components: {},
  data() {
    return {
      exportList:[]
    };
  },
  mounted() {},
  methods: {
    handleSelectionChange(val){
      this.$emit('exportVal',val)
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$serve.delUserList({ id }).then((res) => {
            this.$emit("getList");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(row) {
      this.$Bus.$emit("Useredit", row);
    },
  },
  handleSelectionChange() {},
};
</script>

<style scoped>

</style>
