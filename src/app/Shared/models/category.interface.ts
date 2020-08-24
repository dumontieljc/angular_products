export interface CategoryI
{
    
    ID_TipoProducto?: number; 
    DescripcionTipoProducto: string;
    PrecioPublico: number;
    ComisionPiso?: number;
    comisionForaneos?: number;
    stockMinimo: number;
    CantidadMayoreo: number;
    PrecioMayoreo: number;
    Codigo: string;
    DescuentoPorBolsa: number;
}