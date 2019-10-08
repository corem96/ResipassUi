<template>
  <div class="container-fluid">
    <div class="col-md-12">
      <h2 class="text-left">Bienvenido {{ usuario.nombre }}</h2>
    </div>
    <div class="row">
      <div class="col-md-3">
        <ul class="list-group pull-right">
          <li class="list-group-item">
            <router-link to="/consultatarjeta">Consulta tarjeta</router-link>
          </li>
          <li class="list-group-item">
            Envío de comprobante de pago
          </li>
          <li class="list-group-item">
            Reporte de pagos por anualidad
          </li>
          <li class="list-group-item">
            Consultar avisos/comunicados
          </li>
          <li class="list-group-item">
            <router-link to="/login">Logout</router-link>
          </li>
        </ul>
      </div>
      <div class="col-md-9">
        <router-view></router-view>
      </div>
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

<style>

</style>