import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http'
import { ProductI } from 'src/app/Shared/models/product.interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpSrv: HttpClient) { }

  public getAllCategories(filter?: string): Observable<ProductI[]>
  {        
    return this._httpSrv
    .get<ProductI[]>('https://localhost:44391/get');
  }  

  public onSaveValidData(product: ProductI, id?: number): Observable<any>
  {     

    if (id == null)
    {
      return this._httpSrv
      .post<ProductI>('https://localhost:44391/post', product);
    }
    else
    {
      product.Id = id;
      return this._httpSrv
      .put<ProductI>('https://localhost:44391/put', product);
    }
  }

  public deleteById(product: ProductI) : Observable<any>
  {
    return this._httpSrv
    .delete<ProductI>('https://localhost:44391/delete/' + product.Id);
    
  }

  commonMsg (title: string, msg: string, iconStr: string){
    return Swal.fire(
      title,
      msg,
      iconStr === 'success' ? 'success' : 'error'
    );
  }

  commonOkCancelDeleteDialog()
  {
    return Swal.fire({
      title: '¿Está seguro que desea eliminar el registro?',
      text: "Al confirmar, no podrá recuperar el dato eliminado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText:  'Cancelar'
    })
  }
  commonOkCancelDialog(titleDlg: string, msg: string)
  {
    return Swal.fire({
      title: titleDlg,
      text: msg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText:  'Cancelar'
    })
  }
}
