/*jshint esversion: 6 */
import { server } from '@/helper';
import axios from 'axios';

const avisoApi = `${server.baseUrl}/api/aviso`;

async function registroAviso(datos) {
  try {
    const resp = await axios.post(avisoApi, datos);
    if (resp) { return resp.data; }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: `Ocurrió un error al intentar guardar los datos: ${data}` };
    }
  }
}

async function obtenerAvisos() {
  try {
    const resp = await axios.get(avisoApi);
    if (resp) { return resp.data; }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: `Ocurrió un error al intentar obtener los datos: ${data}`};
    }
  }
}

export const servicioAviso = { registroAviso, obtenerAvisos };