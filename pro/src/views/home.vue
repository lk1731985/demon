<template>
  <el-row>
    <el-col :span="8">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/user.jpg" alt="" />
          <div class="userinfo">
            <p class="name">用户id</p>
            <p class="role">用户角色</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2018-01-01</span></p>
          <p>上次登录地点: <span>北京</span></p>
        </div>
      </el-card>
      <el-card class="table1">
        <el-table :data="tableData" style="width: 100%" :max-height="475">
          <el-table-column
            :prop="key"
            :label="val"
            v-for="(val, key) in tablelable"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 20px">
      <div class="box2">
        <el-card
          class="box2-1"
          v-for="item in countdata"
          :key="item.name"
          :body-style="{ display: 'flex', padding: '0' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ backgroundColor: item.clolor }"
          ></i>
          <div class="detail">
            <p class="count">
              {{ item.count > 10 ? item.count : item.count * 100 + "%" }}
            </p>
            <p class="name">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <div class="box3">
        <el-card>
          <div class="box3-1" ref="EChart1"></div>
        </el-card>
        <div class="box3-2">
          <el-card>
            <div class="box3-3" ref="EChart2"></div>
          </el-card>
          <el-card>
            <div class="box3-4" ref="EChart3"></div>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
// import tableData from '@/assets/tableData';
import { getHomeInfo } from "@/api/index";
export default {
  data() {
    return {
      tableData: [],
      tablelable: {
        id: "序号",
        name: "姓名",
        date: "日期",
        age: "年龄",
        address: "地址",
      },
      countdata: [],
    };
  },
  methods: {
    echart1(data) {
      // console.log(this.$echarts);
      // 基于准备好的dom，初始化echarts实例
      let EChart = this.$echarts.init(this.$refs.EChart1);
      // 配置参数
      let config = {
        title: { text: "标题" },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["销量", "产量"],
        },
        xAxis: {
          data: data.map((item) => item.name),
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "line",
            data: data.map((item) => item.value1),
          },
          {
            name: "产量",
            type: "line",
            data: data.map((item) => item.value2),
          },
        ],
      };
      // 设置参数
      EChart.setOption(config);
    },
    echart2(data) {
      const EChart = this.$echarts.init(this.$refs.EChart2);
      let config = {
        title: {
          text: "标题",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: data.map((item) => item.name),
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        series: [
          {
            name: "类型1",
            type: "bar",
            data: data.map((item) => item.value1),
          },
          {
            name: "类型2",
            type: "bar",
            data: data.map((item) => item.value2),
          },
        ],
      };
      EChart.setOption(config);
    },
    echart3(data) {
      const EChart = this.$echarts.init(this.$refs.EChart3);
      let config = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          right: 5,
          top: "center",
        },
        series: [
          {
            name: "类型",
            type: "pie",
            radius: ["40%", "70%"],
            center: ["40%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      EChart.setOption(config);
      data;
    },


  },
  mounted() {
    getHomeInfo().then(({ data }) => {
      const { tableData, countdata, lineData, barData, pieData } = data.data;

      //表格数据
      this.tableData = tableData;
      //统计数据
      this.countdata = countdata;

      //折线图
      this.echart1(lineData.list);

      //柱状图
      this.echart2(barData.list);

      //饼图
      this.echart3(pieData.list);
    });
   this.getIpAndAddressSohu()
  }
};
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .role {
      font-size: 16px;
      color: #fff;
    }
  }
}

.login-info {
  p {
    line-height: 28xp;
    font-size: 14px;
    color: #999;

    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.table1 {
  margin-top: 15px;
}

.box2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .box2-1 {
    width: 30%;
    // margin-left: 20px;
    margin-bottom: 20px;
    border: none;

    .icon {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }

    .detail {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .count {
        font-size: 40px;
      }

      .name {
        font-size: 16px;
        color: #999;
      }
    }
  }
}

.box3 {
  .box3-1 {
    height: 250px;
  }

  .box3-2 {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .box3-3 {
      height: 250px;
      width: 515px;
    }

    .box3-4 {
      width: 515px;
      height: 250px;
    }
  }
}
</style>
