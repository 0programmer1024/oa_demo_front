<template>
  <div>
    <el-dialog title="编辑应聘人信息" :visible.sync="isShow" @close="close">
      <!-- 表单内容保持不变 -->
      <el-form v-model="info">
        <el-form-item label="姓名" label-width="100px">
          <el-input :disabled="type !== 10" v-model="info.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px" style="display: table">
        <el-select :disabled="type !== 10" v-model="info.gender" placeholder="请选择性别">
            <el-option v-for="item in genders" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" label-width="100px" style="display: table">
           <el-date-picker
                v-model="info.birthTime"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                :disabled="type !== 10"
                value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="毕业日期" label-width="100px" style="display: table">
              <el-date-picker
                v-model="info.graduateTime"
                type="datetime"
                placeholder="选择日期时间"
                :disabled="type !== 10"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" label-width="100px">
          <el-input  :disabled="type !== 10" v-model="info.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input  :disabled="type !== 10" v-model="info.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="居住地" label-width="100px">
          <el-input  :disabled="type !== 10" v-model="info.address" placeholder="请输入居住地"></el-input>
        </el-form-item>

        <el-form-item label="简历" label-width="100px" style="display: table">
          <template v-if="info.resumePath" >
            <el-button type="text" @click = "download">{{info.resumePath}}</el-button>
          </template>
          <el-upload
            v-else
            class="upload-demo"
            drag
            :disabled="type !== 10"
            action="http://localhost:8088/api/common/upload"
            :on-success = "handlerSuccess"
            :on-error= "handleError"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="面试人" label-width="100px" style="display: table">
          <el-select
            v-model="info.interviewerId"
            filterable
            remote
            :disabled="type !== 10"
            reserve-keyword
            placeholder="请输入姓名搜索"
            :remote-method="loadInterviewers"
            :loading="loading"
            @focus="loadInterviewers('')"
          >
            <el-option v-for="item in interviewers" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评价" label-width="100px">
          <el-input  type="textarea" rows="5" v-model="info.evaluation" placeholder="请输入评价"></el-input>
        </el-form-item>
      </el-form>

      <!-- 修改底部按钮布局 -->
      <div slot="footer" class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


import {download} from "@/api/common";
import {queryInterviewers} from "@/api/user";
import {applicantAdd, applicantUpdate} from "@/api/applicant";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      id: '',
      name: '',
      gender: null,
      birthTime: '',
      graduateTime: '',
      phone: '',
      email: '',
      address:  '',
      resumePath: '',
    }
  },
  computed: {
    isShow: {
      get(){
        return this.visible
      },
      set(val){
        this.$emit('update:visible',val)
      }
    },
    type() {
      return this.$store.state.user.type
    }
  },
  mounted() {
  },
  data() {
    return {
      genders : [
        {
          label: '男',
          value: true
        },
        {
          label: '女',
          value: false
        },
        {
          label: '未知',
          value: null
        }
      ],
      interviewers : [],
      loading: false,
      interviewerQuery :{
        name : ''
      }
    };
  },
  created() { // 生命周期函数
    this.loadInterviewers()
  },
  methods: {
    close(){
      this.isShow = false
    },
    submit(){
      console.log(this.info)
      let id = this.info.id;
      if(id > 0){
        applicantUpdate(this.info).then(res => {
          if(res.code === 1){
            this.$message.success("修改成功");
            this.close()
            this.$parent.getUserList()
            this.$emit('refresh')
          }else{
            this.$message.error(res.message);
          }
        })
      }else{
        applicantAdd(this.info).then(res => {
          if(res.code === 1){
            this.$message.success("添加成功");
            this.close()
            this.$parent.getUserList()
            this.$emit('refresh')
          }else{
            this.$message.error(res.message);
          }
        })
      }
    },
    handlerSuccess(response, file, fileList) {
      console.log("上传成功,path:" + response.data);
      this.$message.success("文件上传成功");
      this.info.resumePath = response.data;
    },
    handleError(err, file, fileList) {
      console.error("上传失败！", err);
      this.$message.error("文件上传失败");
    },
    download(){
      const url = 'http://localhost:8088/api/common/download?name=' + this.info.resumePath;
      // download({name : this.info.resumePath})
      window.open(url);
    },
    loadInterviewers(name){
      this.loading = true;
      queryInterviewers({ name: name }).then(res => {
        if (res.code === 1) {
          this.interviewers = res.data;
          this.loading = false;
        } else {
          this.$message.error(res.message);
        }
      })
    }
  }
}
</script>
<style>

</style>
