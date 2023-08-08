<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    height="500"
    :header-cell-style="{ background: $store.getters.mainColor,color: 'white' }"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="catename" label="分类名称" sortable width="160px">
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="{ row }">
        <el-button v-if="row.status == 1" plain type="success">启用</el-button>
        <el-button v-else type="danger" plain>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作">
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
          this.$serve.delCateList({ id }).then((res) => {
            this.$emit("getList");
            this.$message.success("删除成功");
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
      this.$Bus.$emit("Cateedit", row);
    },
  },
};
</script>

<style scoped>
</style>
