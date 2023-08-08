<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    :header-cell-style="{ background: $store.getters.mainColor,color: 'white' }"
    border
  >
    <el-table-column
      prop="specsname"
      label="属性名称"
      sortable
      width="150px"
    ></el-table-column>
    <el-table-column label="属性值">
      <template slot-scope="{ row }">
        <el-button v-for="item,i in row.attrs" :key="i" plain type="success" size="mini">{{item}}</el-button>
      </template>
    </el-table-column>
    <el-table-column label="规格状态">
      <template slot-scope="{ row }">
        <el-button v-if="row.status == 1" plain type="success" size="mini">启用</el-button>
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
    return {};
  },
  mounted() {},
  methods: {
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$serve.delSpecsList({ id }).then((res) => {
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
      this.$Bus.$emit("Specsedit", row);
    },
  },
  handleSelectionChange() {},
};
</script>

<style scoped>

</style>
