<template>
  <div class="login">
    <div class="box">
      <div class="centext">
        <img src="pic/logo/orange@3x.png" alt="" />
        <p>优质甄选·高枕无忧</p>
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item prop="username">
            <el-input v-model="form.username" clearable></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="but" @click="onSumbit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSumbit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$serve.toLogin(this.form).then((res) => {
            this.$store.commit('user/login',res.list)
            this.$router.push("/");
          });
        }
      });
    },                                            
  },
  computed: {},
};
</script>
<style scoped lang='scss'>
.el-form-item {
  margin-bottom: 15px;
}
::v-deep .el-input__inner {
  height: 35px;
  background: #e8f0fe;
}
.el-form {
  margin-top: 100px;
}
.but {
  background: #ed2009;
  width: 100%;
  color: white;
  border-radius: 50px;
  margin-top: 25px;
}
.login {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #ff6142, #ff887d);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .box {
    width: 700px;
    height: 600px;
    margin-right: 100px;
    background-image: url(../../../public/pic/bg/login@3x.png);
    background-size: 100% 100%;
    text-align: right;
    padding-right: 60px;
    box-sizing: border-box;
    .centext {
      width: 40%;
      margin: 100px calc(100% - 43%);
      img {
        width: 100%;
      }
      p {
        color: #bfbdbf;
        letter-spacing: 13.5px;
        margin-top: 30px;
      }
    }
  }
}
</style>
