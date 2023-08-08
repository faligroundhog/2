<template>
  <div>
    <el-dialog
      :title="form.uid ? '管理员编辑' : '管理员添加'"
      :visible="isShow"
      :before-close="handleClose"
    >
    {{value}}
      <el-form :model="form">
        <el-form-item label="规格添加" :label-width="formLabelWidth">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-for="item,i in value" :key="i" label="规格值" :label-width="formLabelWidth">
          <el-input v-model="item.value">
            <template slot="append"> <span @click="addForm" v-if="i==0">新增规格值</span><span v-else @click="Formdel(i)">删除</span></template>
          </el-input>
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
        specsname: "",
        attrs: "",
        status: 1,
      },
      value:[{ "value":''}]
    };
  },
  mounted() {
    this.$Bus.$on("Specsedit", (val) => {
      this.$emit("update:isShow", true);
      console.log(val);
      this.form = JSON.parse(JSON.stringify(val));
      this.value =[]
      val.attrs.forEach(item=>{
        this.value.push({value:item})
      })
    });
  },
  methods: {
    addForm(){
      this.value.push({'value':""})
    },
    Formdel(i){
      this.value.splice(i, 1);
    },
    handleClose() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.value=[{ "value":''}]
      this.$emit("update:isShow", false);
    },
    add() {
      this.form.attrs=this.value.map(item=>item.value).join(",")
      if (this.form.id) {
        this.$serve.editSpecsList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
        });
      } else {
        this.$serve.addSpecsList(this.form).then((res) => {
          this.handleClose();
          this.$emit("getList");
        });
      }
    },
  },
};
</script>

<style scoped></style>
