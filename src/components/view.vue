<template>
  <div class="content">
  <!-- 头部区域 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect" 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF">
      <el-menu-item index="1"><a href="../../chanpinmenhu/project/project.html" target="_blank">首页</a></el-menu-item>
      <el-menu-item v-for="( item, index ) in serviceData " :key="index"  :index="index.toString()" v-text="item.cName"></el-menu-item>
    </el-menu>
  <!-- 内容区域 -->
    <el-row style="height:100%">
      <el-col :span="5" style="height:100%">
        <div class="lift_content ">
          <div class="left_title">推送服务</div>
          <el-input v-model="inputData"  placeholder="请输入内容" type="text" class="input-with-select left_input" size="mini">
            <el-button slot="append" type="primary" icon="el-icon-search"  @click="goSearch()"></el-button>
          </el-input>
          <el-divider></el-divider>
    <!-- 添加tree -->
          <div class="treeStructure">
            <el-tree :data="treeData"  node-key="id"  :default-expand-all="true" 
              ref="tree" :default-checked-keys="[2]"  :props="defaultProps" @node-click="handleNodeClick($event)"></el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="5" style="height:100%">
        <div class="mid_content">
          <div class="mid_content_top" v-text="bigTitle" ></div>
          <el-divider></el-divider>
          <div class="mid_content_bot">
            <el-form label-position="top" :model="validateForm" ref="formDom"  class="demo-dynamic">
                <el-form-item
                  v-for="(item, index) in validateForm.domains"
                  :label="item.cName"
                  :key="index"
                  :prop="'domains.' + index + '.value'"
                  :rules="{
                  required: item.required ? true : false, message: item.fullMessage, trigger: 'blur'
                  }"
                >
                <el-input v-model="item.value" style="width:260px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button  @click="submitForm()" class="btn" type="primary" >发起调用</el-button>
                </el-form-item>
            </el-form>
           
          </div>
        </div>
      </el-col>
      <el-col :span="14" style="height:100%">
        <div class="right_content">
          <el-tabs type="border-card">
            <el-tab-pane label="参数说明">
              <div class="dome">
                <iframe  width="100%" height="100%"  :src="'./../../'+iframeUrl+'.html'" frameborder="0"></iframe>
              </div>
            </el-tab-pane>
            <el-tab-pane label="调试结果"><div v-html="debugResult"></div></el-tab-pane>
            <el-tab-pane label="使用说明">
              <div>
                <iframe  width="100%" height="100%"  :src="'./../../'+instructions+'.html'" frameborder="0"></iframe>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import{serviceByLevel, ModelByLevel, formByLevel, formSubmitByLevel}from './http'
export default {
   data(){
     return{
      serviceData:'', //服务数据
      inputData:'',
      formData:[],
      debugResult:'', //调用结果
      iframeUrl:'',  //参数说明 
      instructions:'', // 使用说明
      bigTitle:'', //标题
      validateForm: {
        domains:[]
      },
      activeIndex:'2',//默认选中第一项
      treeData:[],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
     }
   },
   mounted(){
    this.getServiceData();//初始化服务
    this.getModelData(); //初始化模块
    this.handleNodeClick({id:2,label:'sendShortMessagingToUser.callback'}) //初始化选中的tree节点
   },
   methods:{
     //查询服务
    async getServiceData(){
      let {data:{code,data}} = await serviceByLevel();
      if(code !==0) return this.$message.error('获取服务失败...')
      this.serviceData=data.items;
    },
     //查询模块
    async getModelData(key){
      key = key || 2
      const params={id:key} 
      let {data:{code,data}} = await ModelByLevel(params);
      if(code !==0) return this.$message.error('获取服务失败...');
      var obj ={};
      obj.id =data.id;
      obj.label=data.cName;
      obj.children=[];
      data.baseFunctionVos.forEach((item)=>{
        obj.children.push({id:item.id,label:item.eName})
      })
      this.treeData.push(obj);
    },
     //点击头部导航
    handleSelect(key){
      this.getModelData(key);
    },
     //点击tree节点
    async handleNodeClick(e){
        this.$refs.formDom.resetFields(); //重置表单和验证
        let {data:{code,data}} = await formByLevel(e);
        if(code !==0) return this.$message.error('获取服务失败...');
        if(!e.children){
          this.bigTitle=e.label;
          this.validateForm.domains=data.items;
        }
        const dome =e.label;
        switch (dome) {
          case 'sendShortMessagingToUser.callback':
            this.iframeUrl='sortMessage'
            this.instructions='help'
            break;
          case 'sendMail.callback':
            this.iframeUrl='sendMail'
             this.instructions='jpushHelp'
            break;
        }
    },
    //搜索功能
    goSearch(){
      if(this.inputData){
        //去搜索
        console.log(this.inputData);
        //响应成功后
        this.inputData=null;
      }
    },
    //发起调用功能
    submitForm() {
      this.$refs.formDom.validate(async (valid) => {
        if (valid) {
          const params={}; //参数2
          this.validateForm.domains.forEach((item)=>{
             params[item.name]=item.value
          })
          let {data} = await formSubmitByLevel( this.bigTitle,params )
          if(data.code !==0) return this.$message.error('获取服务失败...')
          this.debugResult = data;
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
}
/* .content  /deep/ .el-form--label-top .el-form-item__label{
  position: relative;
}
.el-icon-question{
  position: absolute;
  top: 13px;
  left: 57px;
} */
.dome p{
  text-align: center;
}
/* 头部区域 */
.content /deep/ .el-menu--horizontal>.el-menu-item a, .el-menu--horizontal>.el-menu-item a:hover{
  text-decoration: none;
}
.content /deep/ .el-tree-node__content{
  height: 38px;
  background: #EEEEEE;
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
