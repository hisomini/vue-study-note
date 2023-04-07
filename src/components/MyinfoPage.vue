<template>
  <div class="wrap">
    <app-header></app-header>
    <div class="contents">
      <app-sidebar class="side"></app-sidebar>
      <div class="main">
        내정보페이지
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue';
import AppSidebar from '../components/AppSidebar.vue';
export default {
  components: {
    'app-header' : AppHeader,
    'app-sidebar' : AppSidebar
  }

}
</script>

<style>

</style>