<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }

  body:before {
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: antiquewhite;
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    filter: blur(10px);
  }

  .form {
    padding: 2rem;
    border-radius: 1rem;
  }
  .form-white {
    background-color: white;
  }
  .form-transparent {
    background: rgba(0,0,0,0.6);
  }

</style>
