<template>
  <div>
    123
  </div>
</template>
<script>
import {ModelByLevel} from '../api/http'
export default {
data(){
  return {

  }
},
mounted(){
  this.getModelData()
},
methods:{
  async getModelData(key){
      key = key || 2
      const params={id:key} 
      let {data:{code,data}} = await ModelByLevel(params);
      if(code !==0) return this.$message.error('获取服务失败...');
      console.log(data)
     
    }


}

  
}
</script>
<style lang="scss" scoped>

</style>