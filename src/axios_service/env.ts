import { get } from "axios";

export const config = {
    APIUsuariosUrls: {
        baseUrl: `http://localhost:3004`,
        getUserById: (id: number) => `/usuario/api/${id}`,
        validarTipoCliente: (id) => `/microservicio-usuarios/tipo-cliente/validar-existencia-tipoCliente/${id}`,
        getTipoClienteById: (id: number) => `/microservicio-usuarios/tipo-cliente/admin/${id}`,

    },
};
