export class PromocionInput {
  nombre: string;
  porcentajeDescuento: number;
  diaId: number;
  tipoClienteId: number;
}
export class PromocionOutput {
  id: number;
  nombre: string;
  porcentajeDescuento: number;
  tipoClienteId: number;
  diaId: number;
}
export class PromocionMayorDTO {
  id: number;
  porcentajeDescuento: number;
}
