<template>
  <div>
    <el-dialog title="面试人信息" :visible.sync="isShow" @close="close">
      <el-form :model="formData" :rules="rules" ref="form">
        <el-form-item label="名称" label-width="100px" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addInterviewer, updateInterviewer } from "@/api/user";

export default {
  props: {
    userDialogVisible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {
        id: 0,
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    isShow: {
      get() {
        return this.userDialogVisible;
      },
      set(val) {
        this.$emit('update:userDialogVisible', val);
      }
    }
  },
  watch: {
    info: {
      immediate: true,
      handler(val) {
        this.formData = { ...val };
      },
      deep: true
    }
  },
  methods: {
    close() {
      this.formData = {
        id: 0,
        username: '',
        password: ''
      };
      this.isShow = false;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (!valid) return;

        const payload = { ...this.formData };
        const id = payload.id;

        const action = id > 0 ? updateInterviewer : addInterviewer;
        action(payload).then(res => {
          if (res.code === 1) {
            this.$message.success(id > 0 ? "修改成功" : "添加成功");
            this.close();
            this.$parent.getUserList();
            this.$emit('refresh');
          } else {
            this.$message.error(res.msg);
          }
        });
      });
    }
  }
};
</script>

<style>
/* 可按需添加样式 */
</style>
