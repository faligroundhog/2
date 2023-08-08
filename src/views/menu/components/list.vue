<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
    :header-cell-style="{ background: $store.getters.mainColor,color: 'white' }"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column prop="title" label="名称" sortable> </el-table-column>
    <el-table-column label="图标" sortable>
      <template slot-scope="{ row }">
        <i :class="row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型">
      <template slot-scope="{ row }">
        <el-button v-if="row.type == 1" plain type="success">目录</el-button>
        <el-button v-else type="warning" plain>菜单</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="url" label="地址"> </el-table-column>
    <el-table-column prop="address" label="操作" width="160px">
      <template slot-scope="scope">
        <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="mini" @click="del(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$serve.getMenuList().then((res) => {
        this.list = res.list;
      });
    },
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (row.children && row.children.length > 0) {
            this.$alert("请先删除子菜单数据", "操作提示", {
              confirmButtonText: "确定",
            });
          } else {
            this.$serve.delMenuList({ id: row.id }).then((res) => {
              this.getList();
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>

</style>
