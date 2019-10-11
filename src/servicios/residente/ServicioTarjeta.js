/*jshint esversion: 6 */
import { server } from '@/helper';
import axios from 'axios';

const residenteApi = `${server.baseUrl}/api/tarjeta`;

async function obtenerTarjeta() {
  try {
    const resp = await axios.get(residenteApi);
    if (resp) { return resp.data; }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: `Ocurrió un error al intentar obtener los datos: ${data}`};
    }
  }
}

async function obtenerTarjetaResidente(residenteId) {
  try {
    const resp = await axios.get(`${residenteApi}/tarjeta-residente?residenteId=${residenteId}`);
    if (resp) { return resp.data; }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: `Ocurrió un error al intentar obtener los datos: ${data}` };
    }
  }
}

export const servicioTarjeta = { obtenerTarjeta, obtenerTarjetaResidente };