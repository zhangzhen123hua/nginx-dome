<template>
  <div class="main">
      <div class="header">
        <el-row :gutter="800">
           <el-col :span="12">
            <div>方法详情</div>
           </el-col>
           <el-col :span="12">
            <div>
              <el-button type="primary"  size="mini">配置参数描述</el-button>
              <el-button type="success"  size="mini">修改</el-button>
            </div>
           </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="srk">
              模块名称:
              <el-input
                disabled
                v-model="objData.modelData">
              </el-input>
            </div>
            <div  class="srk">
              方法名称:
              <el-input
                disabled
                v-model="objData.methodsData">
              </el-input>
            </div>
            <div  class="srk">
              英文名称:
              <el-input
                disabled
                v-model="objData.engData">
              </el-input>
            </div>
          </el-col>
          <el-col :span="12"></el-col>
          </el-row>
      </div>
      <div class="footer">
        <div style="margin-bottom:20px">属性详情</div>
        <el-divider></el-divider>
        <el-row :gutter="800" style="margin-bottom:24px">
          <el-col :span="12"><div>属性字段列表</div></el-col>
          <el-col :span="12"><el-button type="success" size="mini" @click="addAttribute()">添加属性</el-button></el-col>
        </el-row>
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              type="index"
              label="#"
              width="138px">
            </el-table-column>

            <el-table-column
              prop="name"
              label="属性"
              width="500">
            </el-table-column>

            <el-table-column
              label="操作"
              width="500"
              >
              <template slot-scope="scope"> 
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleDetail(scope.row)">查看详情</el-button>
                <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
          <el-divider></el-divider>
          <div class="btn">
            <el-button  size="mini" @click="handleback()" type="success" >返回</el-button>
          </div>
      </div>
      <!-- 添加弹窗 -->
      <el-dialog
        title="添加"
        :visible.sync="addVisible"
        width="400px"
        >
        <el-form :model="addForm">
          <el-form-item label="属性">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible =false">取 消</el-button>
          <el-button type="primary" @click="addSubmit(addForm)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 查看详情弹窗 -->
        <el-dialog
          title="查看"
          :visible.sync="detailVisible"
          width="400px"
          >
          <span v-text="viewConten"></span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="detailVisible=false">取 消</el-button>
            <el-button type="primary" @click="detailSubmit()">确 定</el-button>
          </span>
        </el-dialog>
      <!--编辑弹窗  -->
        <el-dialog
          title="编辑"
          :visible.sync="editVisible"
          width="400px"
          >
          <el-form :model="editForm">
            <el-form-item label="属性">
              <el-input v-model="editForm.name"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible=false">取 消</el-button>
            <el-button type="primary" @click="editSubmit(editForm)">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      addVisible:false,
      detailVisible:false,
      editVisible:false,
      viewConten:'',
      addForm:{
        name:''
      },
      editForm:{
         name:''
      },
      objData:{
        modelData:'推送服务',
        methodsData:'短信推送',
        engData:'sendShortMessage.callback'
      },
       tableData: [{
          name: '王小虎'
        }, {
          name: '王小虎'
        }, {
          name: '王小虎'
        },
         {
          name: '王小虎'
        }]
    }
  },
  methods:{
    addAttribute(){
      this.addVisible=true
    },
    addSubmit(val){
       this.addVisible=false
       //携带val发请求
       //更新属性字段列表
       console.log(val,'addSubmit==')
    },
    handleDetail(val){
        this.detailVisible=true
        this.viewConten=val
        console.log(val)
    },
    detailSubmit(){
       this.detailVisible=false
    },
    handleEdit(val){
      this.editVisible=true
      this.editForm=val
    },
    editSubmit(val){
      this.editVisible=false
      //携带val发请求
      //更新属性字段列表
       console.log(val,'editSubmit==')
    },
    handleDelete(){
      this.$confirm('此操作将永久删除该内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((val) => {
        //携带val发请求
        console.log(val,"Delete===")
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleback(){
      console.log('返回')
    }

    
  }
  
}
</script>
<style lang="scss" scope>
.main{
  margin: 20px;
  width: 1200px;
  border: 1px solid #ccc;
  background-color: #fff;
  .header{
    padding: 30px;
    .srk .el-input{
      width: 300px;
    }
  }
  .left_row{
    margin-bottom: 20px;
    input{
      border: none;
      margin-left: 10px;
    }
  }
  .footer{
    padding: 30px;
    position: relative;
    .el-pagination{
      margin-top: 20px;
      margin-left: 600px;
    }
    .btn{
      position: absolute;
      right: 30px;
      bottom: 10px;
    }
  }
}
</style>