export const config = {
  APIUsuariosUrls: {
    baseUrl: 'http://localhost:3000',
    validarTipoCliente: (id: number) => `/usuarios/verificar-tipoCliente/${id}`,
  },
};
