/*jshint esversion: 6 */
import { server } from '../../helper';
import axios from 'axios';

const tarjetaApi = `${server.baseUrl}/api/tarjeta`;

async function registroTarjeta(datos) {
  try {
    const resp = await axios.post(tarjetaApi, datos);
    if (resp) { return resp.data; }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: `Ocurrió un error al intentar guardar los datos: ${data}`};
    }
  }
}

async function obtenerTarjetas() {
  try {
    const resp = await axios.get(tarjetaApi);
    if (resp) { return resp.data }
  } catch (error) {
    const { data } = error.response;
    return { error: `Ocurrió un error al intentar obtener los datos: ${data}`};
  }
}

export const servicioTarjeta = { registroTarjeta, obtenerTarjetas };