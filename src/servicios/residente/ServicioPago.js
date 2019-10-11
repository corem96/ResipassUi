/*jshint esversion: 6 */
import { server } from '@/helper';
import axios from 'axios';

const registroPagoApi = `${server.baseUrl}/api/pago`;

async function registroPago(datosPago) {
  try {
    const resp = await axios.post(registroPagoApi, datosPago);
    if (resp) { return resp.data; }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: `Ocurrió un error al intentar guardar los datos: ${data}`};
    }
  }
}

export const servicioPago = { registroPago };