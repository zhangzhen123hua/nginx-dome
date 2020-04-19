<template>
  <div>
    <el-dialog
      title="配置使用说明"
      :visible.sync="dialogVisible"
      width="500px"
      >
      <span>说明内容。。。。。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:openExplain', newVal)">取 消</el-button>
        <el-button type="primary" @click="handleTrue()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props:{
    openExplain:Boolean
  },
  methods:{
    handleTrue(){
       this.dialogVisible = false
    }
  },
  computed: {
    dialogVisible:{
       get () {
         return this.openExplain
       },
       set (newVal) {
        this.$emit('update:openExplain', newVal)
      }
  
    }
  }
  
}
</script>
<style lang='scss' scoped>

</style>