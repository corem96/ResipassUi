<template>
  <div class="home">
    <HelloComponent msg="Bienvenido a Colonia Segura"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloComponent from '@/components/Hello.vue'

export default {
  name: 'home',
  components: {
    HelloComponent
  }
}
</script>
