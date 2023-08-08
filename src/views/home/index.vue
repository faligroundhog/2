<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <span>欢迎访问后台管理系统当前时间是：{{ new Date() }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row style="height: 120px" :gutter="2">
      <el-col :span="6"
        ><div class="grid-content bg-purple row">
          <span>今日库存</span>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple row">
          <span>在线会员</span>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple row">
          <span>退款统计</span>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple row">
          <span>销量统计</span>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col>
        <div style="width:100%"  ref="tu" class="grid-content bg-purple tu"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    let myChart = echarts.init(this.$refs.tu);
    let option = {
      title: {
        text: "Stacked Line",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    };
    myChart.setOption(option)
  },
  methods: {},
  computed: {},
};
</script>
<style scoped lang='scss'>
.el-row {
  margin: 20px 0;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #a6b1c2;
}

.bg-purple {
  padding: 10px;
  box-sizing: border-box;
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.row {
  height: 120px;
  margin: 0 5px;
}

.tu {
  height: 390px;
  background: #d3dce6;
}
</style>
