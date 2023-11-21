<template>
  <div class="userinfo">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <span>
        <el-form
          ref="form1"
          :model="form1"
          :inline="true"
          label-position="right"
          label-width="80px"
          :rules="rules1"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form1.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input
              v-model="form1.age"
              type="number"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form1.sex" placeholder="请选择性别" clearable>
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="date">
            <el-date-picker
              v-model="form1.date"
              placeholder="请选择日期"
              class="picker-width"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input
              v-model="form1.address"
              placeholder="请输入地址"
            ></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="onSubmit1">确 定</el-button>
      </span>
    </el-dialog>
    <div class="user1">
      <el-button type="primary " @click="newhand" size="small">+新增</el-button>

      <el-form :inline="true" :model="from2" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="from2.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="from2.sex" placeholder="请选择性别" clearable >
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit2">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div></div>
    <el-table :data="tabledata1" style="width: 100%" height="85%"  stripe>
       
      <el-table-column
      sortable
        :prop="key"
        :label="val"
        v-for="(val, key) in tablelable"
      >
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div
      style="
        display: flex;
        justify-content: right;
        margin-top: 20px;
        margin-right: 20px;
      "
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="curr"
        :page-sizes="[20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
        background
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import userinfo from "@/assets/userinfo";
import { getuser,adduser,deluser,edituser } from "@/api/index";
export default {
  data() {
    return {
      title: "",
      dialogVisible: false,
      userinfo: userinfo,
      form1: {
        name: "",
        age: "",
        sex: "",
        date: "",
        address: "",
      },
      rules1: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          // { type: "number", min: 18, message: "必须年满18岁", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        date: [{ required: true, message: "请选择日期", trigger: "change" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
      tabledata1: [],
      tablelable: {},// 表头

      curr: 1, //分页
      limit: 20,
      count: 20,
      typemodel: "1", //1新增 2：编辑
      from2: {
        name: "",
        sex: "",
      },
    };
  },
  methods: {
    //新增按钮
    newhand() {
      //打开弹窗
      this.dialogVisible = true;
      //修改标题
      this.title = "新增用户";
      //重置校验提示
      
      this.from1={};
      
      this.typemodel = 1;
    },
    //提交数据
    onSubmit1() {
      // this.dialogVisible = false

      this.$refs.form1.validate((valid) => {
        if (valid) {
          if (this.typemodel == 1) {
            console.log("新增");
            adduser({params:this.form1}).then((res) => {
              this.getlist();
            });
          } else {
            console.log("修改");
            edituser({params:this.form1}).then((res) => {
              this.getlist();
            });
          }

          //校验通过关闭弹窗
          this.dialogVisible = false;
          //清空表单校验
          this.$refs.form1.resetFields();
        } else {
          return false;
        }
      });
    },
    //取消按钮
    handleClose() {
      //关闭弹窗
      this.dialogVisible = false;
      //重置校验提示
      this.$refs.form1.resetFields();
    },
    //点击x关闭弹窗
    cancel() {
      this.handleClose();
    },
    //编辑按钮
    handleEdit(index, row) {
      this.dialogVisible = true;
      
      //修改标题
      this.title = "修改用户";
      this.typemodel = 2;
      this.form1=JSON.parse(JSON.stringify(row));
      console.log(index, row);
    },
    //删除按钮
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deluser({ params:{id: row.id }}).then((res) => {
            
            this.getlist();
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分页改变
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.limit = val;
      this.getlist()
    },
    //分页跳转
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.curr = val;
      this.getlist()
    },
    //查询
    onSubmit2() {
      console.log("submit!");
      this.getlist();
    },
    getlist() {
      getuser({ params:{...{limit:this.limit,curr:this.curr},...this.from2 }}).then((res) => {
        const { tabledata, tablelable } = res.data.data;
        this.tabledata1 = tabledata.data; 
        this.tablelable = tablelable;
        this.count = tabledata.count || 0;
      });
    },
  },
  mounted() {
    this.getlist();
  },
};
</script>
<style lang="less" scoped>
.userinfo {
  height: 95%;
}

.user1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>