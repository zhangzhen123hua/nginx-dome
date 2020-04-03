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
            :highlight-current-row="currentHighLight"
            :current-row-key="currentKey"
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
          <div class="mid_content_top" v-text="bigTitle" ></div>
          <el-divider></el-divider>
          <div class="mid_content_bot">
             <!-- <el-popover
              placement="right-end"
              width="400"
              trigger="hover"
              content="国内邮箱地址：@邮箱地址，例如*********@qq.com。
支持对多个邮箱发送邮件，邮箱之间以英文逗号（,）分隔。上限为5个邮箱地址。批量调用相对于单条调用及时性稍有延迟。
说明 本接口实际使用支持批量邮箱调用。但测试demo仅支持单个邮箱调用">
               <i class="el-icon-question" slot="reference"></i>
            </el-popover> -->
            <el-form label-position="top" :model="validateForm" ref="formDom"  class="demo-dynamic">
                <el-form-item
                  v-for="(item, index) in validateForm.domains"
                  :label="item.name"
                  :key="index"
                >
                <el-input v-model="item.value" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  @click="submitForm('formDom')" class="btn" type="primary" >发起调用</el-button>
                </el-form-item>
            </el-form>
           
          </div>
        </div>
      </el-col>
      <el-col :span="14" style="height:100%">
        <div class="right_content">
          <el-tabs type="border-card">
            <el-tab-pane label="示例代码">
              <div class="dome">
                <iframe  width="100%" height="100%"  :src="'./../../'+iframeUrl+'.html'" frameborder="0"></iframe>
              </div>
            </el-tab-pane>
            <el-tab-pane label="调试结果"><div v-html="debResult"></div></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
  
</template>

<script>
import{fromByLevel}from './http';
export default {
   data(){
     return{
      inputData:null,
      showHeader:false,
      tableData:[],
      formData:[],
      position:'top',
      debResult:'',
      liftData:'',
      bigTitle:'',
      validateForm: {
        domains:[]
      },
      iframeUrl:'',
      currentKey:'',
      currentHighLight:true
     }
   },
   mounted(){
     this.gitTableData();
     this.goRow(0);
   },
   methods:{
    gitTableData(){
      //列表数据
      return (this.tableData=[
        { 
          key:0,
          date: 'sendMail.callback',
          htmlName:'sendMail'
        },
        {
          key:1,
          date: 'sendShortMessagingToUser.callback',
          htmlName:'sortMessage'
        },
        {
          key:2,
          date: 'sendDing.callback',
          htmlName:'ding'
        },
        {
          key:3,
          date:'sendJpushToUser.callback',
          htmlName:'help'
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
      const result =[
      //邮箱  
      {
        key:0,
        domains:[
        {
          value: '',
          key:0,
          name:'邮箱'
        },{
          value: '',
          key:1,
          name:'标题'
        },{
          value: '',
          key:2,
          name:'邮箱内容'
        }]
      },
      //短信
        {
          key:1,
          domains:[
            {
              value: '',
              key:0,
              name:'接受手机号'
            },{
              value: '',
              key:1,
              name:'处理人手机号'
            },{
              value: '',
              key:2,
              name:'短信内容'
            }
          ]
        },
       //钉钉
        {
          key:2,
          domains:[
            {
              value: '',
              key:0,
              name:'钉钉手机号'
            },{
              value: '',
              key:1,
              name:'钉钉件标题'
            },{
              value: '',
              key:2,
              name:'钉钉内容'
            },{
              value: '',
              key:3,
              name:'群组'
            },{
              value: '',
              key:4,
              name:'是否群发'
            }
          ]
        },
        //极光
        {
          key:3,
          domains:[
            {
              value: '',
              key:0,
              name:'手机号'
            },{
              value: '',
              key:1,
              name:'推送内容'
            }
          ]
        }
      ];
      if(f===0){
        this.validateForm.domains=result[0].domains;
        this.bigTitle=this.tableData[0].date;
        this.iframeUrl=this.tableData[0].htmlName;
        this.currentKey=this.tableData[0].key;
      }
      result.forEach((item)=>{
        if(f.key===item.key){
          this.validateForm.domains=item.domains;
          this.bigTitle=f.date;
          this.iframeUrl=f.htmlName;
          this.currentKey=f.key
        }
      })
      this.liftData=f.date
      
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params={};
          this.validateForm.domains.forEach((item)=>{
             params[item.name]=item.value
          })
          let res = await fromByLevel( this.liftData,params )
          this.debResult = res.data
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
  font-size: 20px;
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
.content /deep/ .lift_content .current-row td{
  background-color: #ecf5ff;
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
  position: relative;
}
.el-icon-question{
   position: absolute;
  top: 13px;
  left: 57px;
}
/* .content /deep/ span{
  position: absolute;
  top: 10px;
  left: 57px;
} */
.dome p{
  text-align: center;
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
