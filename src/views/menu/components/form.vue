<template>
  <div>
    <el-dialog
      :title="form.id ? '菜单编辑' : '菜单添加'"
      :visible="isShow"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="顶级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            :disabled="form.id?true:false"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 目录级别 -->
        <el-form-item
          label="菜单图标"
          prop="icon"
          :label-width="formLabelWidth"
          v-if="!form.pid"
        >
          <icon-picker v-model="form.icon"></icon-picker>
        </el-form-item>
        <!--菜单级别 -->
        <el-form-item label="菜单路径" v-else :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio disabled v-model="form.type" :label="1">目录</el-radio>
          <el-radio disabled v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <!-- 菜单状态 -->
        <el-form-item label="菜单状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
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
  props: { isShow: Boolean },

  data() {
    return {
      formLabelWidth: "120px",
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      options: [],
      value: "",
    };
  },
  mounted() {
    this.$serve.getMenuList().then((res) => {
      this.options = res.list;
      this.options.unshift({
        id: 0,
        title: "顶级菜单",
      });
    });
  },
  methods: {
    handleClose() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
      this.$emit("update:isShow", false);
    },
    add() {
      if (this.form.id) {
        this.$serve.editMenuList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
        });
      } else {
        this.$serve.addMenuList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
        });
      }
    },
    getMenuDetail(id) {
      this.$serve.getMenuDetail(id).then((res) => {
        this.form = res.list;
        this.form.id=id
      });
    },
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        if (val.pid) {
          this.form.type = 2;
          this.form.icon=''
        } else {
          this.form.type = 1;
          this.form.url=''
        }
      },
    },
  },
};
</script>

<style scoped></style>
