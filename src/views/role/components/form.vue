<template>
  <div>
    <el-dialog
      :title="form.id ? '角色编辑' : '角色添加'"
      :visible="isShow"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :props="{
              children: 'children',
              label: 'title',
            }"
          ></el-tree>
        </el-form-item>

        <el-form-item label="角色状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4500"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: { isShow: Boolean, menuList: Array },

  data() {
    return {
      formLabelWidth: "120px",
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  mounted() {
    this.$Bus.$on("Roleedit", (val) => {
      this.$emit("update:isShow", true);
      this.form=JSON.parse(JSON.stringify(val))
      this.$nextTick(()=>{
        let arr = val.menus.split(",");
        let arr1 = this.menuList.map(item=>item.id);
        this.menuList.forEach(item=>{
          if(item.children && arr.includes(item.id+'')){
            console.log(item.id);
          }
        })
        let arr2 = arr.filter(item=>!arr1.includes(+item))
        this.$refs.tree.setCheckedKeys(arr2)
      })
    });
  },
  methods: {
    handleClose() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
      this.$emit("update:isShow", false);
    },
    add() {
      let arr = this.$refs.tree
        .getCheckedNodes(false, true)
        .map((item) => item.id);
      this.form.menus = arr.join(",");
      if (this.form.id) {
        this.$serve.editRoleList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
          this.$message.success('编辑成功')
        });
      } else {
        this.$serve.addRoleList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
          this.$message.success('添加成功')
        });
      }
    },
  },
};
</script>

<style scoped></style>
