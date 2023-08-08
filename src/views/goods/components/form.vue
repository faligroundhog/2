<template>
  <div>
    <el-dialog
      :title="form.id ? '商品编辑' : '商品添加'"
      :visible="isShow"
      :before-close="handleClose"
      @opened="opend"
    >
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeCate">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
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
        <el-form-item label="商品规格" :label-width="formLabelWidth">
          <el-select v-model="form.specsid" @change="changeSpace">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :value="item.id"
              :label="item.specsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品规格值" :label-width="formLabelWidth">
          <el-select multiple v-model="form.specsattr">
            <el-option
              v-for="item in specsAttrs"
              :key="item"
              :value="item"
              :label="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售价" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价" :label-width="formLabelWidth">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品详细描述" :label-width="formLabelWidth">
          <div ref="editor"></div>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>
        <!-- 是否上架 -->
        <el-form-item label="是否上架" :label-width="formLabelWidth">
          <el-radio v-model="form.status" :label="1">是</el-radio>
          <el-radio v-model="form.status" :label="2">否</el-radio>
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
import E from "wangeditor";
export default {
  props: { isShow: Boolean, cateList: Array, specsList: Array },
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        first_cateid: "", //一级分类数据id
        second_cateid: "", //二级分类数据id
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //商品市场价格
        img: "", //商品图片（二进制数据）
        description: "", //商品描述
        specsid: "", //商品规格id
        specsattr: [], //商品规格值 ['白色',黑色']
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //1 启用  2禁用
      },
      secondCate: [], //二级分类数据
      specsAttrs: [], //商品规格值 ['白色',黑色']
      editor: null, //初始化富文本对象
      imageUrl: "",
    };
  },
  mounted() {
    this.$Bus.$on("Cateedit", (val) => {
      console.log(val);
      val = JSON.parse(JSON.stringify(val));
      delete val.firstcatename;
      delete val.secondcatename;
      this.changeCate(val.first_cateid);
      this.changeSpace(val.specsid);
      this.$emit("update:isShow", true);
      this.form = val;
      this.form.specsattr = val.specsattr.split(",");
      this.imageUrl = process.env.VUE_APP_BASE_URL + val.img;
    });
  },
  methods: {
    opend() {
      this.editor = new E(this.$refs.editor);
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
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
    changeCate(id) {
      this.form.second_cateid = [];
      this.secondCate = this.cateList.find((item) => item.id == id).children;
    },
    changeSpace(id) {
      this.form.specsattr = [];
      this.specsAttrs = this.specsList.find((item) => item.id == id)?.attrs;
      console.log(this.specsList);
    },
    handleClose() {
      this.form = {
        first_cateid: "", //一级分类数据id
        second_cateid: "", //二级分类数据id
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //商品市场价格
        img: "", //商品图片（二进制数据）
        description: "", //商品描述
        specsid: "", //商品规格id
        specsattr: [], //商品规格值 ['白色',黑色']
        isnew: 1, //是否新品
        ishot: 1, //是否热卖
        status: 1, //1 启用  2禁用
      };
      this.$emit("update:isShow", false);
      this.editor.destroy();
    },
    add() {
      this.form.description = this.editor.txt.html();
      if (this.form.id) {
        this.$serve.editGoodsList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
          this.$message.success('编辑成功')
        });
      } else {
        this.$serve.addGoodsList(this.form).then((res) => {
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
