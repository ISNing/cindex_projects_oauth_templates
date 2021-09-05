<template>
    <LoginContent/>
</template>

<script>
import LoginContent from '@/components/LoginContent'

export default {
    name: 'App',
    layout: 'auth',
    components: {
        LoginContent
    },
    props: {
        source: String
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
