<template>
  <div class="work-box">
    <div class="work-left">
      <div class="introduce-box">
        <div class="intoduce-top">
          <div class="avater">
            <img src="../assets/R-B.jfif" alt="" />
          </div>
          <div class="msg">
            <div class="nickname">chenlly</div>
            <div class="status">管理员</div>
          </div>
        </div>
        <el-divider />
        <div class="other">
          <div>上次登录时间: 2022/9/1</div>
          <div>上次登录地点: 四川成都</div>
        </div>
      </div>
      <div class="code-ratio">
        <h1>语言详情</h1>
        <hr />

        <div class="progress">
          HTML
          <el-progress :percentage="60" />
          Vue
          <el-progress :percentage="10" color="blue" />

          TypeScript
          <el-progress :percentage="30" color="red" />
        </div>
      </div>
    </div>
    <div class="todolist">
      <h1>代办事项</h1>
      <el-divider />
      <div class="todo-table">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column prop="thing" label="描述" />
        </el-table>
      </div>
    </div>
    <div id="calendar"></div>
  </div>
  <div class="bottom-pics">
    <div id="histogram"></div>
    <div id="line-chart"></div>
  </div>
</template>

<script setup lang="ts">
import { initDataFun, initPicFunc, initLinePicFunc } from "../pageTs/work";
import { onMounted } from "vue";
onMounted(() => {
  initDataFun();
  initPicFunc();
  initLinePicFunc();
});
const tableData = [
  {
    thing: "今天要写1000行代码",
  },
  {
    thing: "明天要敲1000行代码",
  },
  {
    thing: "后台要改代码",
  },
  {
    thing: "后天重新构思代码",
  },
  {
    thing: "大后天重新开始写1000行代码",
  },
];
</script>

<style lang="scss" scoped>
.work-box {
  display: flex;
  // width: 100%;
  justify-content: space-between;

  .work-left {
    width: 38%;
    .introduce-box {
      height: 300px;
      // width: 635px;
      background-color: white;
      margin-bottom: 10px;
      &:hover {
        box-shadow: 0 5px 10px #ddd;
      }
      .intoduce-top {
        display: flex;
        align-items: center;
        .avater {
          margin-left: 40px;
          margin-top: 20px;
          img {
            height: 150px;
            width: 150px;
            border: 1px solid white;
            border-radius: 50%;
          }
        }
        .msg {
          margin-left: 30px;
          .nickname {
            padding: 5px;
            font-size: 30px;
          }
          .status {
            padding: 5px;
            font-size: 20px;
          }
        }
      }

      .other {
        padding: 10px;
        font-weight: lighter;
        display: flex;
        flex-direction: column;
        // align-items: center;
      }
    }
    .code-ratio {
      height: 190px;
      // width: 635px;
      background-color: white;
      &:hover {
        box-shadow: 0 5px 10px #ddd;
      }
      h1 {
        padding: 10px;
      }
      .progress {
        width: 90%;
        margin: 0 auto;
      }
    }
  }
  .todolist {
    height: 500px;
    width: 30%;
    background-color: white;
    text-align: center;
    h1 {
      margin: 20px 0;
    }
    &:hover {
      box-shadow: 0 5px 10px #ddd;
    }
    .todo-table {
      padding: 0 20px;
    }
  }
  #calendar {
    height: 500px;
    width: 30%;
    background-color: white;

    &:hover {
      box-shadow: 0 5px 10px #ddd;
    }
  }
}
.bottom-pics {
  display: flex;
  justify-content: space-around;
  width: 100%;
  // height: 600px;
  margin-top: 20px;

  #histogram {
    width: 50%;
    height: 450px;
    background-color: white;
    margin-right: 20px;
    &:hover {
      box-shadow: 0 5px 10px #ddd;
    }
  }
  #line-chart {
    width: 50%;
    height: 450px;
    background-color: white;
    &:hover {
      box-shadow: 0 5px 10px #ddd;
    }
  }
}
</style>
