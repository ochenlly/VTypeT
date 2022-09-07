<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4"
            ><img src="../../public/vite.svg" class="header-pic"
          /></el-col>
          <el-col :span="16"><h1>后台管理系统</h1></el-col>
          <el-col :span="4"
            ><div class="sign-out" @click="signOut">退出登录</div></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu class="el-menu-vertical-demo" router>
            <el-menu-item
              v-for="item in list"
              :key="item.path"
              :index="item.path"
            >
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const list = router.getRoutes().filter((item) => item.meta.isShow);

function signOut() {
  router.push("/login");
}
</script>

<style lang="scss" scoped>
.common-layout {
  cursor: default;
  .el-header {
    height: 80px;
    background-color: #babcbf;
    .header-pic {
      height: 80px;
    }
    h1,
    .sign-out {
      text-align: center;
      height: 80px;
      line-height: 80px;
    }
  }
  .el-aside {
    .el-menu {
      height: calc(100vh - 80px);
      background-color: #dcdfe6;
    }
  }
  .el-main {
    background-color: #eee;
    height: calc(100vh - 80px);
    overflow-y: auto;
  }
}
</style>
