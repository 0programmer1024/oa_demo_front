<template>
  <div class="router-view-container" style="flex: 1; min-height: calc(100% - 60px);">
    <el-form v-model="info" >
      <el-form-item label="请输入新密码" label-width="100px">
        <el-input v-model="info.password" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-button style="margin-left: 10px" type="primary" @click="amendPassword">确认修改</el-button>
    </el-form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {updateInterviewer} from "@/api/user";
export default {
  name: 'HelloWorld',
  computed: {

  },
  components: {},
  data() {
    return {
      info:{
        id: 0,
        password: ''
      },
    }

  },
  created() {

  },
  methods: {
    amendPassword() {
      const user = this.$store.state.user
      if(user == null){
        this.$message.error('鉴权失败，用户未登录，无法修改密码');
      }
      this.info.id = user.id
      updateInterviewer(this.info).then(res => {
        if(res.code === 1){
          this.$message.success("密码修改成功, 请重新登录");
          Cookies.remove('Token');
          this.$store.commit('SET_TOKEN', null);
          this.$store.commit('SET_USER', null);
          this.$router.push('/login');
        }else{
          this.$message.error(res.msg);
        }
      })
    },
  }
}
</script>
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
