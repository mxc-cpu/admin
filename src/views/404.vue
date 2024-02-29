<template>
    <div class="pop">
    <n-result status="404" title="404 资源不存在" description="生活空空荡荡,却还是想着遗憾">
      <template #footer>
        <n-button><RouterLink to="/Admin">找点乐子吧</RouterLink></n-button>
      </template>
    </n-result>
</div>
  </template>
  <style  scoped>

.pop {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>