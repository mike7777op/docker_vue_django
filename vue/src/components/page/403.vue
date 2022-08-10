<template>
  <div class="error-page">
      <div class="error-code">4<span>0</span>3</div>
      <div class="error-desc">頁面發生錯誤，請重新嘗試</div>
  </div>
</template>

<script>
export default {
  methods: {
      goBack(){
          this.$router.go(-1);
      }
  }
}
</script>


<style scoped>
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 200px;
        font-weight: bolder;
        color: #000000;
    }
    .error-code span{
        color: #ff8800;
    }
    .error-desc{
        font-size: 25px;
        color: #777;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 150px;
    }
    .error-btn{
        margin-left: 100px;
    }
</style>
