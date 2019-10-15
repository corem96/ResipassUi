/*jshint esversion: 6 */
import { server } from '@/helper';
import axios from 'axios';

const domicilioApi = `${server.baseUrl}/api/domicilio`;

async function obtenerDomicilios() {
  try {
    const resp = await axios.get(domicilioApi);
    if (resp) { return resp.data; }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: `Ocurrió un error al intentar guardar los datos: ${data}` };
    }
  }
}

async function registroDomicilio(datos) {
  try {
    const resp = await axios.post(domicilioApi, datos);
    if (resp) { return resp.data; }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: `Ocurrió un error al intentar guardar los datos: ${data}` };
    }
  }
}

export const servicioDomicilio = { obtenerDomicilios, registroDomicilio };