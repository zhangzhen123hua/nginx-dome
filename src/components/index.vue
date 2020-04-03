<template>
  <div class="content">
    <el-row style="height:100%">
      <el-col :span="5" style="height:100%">
        <div class="lift_content ">
          <div class="left_title">Push service APIDemo</div>
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
            <el-tab-pane label="Example Code">
              <div class="dome" v-html="exampleCode">
              </div>
            </el-tab-pane>
            <el-tab-pane label="Debugging Result"><div v-html="debResult"></div></el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
  
</template>

<script>
import { fromByLevel } from './http'
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
      exampleCode:'',
      validateForm: {
        domains: []
      }
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
          code:`<p>public class SendMail {</p><p>public static void main(String[] args) {Map<String, Object> jsonMap =new HashMap();//调用接口所需的参数</p></br><p>List<String> info = new ArrayList<String>();</p><p>info.add(\"*****@dddd.com\");</p><p>&nbsp;&nbsp;jsonMap.put(\"emailes\", info);//邮箱集合</p><p>jsonMap.put(\"title\",\"sssss\");//邮件标题</p><p>jsonMap.put(\"message\",\"fsadads\");//邮件内容</p><p>try {</p><p>String result =</p><p>LeanIotSendUtil.send(\"http://192.168.0.215:9001/interface/apidata \",</p><p>\"test\", \"123456\",</p><p>\"sendMail.callback\", \"\", jsonMap);</p><p>System.out.println(\"result:\"+result);</p><p>} catch (Exception e) {</p><p>e.printStackTrace();</p><p>}</p><p>}</p><p>}</p>`
        },
        {
          key:1,
          date: 'sendShortMessagingToUser.callback',
          code:`<p>public class SendMail {</p><p>public static void main(String[] args) {Map<String, Object> jsonMap =new HashMap();//调用接口所需的参数</p></br><p>List<String> info = new ArrayList<String>();</p><p>info.add(\"12345678901\");</p><p>&nbsp;&nbsp;jsonMap.put(\"phoneNumber\", info);//接受手机号</p><p>jsonMap.put(\"alarmPhone\",\"12345678901\");//处理人手机号</p><p>jsonMap.put(\"message\",\"fsadads\");//短信内容</p><p>try {</p><p>String result =</p><p>LeanIotSendUtil.send(\"http://192.168.0.215:9001/interface/apidata \",</p><p>\"test\", \"123456\",</p><p>\"sendShortMessagingToUser.callback\", \"\", jsonMap);</p><p>System.out.println(\"result:\"+result);</p><p>} catch (Exception e) {</p><p>e.printStackTrace();</p><p>}</p><p>}</p><p>}</p>`        },
        {
          key:2,
          date: 'sendDing.callback',
          code:`<p>public class SendMail {</p><p>public static void main(String[] args) {Map<String, Object> jsonMap =new HashMap();//调用接口所需的参数</p></br><p>List<String> info = new ArrayList<String>();</p><p>info.add(\"12345678901\");</p><p>&nbsp;&nbsp;jsonMap.put(\"phones\", info);//钉钉手机号</p><p>jsonMap.put(\"title\",\"报警消息\");//钉钉件标题</p><p>jsonMap.put(\"message\",\"XX服务监测不到心跳，请查收\");//钉钉内容</p><p>jsonMap.put(\"tagId\",\"141\");//群组</p><p>try {</p><p>String result =</p><p>LeanIotSendUtil.send(\"http://192.168.0.215:9001/interface/apidata \",</p><p>\"test\", \"123456\",</p><p>\"sendMail.callback\", \"\", jsonMap);</p><p>System.out.println(\"result:\"+result);</p><p>} catch (Exception e) {</p><p>e.printStackTrace();</p><p>}</p><p>}</p><p>}</p>`     
        },
        {
          key:3,
          date:'sendJpushToUser.callback',
          code:`<p>public class SendMail {</p><p>public static void main(String[] args) {Map<String, Object> jsonMap =new HashMap();//调用接口所需的参数</p></br><p>List<String> info = new ArrayList<String>();</p><p>info.add(\"12345678901\");</p><p>&nbsp;&nbsp;jsonMap.put(\"phones\", info);//钉钉手机号</p><p>jsonMap.put(\"title\",\"报警消息\");//钉钉件标题</p><p>jsonMap.put(\"message\",\"XX服务监测不到心跳，请查收\");//钉钉内容</p><p>jsonMap.put(\"tagId\",\"141\");//群组</p><p>try {</p><p>String result =</p><p>LeanIotSendUtil.send(\"http://192.168.0.215:9001/interface/apidata \",</p><p>\"test\", \"123456\",</p><p>\"sendMail.callback\", \"\", jsonMap);</p><p>System.out.println(\"result:\"+result);</p><p>} catch (Exception e) {</p><p>e.printStackTrace();</p><p>}</p><p>}</p><p>}</p>`
        }
      ])
    },
    goSearch () {
      if (this.inputData) {
        // 去搜索
        console.log(this.inputData)
        // 响应成功后
        this.inputData = null
      }
    },
    goRow (f) {
      const result = [
      // 邮箱
        {
          value: '',
          key:0,
          name:'emailes',
        },{
          value: '',
          key:1,
          name:'title'
        },{
          value: '',
          key:2,
          name:'message'
        }]
      },
      //短信
        {
          key: 1,
          domains: [
            {
              value: '',
              key: 0,
              name: 'phoneNumber'
            }, {
              value: '',
              key: 1,
              name: 'alarmPhone'
            }, {
              value: '',
              key: 2,
              name: 'message'
            }
          ]
        },
        // 钉钉
        {
          key: 2,
          domains: [
            {
              value: '',
              key: 0,
              name: 'phones'
            }, {
              value: '',
              key: 1,
              name: 'title'
            }, {
              value: '',
              key: 2,
              name: 'message'
            }, {
              value: '',
              key: 3,
              name: 'tagId'
            }, {
              value: '',
              key: 4,
              name: 'isAtAll'
            }
          ]
        },
        // 极光
        {
          key: 3,
          domains: [
            {
              value: '',
              key: 0,
              name: 'phoneNumber'
            }, {
              value: '',
              key: 1,
              name: 'message'
            }
          ]
        }
      ];
      if(f===0){
        this.validateForm.domains=result[0].domains;
        this.bigTitle=this.tableData[0].date
        this.exampleCode=this.tableData[0].code;
      }
      result.forEach((item)=>{
        if(f.key===item.key){
          this.validateForm.domains=item.domains;
          this.bigTitle=f.date;
          this.exampleCode=f.code;
        }
      })
      this.liftData = f.date
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {}
          this.validateForm.domains.forEach((item) => {
            params[item.name] = item.value
          })
          let res = await fromByLevel(this.liftData, params)
          this.debResult = res.data
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
