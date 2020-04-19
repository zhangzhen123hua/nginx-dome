<template>
  <div class="main">
    <div class="title">配置页</div>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :default-expand-all="true"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
          prop="name"
          label="名称"
          >
        </el-table-column>
        <el-table-column
          prop="url"
          label="url"
          >
        </el-table-column>
        <el-table-column
          prop="parame"
          label="参数">
        </el-table-column>
        <el-table-column
          prop="word"
          label="字段名">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="success"
              @click="handleAdd(scope.row)">添加</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handleDescription(scope.row)">
              配置使用说明</el-button>
          </template>
        </el-table-column>
      </el-table>
      <explain-dialog :openExplain.sync="explain"></explain-dialog>
      <add-Dialog :openAdd.sync="add" @send="getAddData($event)"></add-Dialog>
      <editDialog :open.sync="visible" :editData="editData" :ref="editForm"></editDialog>
  </div>
</template>
<script>
import explainDialog from './components/explainDialog'
import editDialog from './components/editDialog'
import addDialog from './components/addDialog'
export default {
  data(){
    return{
        visible :false,
        explain:false,
        add:false,
        editData:null,
        tableData: []
    }
  },
  mounted(){
    this.getTableData()
  },
  methods:{
    getAddData(val){
      console.log(val,'接受数据===')

    },
    getTableData(){
      return(this.tableData=[
          {
            id: 1,
            name: '推送服务',
            url: 'http://localhost:8080/#/page/ts',
            parame: 'about/api',
            word:'/road',
            children: [
              {
                id: 1-1,
                name: '推送模块',
                url: 'http://localhost:8080/#/page/ts/ts',
                parame: 'about/api',
                word:'/road',
                children:[
                  {
                    id: 1-1-1,
                    name: '方法a',
                    url: 'http://localhost:8080/#/page/ts/ts/ffa',
                    parame: 'about/api',
                    word:'/road',
                  },{
                    id: 1-1-2,
                    name: '方法b',
                    url: 'http://localhost:8080/#/page/ts/ts/ffb',
                    parame: 'about/api',
                    word:'/road',
                  }
                ]
              }, {
                id: 1-2,
                name: '其他模块',
                url: 'http://localhost:8080/#/page/ts/qt',
                parame: 'about/api',
                word:'/road',
                children:[
                   {
                    id: 1-2-1,
                    name: '方法a',
                    url: 'http://localhost:8080/#/page/ts/qt/ffa',
                    parame: 'about/api',
                    word:'/road',
                  },{
                    id: 1-2-1,
                    name: '方法b',
                    url: 'http://localhost:8080/#/page/ts/qt/ffb',
                    parame: 'about/api',
                    word:'/road',
                  }
                ]
              }
            ]
          }
      ])
    },
    handleDescription(val){ //说明
      this.explain=true
      console.log(val)
    },
    handleAdd(val){ //添加
      this.add=true
      // this.checkedRow=val
      console.log(val)
    },
    handleEdit(val){ //修改
      this.visible=true
      //重置表单
      // this.$nextTick(() => {
      //   this.$refs.editForm.resetFields()
      // })
      console.log(val,11)
      this.editData=val
    }

  },
  components:{
    addDialog,
    editDialog,
    explainDialog
  },
}
</script>
<style lang='scss' scoped>
.main{
  height: 100%;
  background-color: #F7F7F7;
  box-sizing: border-box;
  margin: 0 10px;
  .title{
    padding: 15px;
  }
}
</style>