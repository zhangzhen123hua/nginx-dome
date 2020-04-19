<template>
  <div>
    <el-dialog
      title="添加"
      :visible.sync="addDialogVisible"
      width="800px"
      >
      <el-form :model="addForm">
        <el-form-item label="名称">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="addForm.url" ></el-input>
        </el-form-item>
        <el-form-item label="参数">
          <el-input v-model="addForm.parame" ></el-input>
        </el-form-item>
        <el-form-item label="字段名">
          <el-input v-model="addForm.word" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:openAdd', newVal)">取 消</el-button>
        <el-button type="primary" @click="addSubmit(addForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    openAdd:Boolean
  },
  data(){
    return{
      addForm:{
        name:'',
        url:'',
        parame:'',
        word:''
      }
    }
  },
  computed:{
    addDialogVisible:{
      get(){
        return this.openAdd
      },
      set(newVal){
         this.$emit('update:openAdd', newVal)
      }

    }
  },
  methods:{
    addSubmit(val){
      this.addDialogVisible=false
       //携带val发请求
      //请求成功更新表格数据
      this.$emit('send',11)
      console.log(val,'add===')
    }
  }
}
</script>