export const config = {
    APIUsuariosUrls: {
        baseUrl: `http://localhost:3004`,
        getUserById: (id: number) => `/usuario/api/${id}`,
        validarTipoCliente: (id) => `/tipo-cliente/validar-existencia/${id}`,
        getTipoClienteById: (id: number) => `/tipo-cliente/admin/${id}`,
    },
};