<template>
  <div class="router-view-container" style="flex: 1; min-height: calc(100% - 60px);">
    <!-- 新增搜索栏 -->
    <div style="width: 100% ;max-height: 50px; display: flex;">
      <el-input style="max-width: 200px" v-model="queryInfo.name" placeholder="姓名搜索" clearable></el-input>
      <el-input style="max-width: 200px;margin-left: 10px" v-model="queryInfo.phone" placeholder="联系电话搜索" clearable></el-input>
      <el-input style="max-width: 200px;margin-left: 10px" v-model="queryInfo.email" placeholder="邮箱搜索" clearable></el-input>
      <el-date-picker
      v-model="searchDateTimeRange"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
      <el-input style="max-width: 200px;margin-left: 10px" v-model="queryInfo.interviewerName" placeholder="面试人姓名搜索" clearable></el-input>
      <el-button style="margin-left: 10px" type="primary" @click="handleSearch">搜索</el-button>
<!--      <el-button style="margin-left: 10px" type="primary" @click="edit">新建</el-button>-->
    </div>
    <el-table
      :data="userList"
      height="250"
    >
      <el-table-column type="index" label="序号" min-width="50px"></el-table-column>
      <el-table-column label="姓名" min-width="80px">
        <template slot-scope="scope">
          <el-link type="primary" @click="edit(scope.row)">{{scope.row.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" min-width="80px"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="100px"></el-table-column>
      <el-table-column prop="interviewTime" label="应聘时间" min-width="100px"></el-table-column>
      <el-table-column label="评价状态" min-width="80px">
        <template slot-scope="scope">
          <el-tag :type="scope.row.evaluation ? 'success' : 'warning'">
            {{ scope.row.evaluation ? '已评价' : '未评价' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="80px">
         <template slot-scope="scope">
           <el-button type="text" @click="edit(scope.row)">编辑</el-button>
           <el-button type="text" @click="del(scope.row.id)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
    <div>
        <el-button style="margin-left: 10px" type="text" @click="add">添加应聘者信息</el-button>
    </div>
    <!--分页区域-->

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
    <applicant-dialog v-if="visible" :visible.sync="visible" :info="info"></applicant-dialog>
    <applicant-add-dialog v-if="applicantAddVisible" :applicantAddVisible.sync="applicantAddVisible" :info="info"></applicant-add-dialog>
  </div>
</template>

<script>
import {applicantDelete, applicantPage} from "@/api/applicant";
import ApplicantDialog from "@/views/components/applicantDialog.vue";
import ApplicantAddDialog from "@/views/components/applicantAddDialog.vue";
import dayjs from "dayjs";
export default {
  name: 'HelloWorld',
  computed: {
    ApplicantAddDialog() {
      return ApplicantAddDialog
    }
  },
  components: {ApplicantAddDialog, ApplicantDialog},
  data() {
    return {
      userList: [], // 用户列表
      total: 0, // 用户总数
      // 获取用户列表的参数对象
      queryInfo: {
        name : '',
        phone : '',
        email : '',
        interviewerTimeStart : '',
        interviewerTimeEnd : '',
        interviewerName : '',
        interviewerFlag : false,
        page: 1,
        pageSize: 5,
      },
      info:{
        id: 0,
        name: '',
        gender: null,
        birthTime: '',
        graduateTime: '',
        phone: '',
        email: '',
        address:  '',
        resumePath: '',
      },
      visible: false,
      applicantAddVisible: false,
      searchDateTimeRange:[]
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
      // const formatDate = (date) => {
      //   return date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '';
      // };
      // this.queryInfo.interviewerTimeStart = formatDate(this.searchDateTimeRange[0])
      // this.queryInfo.interviewerTimeEnd = formatDate(this.searchDateTimeRange[1])
      if(this.searchDateTimeRange != null){
        this.queryInfo.interviewerTimeStart = this.searchDateTimeRange[0]
        this.queryInfo.interviewerTimeEnd = this.searchDateTimeRange[1]
      }
      this.queryInfo.interviewerFlag = this.$store.state.user.type === 20
      applicantPage(this.queryInfo)
        .then((res) => {
          if (res.code === 1) {
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
          name: row.name,
          gender: row.gender,
          birthTime: row.birthTime,
          graduateTime: row.graduateTime,
          phone: row.phone,
          email: row.email,
          address:  row.address,
          resumePath: row.resumePath,
          interviewerId: row.interviewerId,
          interviewerName: row.interviewerName,
          evaluation: row.evaluation,
        }
      }else{
        this.info = {
          id: 0,
          name: '',
          gender: null,
          birthTime: '',
          graduateTime: '',
          phone: '',
          email: '',
          address:  '',
          resumePath: '',
        }
      }
      this.visible = true
    },
    add(){
      this.info = {
        id: 0,
        name: '',
        gender: null,
        birthTime: '',
        graduateTime: '',
        phone: '',
        email: '',
        address:  '',
        resumePath: '',
      }
      this.visible = true
    },
    del(id){
      applicantDelete(id).then((res) => {
        if (res.code === 1) {
          this.$message.success(res.message);
          this.getUserList();
          this.$emit('refresh');
        } else {
          this.$message.error(res.message);
        }
      })
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
</style>
