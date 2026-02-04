export const config = {
    APIUsuariosUrls: {
        baseUrl: process.env.URL_MS_USUARIOS || 'http://localhost:3000',
        validarTipoCliente: (id) => `/microservicio-usuarios/tipo-cliente/validar-existencia-tipoCliente/${id}`,
        getTipoClienteById: (id: number) => `/microservicio-usuarios/tipo-cliente/admin/${id}`,

    },
};
