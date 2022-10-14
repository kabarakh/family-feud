<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.flex-cols {
  display: flex;
  justify-content: space-around;
}
</style>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Public</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
