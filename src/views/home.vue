<template>
  <el-container style="height: 100vh;">
    <!-- 顶部 -->
    <el-header style="height: 60px; border-bottom: 1px solid #eee; z-index: 2; box-shadow: 0 2px 12px rgba(0,0,0,0.1)">
      <span class="head-title">简易人事管理系统</span>
      <el-avatar
        icon="el-icon-user-solid"
        style="position: absolute; right: 40px; top: 10px; background: #f5f7fa"
      ></el-avatar>
    </el-header>

    <!-- 主体 -->
    <el-container style="height: calc(100vh - 60px);">
      <!-- 侧边栏 -->
      <el-aside width="250px" style="border-right: 1px solid #f0f0f0;">
        <el-menu
          :default-active="$route.path"
          router
          text-color="#333"
          active-text-color="#409EFF"
          style="height: 100%"
        >
          <el-menu-item
            index="/applicant"
          >
            <i class="el-icon-s-custom"></i>
            应聘人管理
          </el-menu-item>
          <el-menu-item
            index="/user"
          >
            <i class="el-icon-s-custom"></i>
            面试人管理
          </el-menu-item>
          <el-menu-item
            v-if="type === 20"
            index="/amendPassword"
          >
            <i class="el-icon-s-custom"></i>
            修改密码
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main style="padding: 20px; height: 100%; display: flex; flex-direction: column;">
         <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
    };
  },
  computed: {
    type() {
      return this.$store.state.user.type
    }
  }
};
</script>
<style scoped>
.head-title {
  line-height: 60px;
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-left: 20px;
  float: left;
}

.el-main {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

</style>



