<template>
  <div class="router-view-container" style="flex: 1; min-height: calc(100% - 60px);">
    <!-- 新增搜索栏 -->
<!--    <div style="width: 100% ;max-height: 50px; display: flex;">-->
<!--      <el-input style="max-width: 200px" v-model="queryInfo.name" placeholder="姓名搜索" clearable></el-input>-->
<!--      <el-input style="max-width: 200px;margin-left: 10px" v-model="queryInfo.genderName" placeholder="性别搜索" clearable></el-input>-->
<!--      <el-input style="max-width: 200px;margin-left: 10px" v-model="queryInfo.email" placeholder="邮箱搜索" clearable></el-input>-->
<!--      <el-input style="max-width: 200px;margin-left: 10px" v-model="queryInfo.address" placeholder="地址搜索" clearable></el-input>-->
<!--      <el-button style="margin-left: 10px" type="primary" @click="handleSearch">搜索</el-button>-->
<!--      <el-button style="margin-left: 10px" type="primary" @click="edit">新建</el-button>-->
<!--    </div>-->
    <el-table
      :data="userList"
      empty-text="暂无数据"
    >
      <el-table-column type="index" label="序号" min-width="50px"></el-table-column>
      <el-table-column prop="username" label="姓名" min-width="80px"></el-table-column>
      <el-table-column label="操作" min-width="80px">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-button type="text" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页区域-->
    <el-button style="margin-left: 10px" type="text" @click="add">添加面试人</el-button>
    <!-- 新增分页容器 -->
    <div class="pagination-container">
      <el-pagination
        style="float: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <user-dialog v-if="userDialogVisible" :userDialogVisible.sync="userDialogVisible" :info="info"></user-dialog>
    <user-add-dialog v-if="userAddDialogVisible" :userAddDialogVisible.sync="userAddDialogVisible" :info="info"></user-add-dialog>
  </div>
</template>

<script>
import {delInterviewer, pageInterviewers} from "@/api/user";
import UserDialog from "@/views/components/userDialog.vue";
import {applicantDelete} from "@/api/applicant";
import UserAddDialog from "@/views/components/userAddDialog.vue";
export default {
  name: 'HelloWorld',
  components: {UserAddDialog, UserDialog},
  data() {
    return {
      userList: [], // 用户列表
      total: 0, // 用户总数
      // 获取用户列表的参数对象
      queryInfo: {
        pageNo: 1,
        pageSize: 5,
      },
      info:{
        name: '',
      },
      userDialogVisible: false,
      userAddDialogVisible: false
    }
  },
  created() { // 生命周期函数
    this.getUserList()
  },
  methods: {
    // 监听 pageSize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pageSize = newSize;
      // 重新发起请求用户列表
      this.getUserList();
    },
    // 监听 当前页码值 改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.page = newPage;
      // 重新发起请求用户列表
      this.getUserList();
    },
    // 新增搜索方法
    handleSearch() {
      this.queryInfo.page = 1; // 重置到第一页
      this.getUserList();
    },
    getUserList() {
      pageInterviewers(this.queryInfo)
        .then((res) => {
          if (res.code === 1) {
            //用户列表
            this.userList = res.data.records;
            this.total = res.data.total;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(row){
      if (row){
        console.log(row)
        this.info = {
          id: row.id,
          username: row.username,
        }
      }else{
        this.info = {
          id: 0,
          username: '',
        }
      }
      this.userDialogVisible = true
    },
    del(id){
      delInterviewer(id).then((res) => {
        if (res.code === 1) {
          this.$message.success(res.message);
          this.getUserList();
          this.$emit('refresh');
        } else {
          this.$message.error(res.message);
        }
      })
    },
    add(){
      this.userAddDialogVisible = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination-container {
  margin-top: auto; /* 关键布局属性 */
  padding-top: 20px;
  background: #fff;
  border-top: 1px solid #ebeef5;
  position: sticky;
  bottom: 0;
  z-index: 1;
}
.router-view-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 60px); /* 调整高度计算 */
}
.el-table__empty-block {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 50vh; /* 设置高度以居中显示 */
}
</style>
