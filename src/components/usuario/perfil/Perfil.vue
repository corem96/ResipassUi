<template>
  <div class="row">
    <div class="col-md-3">
      <ul class="list-group pull-right">
        <li class="list-group-item">Registrar domicilio</li>
        <li class="list-group-item">Registrar tarjeta</li>
        <li class="list-group-item">Cobranza</li>
        <li class="list-group-item">Enviar recordatorio</li>
        <li class="list-group-item">
          <router-link to="/login">Logout</router-link>
        </li>
      </ul>
    </div>

    <div class="col-md-3">
      <h3>Bienvenido {{ usuario.nombre }}</h3>      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: {}
    };
  },
  created() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }
}
</script>