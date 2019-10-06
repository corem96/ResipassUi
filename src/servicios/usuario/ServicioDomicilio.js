/*jshint esversion: 6 */
import { server } from '@/helper';
import axios from 'axios';

const registroDomApi = `${server.baseUrl}/api/domicilio`;

async function registroDomicilio(datos) {
  try {
    const resp = await axios.post(registroDomApi, datos);
    if (resp) {
      console.log(resp);

      return resp.data;
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return { error: data };
    }
  }
}

export const servicioDomicilio = { registroDomicilio };