<template>
  <div class="content">
    <el-row style="height:100%">
      <el-col :span="5" style="height:100%">
        <div class="lift_content ">
          <div class="left_title">推送服务</div>
          <el-input v-model="inputData"  placeholder="请输入内容" type="text" class="input-with-select left_input" size="mini">
            <el-button slot="append" type="primary" icon="el-icon-search"  @click="goSearch()"></el-button>
          </el-input>
          <el-divider></el-divider>
          <el-table
            :data="tableData"
            :show-header="showHeader"
            @row-click="goRow($event)"
           >
            <el-table-column
              prop="date"
             >
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="5" style="height:100%">
        <div class="mid_content">
          <div class="mid_content_top">发送邮件消息</div>
          <el-divider></el-divider>
          <div class="mid_content_bot">
            <el-form :label-position="position" :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                <!-- <el-form-item
                  v-for="(domain, index) in dynamicValidateForm.domains"
                  :label="domain.name"
                  :key="index"
                >
                <el-input v-model="domain.value" style="width:260px;"></el-input>
                </el-form-item> -->
                <el-form-item label="邮件地址">
                  <el-input style="width:260px;" v-model="valueOne"></el-input>
                </el-form-item>

                <el-form-item label="邮件标题">
                  <el-input style="width:260px;" v-model="valueTwo"></el-input>
                </el-form-item>

                <el-form-item label="邮件内容">
                  <el-input style="width:260px;" v-model="valueThree"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  @click="submitForm('dynamicValidateForm')" class="btn" type="primary" >发起调用</el-button>
                </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="14" style="height:100%">
        <div class="right_content">
          <el-tabs type="border-card">
            <el-tab-pane label="Example Code">
              <div v-text="exaCode"></div>
            </el-tab-pane>
            <el-tab-pane label="Debugging Result"><div v-html="debResult"></div></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
  
</template>

<script>
import{fromByLevel}from './http'
export default {
   data(){
     return{
       inputData:null,
       showHeader:false,
       tableData:[],
       formData:[],
       position:'top',
       debResult:'',
       exaCode:'',
       valueOne:'',
       valueTwo:'',
       valueThree:'',
        dynamicValidateForm: {
          domains: [
          {
            value: '',
            key:0,
            name:'邮件地址'
          },{
            value: '',
            key:1,
            name:'邮件标题'
          },{
            value: '',
            key:2,
            name:'邮件内容'
          },
          ]
        }
     }
   },
   mounted(){
     this.gitTableData();
     this.gitHtml();
   },
   methods:{
    gitTableData(){
      return (this.tableData=[
        { 
          id:0,
          date: '发送邮件消息',
        },
        {
           id:1,
          date: '发送邮件消息',
        }
        ])
    },
    goSearch(){
      if(this.inputData){
        //去搜索
        console.log(this.inputData);
        //响应成功后
        this.inputData=null;
      }
     
    },
    goRow(f){
      console.log(f.id)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let params ={
            emailes:[
              this.valueOne
              ],
            title:this.valueTwo,
            message:this.valueThree
          }
          let res = await fromByLevel(params)
          this.debResult = res.data
          // this.dynamicValidateForm.domains.forEach((item)=>{
          //     this.formData.push(item.value)
          // });
          // if(this.formData){
          //   console.log( this.formData);
          // }else{
            
          // }
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    gitHtml(){
      this.exaCode =`接收邮件的邮箱地址。
格式：国内邮箱地址：@邮箱地址，例如*********@qq.com。
支持对多个邮箱发送邮件，邮箱之间以英文逗号（,）分隔。上限为5个邮箱地址。批量调用相对于单条调用及时性稍有延迟。
说明 本接口实际使用支持批量邮箱调用。但测试demo仅支持单个邮箱调用`
    }
  }
 
}
</script>

<style scoped>
.content{
height: 100%;
margin: 10px;
background-color: #fff;
}
.content .lift_content{
  height: 100%;
  background-color: #eee;
  border: 1px solid #ccc;
  border-top: none;
  position: relative;

}
.content .mid_content{
  height: 100%;
  background-color: #fff;
}
.content .right_content{
   height: 100%;
   background-color: red;
}
.left_title{
  position: absolute;
  top: 16px;
  left: 80px;
}
.left_input{
  width: 70%;
  margin: 50px 0px 14px 78px;
}
.content /deep/ .el-divider--horizontal{
  margin: 0px;
}
 .content /deep/ .el-table td, .el-table th.is-leaf {
  border-bottom:  none;
}
.content /deep/ .lift_content td{
  background-color: #eee;
}
.content /deep/ .el-form--label-top .el-form-item__label{
  padding: 0;
}
.content /deep/ .el-form-item{
  margin-bottom: 0;
}
.content /deep/ .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner{
  background-color: #409EFF;
  color: #FFF;
}
.content /deep/ .el-input--mini .el-input__inner{
  height: 40px;
}
.btn{
  margin-left: 162px;
  margin-top: 20px;
}
.mid_content_top{
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-weight: 800;
}
.content /deep/ .el-form-item__content{
  margin-left: opx;
}
.mid_content_bot{
  margin-left: 20px;
}


</style>
<style lang="scss">
.content .right_content{
   .el-tab-pane{
    div{
      height:calc(100vh - 79px)
    }
  }
}
</style>
