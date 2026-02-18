export const config = {
    APIUsuariosUrls: {
        baseUrl: `http://localhost:3004`,
        validarTipoCliente: (id) => `/microservicio-usuarios/tipo-cliente/validar-existencia-tipoCliente/${id}`,
        getTipoClienteById: (id: number) => `/microservicio-usuarios/tipo-cliente/admin/${id}`,

    },
};
