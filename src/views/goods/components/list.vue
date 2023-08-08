<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :header-cell-style="{ background: $store.getters.mainColor,color: 'white' }"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="firstcatename" label="一级分类名称" sortable> </el-table-column>
    <el-table-column prop="secondcatename" label="二级分类名称" sortable> </el-table-column>
    <el-table-column prop="goodsname" label="商品名称" sortable> </el-table-column>
    <el-table-column prop="price" label="商品售价" sortable> </el-table-column>
    <el-table-column prop="market_price" label="商品市场价" sortable> </el-table-column>
    <el-table-column label="商品状态" sortable>
      <template slot-scope="{ row }">
        <el-button v-if="row.status == 1" plain type="success">上架</el-button>
        <el-button v-else type="danger" plain>下架</el-button>
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
          this.$serve.delGoodsList({ id }).then((res) => {
            this.$emit("getList");
            this.$message.success('删除成功')
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
      this.$Bus.$emit('Cateedit',row)
    },
  },
};
</script>

<style scoped>
</style>
