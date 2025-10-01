import axios from 'axios';
export class TipoClienteService{
  private baseUrl = 'http://api-gateway'; // URL del microservicio

  async validarTipoCliente(tipoClienteId: number): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/${tipoClienteId}`);
      return response.status === 200; // si existe, retorna true
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return false; // no existe la promoción
      }
      throw new Error('Error al consultar el microservicio de tipo de cliente');
    }
  }
}