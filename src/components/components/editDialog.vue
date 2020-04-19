<template>
  <div>
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      width="800px"
      >
      <el-form :model="editForm">
        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="editForm.url" ></el-input>
        </el-form-item>
        <el-form-item label="参数">
          <el-input v-model="editForm.parame" ></el-input>
        </el-form-item>
        <el-form-item label="字段名">
          <el-input v-model="editForm.word" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:open', newVal)">取 消</el-button>
        <el-button type="primary" @click="editSubmit(editForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    open:Boolean,
    checkedRow:Object,
    editData:Object,
  },
  data(){
    return{
       
    }
  },
  methods:{
    editSubmit(val){
      this.dialogVisible = false
      //携带val发请求
      //请求成功更新表格数据
      console.log(val,'edit===')
    }
  },
  computed: {
    dialogVisible:{
       get () {
         return this.open
       },
       set (newVal) {
        this.$emit('update:open', newVal)
      }
    },
    editForm(){
      return this.editData
    }
    // dialogContent(){
    //   return this.checkedRow
    // }
  }
  
}
</script>
<style lang='scss' scoped>

</style>