<template>
  <div class="login-box">
    <!-- 登录主要的盒子 -->
    <div class="login-body">
      <!-- 头部头像 -->
      <div class="header-pic"></div>
      <!-- 登录表单盒子 -->
      <div class="login-form-box">
        <!-- 登录表单 -->
        <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
          <div class="input-field">
            <div class="input-left">账号</div>
            <el-form-item placeholder="账号" prop="username">
              <el-input
                v-model="loginForm.username"
                @focus="hiddenLoginErr(loginRef, 'username')"
              />
            </el-form-item>
          </div>
          <div class="input-field">
            <div class="input-left">密码</div>

            <el-form-item placeholder="密码" prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                show-password
                @focus="hiddenLoginErr(loginRef, 'password')"
              />
            </el-form-item>
          </div>
          <div class="buttons">
            <el-button type="success" size="large" @click="signon"
              >去注册</el-button
            >
            <el-button
              type="primary"
              size="large"
              @click="login(loginRef)"
              :loading="loginLoading"
              >{{ loginLoading ? "登陆中" : "登录" }}</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { CLogin } from "../pageTs/login";
import { useRouter } from "vue-router";
import { loginModule } from "../request/api";
import { ElMessage } from "element-plus";
const loginLoading = ref<boolean>(false);
const router = useRouter();
const loginRef = ref<FormInstance>();
const loginForm = ref(new CLogin());
const loginRules = reactive({
  username: {
    required: true,
    message: "请输入账号",
    type: "string",
    trigger: "blur",
  },
  password: {
    required: true,
    message: "请输入密码",
    type: "string",
    trigger: "blur",
  },
});
//前往注册页面
function signon() {
  router.push("/register");
}
//登录验证
function login(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate(async (vaild) => {
    if (vaild) {
      try {
        loginLoading.value = true;
        const res: any = await loginModule({
          username: loginForm.value.username,
          password: loginForm.value.password,
        });
        const message: string = res.message;

        setTimeout(() => {
          if (message !== "登录成功！") {
            ElMessage.error(message);
          } else {
            router.push("/home");
            ElMessage({
              message: "登陆成功！",
              type: "success",
            });
          }
          loginLoading.value = false;
        }, 500);
      } catch (err) {
        ElMessage.error("错误！");
      }
    } else {
      return false;
    }
  });
}
//优化显示错误
function hiddenLoginErr(formEl: FormInstance | undefined, item: string) {
  if (!formEl) return;
  formEl.clearValidate(item);
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  cursor: default;

  .login-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;

    // height: 500px;
    background-color: #fde2e2;
    opacity: 0.8;
    border-radius: 10px;

    .header-pic {
      height: 150px;
      width: 150px;
      border: 1px solid #efefef;
      border-radius: 50%;
      box-shadow: 1px 1px 10px 10px #efefef;
      background-image: url("../assets/IMG.PNG");
      background-repeat: no-repeat;
      background-size: cover;
      margin: 0 auto;
      margin-top: -50px;
    }

    .login-form-box {
      box-sizing: border-box;
      //   height: 250px;
      width: 100%;
      margin: 10px 0;
      padding: 10px;
      //   background-color: #fcd3d3;

      .el-form {
        width: 600px;
        margin: 0 auto;
        .input-field {
          display: flex;
          align-items: center;
          margin-top: 20px;

          .input-left {
            font-size: 25px;
            padding: 10px;
            margin: 0 20px;
          }

          .el-form-item {
            margin: 0;
          }
          .el-input {
            height: 60px;
            width: 450px;
            font-size: 30px;
          }
        }

        .buttons {
          width: 600px;
          margin: 0 auto;
          padding: 30px 0;
          text-align: center;

          button:nth-child(2) {
            margin-left: 120px;
          }
        }
      }
    }
  }
}
</style>
