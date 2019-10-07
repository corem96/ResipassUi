<template>
  <div class="container-fluid">
      <h2 class="text-left">Registro de tarjetas</h2>
      <div class="row">
        <form @submit.prevent="registroTar" class="col-md-6">
          <div class="form-group">
            <label for="codigo">Código</label>
            <input type="text" class="form-control" v-model="codigo" name="codigo" id="codigo">
          </div>
          <div class="form-group">
            <label for="vigencia">Vigencia</label>
            <input type="date" class="form-control" v-model="vigencia" name="vigencia" id="vigencia">
          </div>
          <div class="form-group">
            <ResidenteSelector :value="residenteId"/>
          </div>
          <div class="form-group col-md-12">
            <button type="submit" class="btn btn-info">Registrar</button>
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
import ResidenteSelector from '@/components/residente/ResidenteSelector.vue'
import { servicioTarjeta } from '../../../servicios/usuario/ServicioTarjeta'

export default {
  data() {
    return {
      errors: [],
      success: '',
      codigo: '',
      vigencia: '',
      residenteId: '',
    };
  },
  components: {
    ResidenteSelector
  },
  methods: {
    registroTar() {
      if(this.validaForm()) {
        let tarjeta = {
          codigo: this.codigo,
          vigencia: this.vigencia,
          residenteId: this.residenteId
        };
        this._submit(tarjeta);
      }
    },
    _submit(datos) {
      // console.log(servicioDomicilio);
      servicioTarjeta.registroTarjeta(datos)
        .then(resp => {
          if (!resp.error) {
            this.success = 'Tarjeta registrada';
          } else {
            this.errors.push(resp.error);
          }
        });
    },
    validaForm() {
      this.errors = [];
      this.success = '';
      if (this.codigo == '') {
        this.errors.push('debe escribir un código válido');
      }
      if (this.vigencia == '') {
        this.errors.push('debe escribir una vigencia válida');
      }
      if (this.$children[0].residenteId == '') {
        this.errors.push('debe seleccionar un residente');
      }
      if (this.errors.length > 0) {
        return false;
      }
      this.residenteId = this.$children[0].residenteId;
      return true;
    }
  }
}
</script>

<style>

</style>