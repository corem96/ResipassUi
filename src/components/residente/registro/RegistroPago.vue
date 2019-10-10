<template>
  <div class="container-fluid">
      <h2 class="text-left">Registro de pago</h2>
      <div class="row">
        <form @submit.prevent="registroPago" class="col-md-6">
          <div class="form-group">
            <label for="codigo">Folio</label>
            <input type="text" class="form-control" v-model="folio" name="folio">
          </div>
          <div class="form-group">
            <label for="vigencia">Autorización</label>
            <input type="text" class="form-control" v-model="autorizacion" name="autorizacion">
          </div>
          <div class="form-group">
            <label for="vigencia">Sucursal</label>
            <input type="text" class="form-control" v-model="sucursal" name="sucursal">
          </div>
          <div class="form-group">
            <label for="vigencia">Cajero</label>
            <input type="text" class="form-control" v-model="cajero" name="cajero">
          </div>
          <div class="form-group">
            <label for="vigencia">Importe</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
                <input type="number" class="form-control" aria-label="Dollar amount (with dot and two decimal places)" name="importe" v-model="importe">
              </div>
          </div>
          <div class="form-group">
            <label for="vigencia">Tarjeta</label>
            <input type="text" class="form-control disabled" v-model="tarjeta.codigo" name="tarjeta" readonly>
          </div>
          <div class="form-group col-md-12">
            <button type="submit" class="btn btn-info">Registrar pago</button>
          </div>
        </form>
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
import { servicioTarjeta } from '@/servicios/usuario/ServicioTarjeta'

export default {
  data() {
    return {
      errors: [],
      success: '',
      tarjeta: {},
      folio: '',
      autorizacion: '',
      sucursal: '',
      cajero: '',
      importe: 0.0,
      usuarioId: 0
    };
  },
  created() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    this.usuarioId = usuario.id;
    console.log(this.usuarioId);
  },
  methods: {
    registroPago() {
      if(this.validaForm()) {
        let registroPago = {
        };
        this._submit(tarjeta);
      }
    },
    _submit(datos) {
      // servicioTarjeta.registroTarjeta(datos)
      //   .then(resp => {
      //     if (!resp.error) {
      //       this.success = 'Tarjeta registrada';
      //     } else {
      //       this.errors.push(resp.error);
      //     }
      //   });
    },
    obtieneTarjeta() {
      servicioTarjeta.obtenerTarjetaResidente(this.usuarioId)
        .then(resp => {
          if (!resp.error) {
            this.tarjeta = resp;
          } else {
            this.errors.push(resp.error);
          }
        });
    },
    validaForm() {
      this.errors = [];
      this.success = '';
      // if (this.codigo == '') {
      //   this.errors.push('debe escribir un código válido');
      // }
      // if (this.vigencia == '') {
      //   this.errors.push('debe escribir una vigencia válida');
      // }
      // if (this.$children[0].residenteId == '') {
      //   this.errors.push('debe seleccionar un residente');
      // }
      // if (this.errors.length > 0) {
      //   return false;
      // }
      // this.residenteId = this.$children[0].residenteId;
      return true;
    }
  }  
}
</script>

<style>

</style>