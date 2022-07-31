<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created(ctx){
    console.log('create',ctx,this)
  },
  render(h){
    console.log('zhixin------')
    return h('div',{id:'id'},'hello')
  },
  setup(arg){
    console.log('home',arg)
  }
}
</script>
