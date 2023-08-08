<template>
  <el-dialog
    width="70%"
    title="批量导入excel数据"
    :visible="showExcelDialog"
    @close="$emit('update:showExcelDialog', false)"
  >
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="14"
        ><div class="upload-excel">
          <input
            ref="excel-upload-input"
            class="excel-upload-input"
            type="file"
            multiple
            accept=".xlsx, .xls"
            @change="changeUploadExcel"
          />
          <div class="drop">
            <i class="el-icon-upload" />
            <span
              >将文件拖到此处或
              <el-button type="text" @click="addUpload">点击上传</el-button>
            </span>
          </div>
        </div></el-col
      >

      <el-col :span="10">
        <el-progress
          type="circle"
          :stroke-width="10"
          :percentage="process"
          v-show="processBuffer"
        ></el-progress>
      </el-col>
    </el-row>
    <el-row class="table">
      <el-table
        :data="list"
        style="width: 100%; margin-bottom: 20px"
        :header-cell-style="{
          background: $store.getters.mainColor,
          color: 'white',
        }"
        border
        ref="multipleTable"
      >
        <el-table-column
          prop="username"
          label="管理员名称"
          width="150px"
        ></el-table-column>
        <el-table-column prop="password" label="管理员密码"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="{ row }">
            <el-button v-if="row.status == 1" plain type="success"
              >启用</el-button
            >
            <el-button v-else type="warning" plain>禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" @click="$emit('update:showExcelDialog', false)"
        >取消</el-button
      >
      <el-button size="mini" type="primary" @click="onSubmit"
        >上传至服务器</el-button
      >
    </el-row>
  </el-dialog>
</template>
<script>
import xlsx from "xlsx";
export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      file:{},
      process: 0, //进度条
      processBuffer: false,
    };
  },
  watch: {
    showExcelDialog(val) {
      if (!val) {
        this.$refs["excel-upload-input"].value = "";
        this.list = [];
      }
    },
  },
  methods: {
    addUpload() {
      this.$refs["excel-upload-input"].click();
    },
    changeUploadExcel(e) {
      let userCharacter = {
        username: { text: "管理员姓名", type: "string" },
        password: { text: "管理员密码", type: "number" },
        status: { text: "状态", type: "number" },
      };

      const files = e.target.files[0];
      this.file=files
      let reader = new FileReader();
      reader.readAsBinaryString(files); // 把当前文件以二进制进行读取
      reader.onload = (ev) => {
        let BinaryData = ev.target.result;
        let workbook = xlsx.read(BinaryData, { type: "binary" });
        let worksheet = workbook.Sheets[workbook.SheetNames[0]];
        let jsonData = xlsx.utils.sheet_to_json(worksheet);
        jsonData = jsonData.map((item) => {
          let obj = {};
          for (let key in userCharacter) {
            // 解构获取excel中标题和内容字段类型
            let { text, type } = userCharacter[key];
            // 重新确定value值类型
            let value = item[text];
            type == "string" ? (value = String(value)) : "";
            type == "number" ? (value = Number(value)) : "";
            // 根据text表格中文标题获取数据并以服务端表格英文字段添加到obj对象中
            obj[key] = value;
          }
          return obj;
        });
        this.list = this.list.concat(jsonData);
      };
    },
    onSubmit() {
      const loading = this.$loading({
        lock: true,
        text: "文件上传中，稍等亲！",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      this.processBuffer=true
      const onUploadProgress=(proce)=>{
        this.process = parseInt(proce.loaded / proce.total) * 100
      }
      this.$serve.exportExlsList({fileDataJSON: this.list, file: this.file},onUploadProgress).then(res=>{
        loading.close()
      })
    },
  },
};
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 360px;
  height: 180px;
  align-items: center;
  color: #697086;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #dcdfe6;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 160px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .drop {
    line-height: 40px;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
      color: #c0c4cc;
    }
  }
}
</style>