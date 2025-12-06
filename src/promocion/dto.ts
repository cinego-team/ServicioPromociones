export class PromocionInput {
  nombre: string;
  porcentajeDescuento: number;
  dia: string;
  tipoClienteId: number;
}
export class PromocionOutput {
  id: number;
  nombre: string;
  porcentajeDescuento: number;
  tipoClienteId: number;
  dia: string;
}
export class PromocionMayorDTO {
  id: number;
  porcentajeDescuento: number;
}
