<template>
  <div class="register-box">
    <div class="register-body">
      <h1>注册</h1>
      <div class="register-form">
        <el-form
          ref="registerRef"
          :model="registerForm"
          status-icon
          :rules="registerRules"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="账号"
              @focus="hiddenSignonErr(username)"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="密码"
              @focus="hiddenSignonErr(password)"
            />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="确认密码"
              @focus="hiddenSignonErr(confirmPassword)"
            />
          </el-form-item>
          <div class="buttons">
            <el-button
              type="primary"
              size="large"
              @click="signon"
              :loading="registerLoading"
              >{{ registerLoading ? "注册中" : "注册" }}</el-button
            >
            <el-button size="large" @click="backLogin">返回</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { CRegister } from "../pageTs/register";
import { registerModule } from "../request/api";
import { ElMessage } from "element-plus";
const registerLoading = ref<boolean>(false);
const username: string = "username";
const password: string = "password";
const confirmPassword: string = "confirmPassword";
const router = useRouter();
const registerRef = ref();
const registerForm = ref(new CRegister());
const registerRules = reactive({
  username: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "blur",
      type: "string",
    },
    {
      required: true,
      message: "账号的长度在3-10位之间",
      trigger: "blur",
      min: 3,
      max: 10,
    },
    {
      required: true,
      pattern: /^[0-9a-zA-Z]{1,}$/,
      message: "仅限英文和数字",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
      type: "string",
    },
    {
      required: true,
      message: "密码的长度在6-15位之间",
      trigger: "blur",
      min: 6,
      max: 15,
    },
  ],
  confirmPassword: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== registerForm.value.password) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      },
      type: "string",
      trigger: "blur",
    },
  ],
});
//注册
function signon() {
  registerRef.value.validate(async (vaild: boolean) => {
    if (vaild) {
      try {
        //发送请求
        registerLoading.value = true;
        const res: any = await registerModule({
          username: registerForm.value.username,
          password: registerForm.value.password,
          confirmPassword: registerForm.value.confirmPassword,
        });

        setTimeout(() => {
          if (res.message === "注册成功！") {
            ElMessage({
              message: "注册成功！",
              type: "success",
            });
            router.push("/login");
          } else {
            ElMessage.error(res.message);
          }
          registerLoading.value = false;
        }, 500);
      } catch (err) {
        ElMessage.error("错误！");
      }
    }
    return false;
  });
}
//返回登录
function backLogin() {
  router.push("/login");
}
//优化显示错误
function hiddenSignonErr(item: string) {
  registerRef.value.clearValidate(item);
}
</script>

<style lang="scss" scoped>
.register-box {
  width: 100%;
  height: 100%;
  background-image: url("../assets/back2.png");
  background-repeat: no-repeat;
  background-size: cover;

  .register-body {
    position: absolute;
    top: 25%;
    left: 20%;
    width: 30%;
    // height: 50%;
    min-height: 400px;
    min-width: 200px;
    background-color: #a0cfff;
    text-align: center;

    h1 {
      width: 200px;
      margin: 0 auto;
      padding: 10px;
    }
    .register-form {
      height: 300px;
      width: 90%;
      margin: 0 auto;
      margin-top: 20px;

      .el-form-item {
        height: 50px;
        width: 80%;
        margin: 20px auto;
      }
      .el-input {
        height: 50px;
        font-weight: bold;
        font-size: 20px;
      }

      .buttons {
        width: 300px;
        margin: 0 auto;
        margin-top: 45px;

        button:nth-child(2) {
          margin-left: 50px;
        }
      }
    }
  }
}
</style>
