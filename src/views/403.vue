<template>
<div class="pop">
    <n-result 
      status="403"
      title="403 禁止访问"
      description="总有些门是对你关闭的,即使你是FBI"
    >
      <template #footer>
        <n-button   ><RouterLink to="/Admin"> 放轻松</RouterLink> </n-button>
      </template>
    </n-result>
  </div>
  </template>
  <script setup>



</script>
<style scoped >

.pop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

</style>