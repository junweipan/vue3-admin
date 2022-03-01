<template>
  <div class="navbar">
    <left-link></left-link>
  </div>
</template>

<script>
import LeftLink from './LeftLink'
export default {
  components: {
    LeftLink
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
