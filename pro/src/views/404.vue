<template>
    <div>
      
         <el-result icon="error" title="错误提示" subTitle="页面未找到">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="goBack">返回</el-button>
      </template>
    </el-result>
    
    </div>
</template>
<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>