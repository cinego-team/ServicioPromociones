export const config = {
    APIUsuariosUrls: {
        baseUrl: `http://localhost:${process.env.PUERTO_MS_USUARIOS}`,
        validarTipoCliente: (id) => `/microservicio-usuarios/tipo-cliente/validar-existencia-tipoCliente/${id}`,
        getTipoClienteById: (id: number) => `/microservicio-usuarios/tipo-cliente/admin/${id}`,

    },
};
