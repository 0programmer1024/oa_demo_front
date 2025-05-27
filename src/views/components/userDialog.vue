<template>
  <div>
    <el-dialog title="面试人信息" :visible.sync="isShow" @close="close">
      <!-- 表单内容保持不变 -->
      <el-form v-model="info">
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="info.username" placeholder="请输入用户姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="info.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
      </el-form>

      <!-- 修改底部按钮布局 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {updateInterviewer} from "@/api/user";
export default {
  props: {
    userDialogVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: {}
    }
  },
  computed: {
    isShow: {
      get(){
        return this.userDialogVisible
      },
      set(val){
        this.$emit('update:userDialogVisible',val)
      }
    }
  },
  mounted() {
  },
  data() {
    return {
    };
  },
  methods: {
    close(){
      this.info = {
        id: 0,
        name: '',
        genderName: '',
      }
      this.isShow = false
    },
    submit(){
      console.log(this.info)
      updateInterviewer(this.info).then(res => {
        if(res.code === 1){
          this.$message.success("修改成功");
          this.close()
          this.$parent.getUserList()
          this.$emit('refresh')
        }else{
          this.$message.error(res.message);
        }
      })
    }
  }
}
</script>
<style>

</style>
