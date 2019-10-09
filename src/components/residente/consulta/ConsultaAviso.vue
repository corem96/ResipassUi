<template>
  <div class="container-fluid">
      <h2 class="text-left">Consulta de avisos</h2>
      <div class="row">
        <div class="com-md-12">
          <b-table striped hover responsive fixed :items="avisos" :fields="campos">
          </b-table>
        </div>
        <div class="col-md-6">
          <div v-if="success" class="alert alert-success">{{success}}</div>
          <div v-if="errors.length" class="alert alert-danger">
            <ul>
              <li v-for="error in errors">{{error}}</li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { servicioAviso } from '@/servicios/usuario/ServicioAviso';

export default {
  data() {
    return {
      errors: [],
      success: '',
      campos: [
          { key: 'id', label: '#' },
          { key: 'comunicado', label: 'Aviso', class: 'largeColumn' }
      ],
      avisos: [],
      cargando: false,
    };
  },
  created() {
    servicioAviso.obtenerAvisos()
      .then(resp => {
        if (!resp.error) {
            this.avisos = resp;
          } else {
            this.errors.push(resp.error);
          }
      });
  }
}
</script>

<style>
.largeColumn {
    width: 85%;
}
</style>