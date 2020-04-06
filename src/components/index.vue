<template>
  <div class="content">
    <el-row style="height:100%">
      <el-col :span="5" style="height:100%">
        <div class="lift_content">
          <div class="left_title">Push service APIDemo</div>
          <el-input
            v-model="inputData"
            placeholder="请输入内容"
            type="text"
            class="input-with-select left_input"
            size="mini"
          >
            <el-button slot="append" type="primary" icon="el-icon-search" @click="goSearch()"></el-button>
          </el-input>
          <el-divider></el-divider>
          <el-table :data="tableData" :show-header="showHeader" @row-click="goClickRow($event)">
            <el-table-column prop="date"></el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="5" style="height:100%">
        <div class="mid_content">
          <div class="mid_content_top" v-text="bigTitle"></div>
          <el-divider></el-divider>
          <div class="mid_content_bot">
            <el-form label-position="top" :model="validateForm" ref="formDom" class="demo-dynamic">
              <el-form-item
                v-for="(item, index) in validateForm.domains"
                :label="item.codename"
                :key="index"
                :prop="'domains.' + index + '.value'"
                  :rules="{
                  required: item.required ? true : false, message: item.fullMessage, trigger: 'blur'
                }"
              >
                <el-input v-model="item.value" style="width:260px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm()" class="btn" type="primary">发起调用</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="14" style="height:100%">
        <div class="right_content">
          <el-tabs type="border-card">
            <el-tab-pane label="Example Code">
              <div class="dome" v-html="exampleCode"></div>
            </el-tab-pane>
            <el-tab-pane label="Debugging Result">
              <div v-html="debugResult"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fromByLevel } from './http'
const jsonData = require('./data.json')
export default {
  data () {
    return {
      inputData: '',
      showHeader: false,
      tableData: [],
      formData: [],
      debugResult: '', //调用结果
      bigTitle: '', //标题
      exampleCode: '', //示例代码
      validateForm: {
        domains: []
      },
    }
  },
  mounted () {
    //发请求 
    this.tableData=jsonData.interfaceList; //获取表格数据
    this.formData =jsonData.interfaceListInfo; //获取表单数据
    this.goClickRow(0); //页面初始化
   },
  methods: {
    // 搜索功能
    goSearch () {
      if (this.inputData) {
        // 去搜索
        console.log(this.inputData)
        // 响应成功后
        this.inputData = null
      }
    },
    //点击行
    goClickRow (f) {
       this.$refs.formDom.resetFields(); //重置表单和验证
      if (f === 0) { //页面初始化默认选中第一项
        this.validateForm.domains = this.formData[0].args; // 表单项
        this.bigTitle = this.tableData[0].date; //标题和参数1
        this.exampleCode = this.tableData[0].utilCode; //示例代码
      }
      this.formData.forEach((item) => {
        if (f.key === item.key) {
          this.validateForm.domains = item.args
          this.bigTitle = f.date
          this.exampleCode = f.utilCode
        }
      })
    },
    //发起调用功能
    submitForm () {
      this.$refs.formDom.validate(async (valid) => {
        if (valid) {
          const params = {}; //参数2
          this.validateForm.domains.forEach((item) => {
            params[item.codename] = item.value
          })
          let {data} = await fromByLevel(this.bigTitle, params)
          if(data.code !==0)return this.$message.error('调用失败')
          this.debugResult = data;
        }
      })
    }
  }
}
</script>

<style scoped>
.content {
  height: 100%;
  margin: 10px;
  background-color: #fff;
}
.content .lift_content {
  height: 100%;
  background-color: #eee;
  border: 1px solid #ccc;
  border-top: none;
  position: relative;
}
.content .mid_content {
  height: 100%;
  background-color: #fff;
}
.content .right_content {
  height: 100%;
  background-color: red;
}
.left_title {
  position: absolute;
  top: 16px;
  left: 80px;
  font-size: 20px;
}
.left_input {
  width: 70%;
  margin: 50px 0px 14px 78px;
}
.content /deep/ .el-divider--horizontal {
  margin: 0px;
}
.content /deep/ .el-table td,
.el-table th.is-leaf {
  border-bottom: none;
}
.content /deep/ .lift_content td {
  background-color: #eee;
}
.content /deep/ .el-form--label-top .el-form-item__label {
  padding: 0;
}
.content /deep/ .el-form-item {
  margin-bottom: 0;
}
.content /deep/ .el-input-group__append button.el-button,
.el-input-group__append div.el-select .el-input__inner,
.el-input-group__append div.el-select:hover .el-input__inner,
.el-input-group__prepend button.el-button,
.el-input-group__prepend div.el-select .el-input__inner,
.el-input-group__prepend div.el-select:hover .el-input__inner {
  background-color: #409eff;
  color: #fff;
}
.content /deep/ .el-input--mini .el-input__inner {
  height: 40px;
}
.btn {
  margin-left: 162px;
  margin-top: 20px;
}
.mid_content_top {
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-weight: 800;
}
.content /deep/ .el-form-item__content {
  margin-left: opx;
}
.mid_content_bot {
  margin-left: 20px;
  position: relative;
}
.el-icon-question {
  position: absolute;
  top: 13px;
  left: 57px;
}
</style>
<style lang="scss">
.content .right_content {
  .el-tab-pane {
    div {
      height: calc(100vh - 79px);
    }
  }
}
</style>
