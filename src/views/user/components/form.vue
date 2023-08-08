<template>
  <div>
    <el-dialog
      :title="form.uid ? '管理员编辑' : '管理员添加'"
      :visible="isShow"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="管理员角色" :label-width="formLabelWidth">
          <el-select v-model="form.roleid">
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="管理员名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" placeholder="不填写则不修改" autocomplete="off"></el-input>
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
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  mounted() {
    this.$Bus.$on("Useredit", (val) => {
      this.$emit("update:isShow", true);
      console.log(val);
      delete val.password
      delete val.id
      delete val.randstr
      this.form = JSON.parse(JSON.stringify(val));
    });
  },
  methods: {
    handleClose() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
      this.$emit("update:isShow", false);
    },
    add() {
      if (this.form.uid) {
        this.$serve.editUserList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
          this.$message.success("编辑成功");
        });
      } else {
        this.$serve.addUserList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
          this.$message.success("添加成功");
        });
      }
    },
  },
};
</script>

<style scoped></style>
