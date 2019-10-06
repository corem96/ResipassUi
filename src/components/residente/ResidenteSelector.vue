<template>
  <v-select label="nombre" :reduce="residente => residente.id"
    :options="residentes" v-model="residenteId" @input="setSelected"></v-select>
</template>

<script>
import Vue from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

Vue.component('v-select', vSelect);
export default {
  data() {
    return {
      residentes: [],
      residenteId: 0
    };
  },
  methods: {
    setSelected(value) {
      console.log(value);
      this.residente = value;
    }
  }
}
</script>