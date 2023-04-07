<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default { 
  components: {
    }, 
  data: function() {
    return {
    }
  },
  methods: {
    submitData: function(data) {
      this.saveData = data
    }
  },
}
</script>

<style>
  #app {
    height: 100%;
    width: 100%;
  }
  .ck {
    height: 300px;
  }
  .menu {
    display: flex;
    flex-flow: column;
}

  .btn-common {
      background-color: #77ACF2 !important;
      border-color: #77ACF2 !important;
      color: #fff;
  }
  .wrap {
      width:100vw;
      height: 100vh;
  }

  .side {
      width: 20vw;
      height: 90vh;
      background-color: #E9EFF2;
  }

  .contents {
      width: 100vw;
      height: 90vh;
      background: #777;
      display: flex;
      justify-content: center;
  }

  .main {
      width: 90vw;
      height: 90vh;
      background: #e0ecf1;
      padding: 20px;
  }

  body {
    padding-top: 0 !important;
  }
</style>