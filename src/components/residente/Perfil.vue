<template>
  <div class="container-fluid">
    <div class="col-md-12">
      <h2 class="text-left">Bienvenido {{ usuario.nombre }}</h2>
    </div>
    <div class="row">
      <div class="col-md-3">
        <ul class="list-group pull-right">
          <li class="list-group-item">
            <router-link to="/consulta-tarjeta">Consulta tarjeta</router-link>
          </li>
          <li class="list-group-item">
            <router-link to="/registro-pago">Registrar pago</router-link>
          </li>
          <li class="list-group-item">
            <router-link to="/reporte-pagos">Reporte de pagos</router-link>
          </li>
          <li class="list-group-item">
            <router-link to="/consulta-aviso">Consultar avisos/comunicados</router-link>
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
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      this.usuario = usuario;
    }
  }
}
</script>