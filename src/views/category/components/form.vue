<template>
  <div>
    <el-dialog
      :title="form.id ? '分类编辑' : '分类添加'"
      :visible="isShow"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="上传分类" :label-width="formLabelWidth">
          <el-select v-model="form.pid">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-up"></i>
          </el-upload>
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
  props: { isShow: Boolean, list: Array },

  data() {
    return {
      formLabelWidth: "120px",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      imageUrl: "",
    };
  },
  mounted() {
    this.$Bus.$on("Cateedit", (val) => {
      console.log(val);
      this.$emit("update:isShow", true);
      this.form = JSON.parse(JSON.stringify(val));
      this.imageUrl=process.env.VUE_APP_BASE_URL+val.img
    });
  },
  methods: {
    beforeAvatarUpload(file) {
      let { size, name } = file;
      if (size > 1024 * 1024 * 2) {
        this.$message.warning("超过文件大小");
        return;
      }
      let suffix = name.split(".")[1];
      let suffixWhiteList = ["jpg", "png", "gif", "wep", "jpeg"];
      if (!suffixWhiteList.includes(suffix)) {
        this.$message.warning("文件类型错误");
        return;
      }
      this.form.img = file.raw;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleClose() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.$emit("update:isShow", false);
    },
    add() {
      if (this.form.id) {
        this.$serve.editCateList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
        });
      } else {
        this.$serve.addCateList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
        });
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 148px;
  vertical-align: middle;
}
</style>
