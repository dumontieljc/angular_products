import { Component, OnInit, Input } from '@angular/core';
import { ProductI } from 'src/app/Shared/models/product.interface';
import { ProductService } from '../../product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import {Location} from "@angular/common"
@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {
 
  @Input() itemEdit: ProductI = <ProductI>{}; 
  
  constructor(private _srv: ProductService
    ,private route: Router
    ,public dialog: MatDialog
    ,private location: Location
    ) { }

  public productForm = new FormGroup(
  {     
    Code: new FormControl('',Validators.required),        
    Name: new FormControl('',Validators.required),
    Description: new FormControl('',Validators.required),
    Exitence: new FormControl('',Validators.required),
    Price: new FormControl('',Validators.required),    
  });

  ngOnInit(): void {    

    if (this.itemEdit)
    {      
      this.productForm.controls["Code"].setValue(this.itemEdit.Code);            
      this.productForm.controls["Name"].setValue(this.itemEdit.Name);
      this.productForm.controls["Description"].setValue(this.itemEdit.Description);
      this.productForm.controls["Exitence"].setValue(this.itemEdit.Exitence);
      this.productForm.controls["Price"].setValue(this.itemEdit.Price);                  
     
    }

  }
  
  
  onSave(form: ProductI)
  {    
    
    if(!this.productForm.valid)
    {
      this._srv.commonMsg('Error!','Ingrese todos los datos requeridos (los marcados en rojo).','error');
      return;
    }
    console.log('onsave');
    
    this._srv
    .onSaveValidData(form, this.itemEdit ? this.itemEdit.Id : null)
    .subscribe(
      res => {
        if(res.Success == false)
        {
          this._srv.commonMsg('Error!', 'Error: ' + res.ErrorMessage,'error');
        }
        else{
          this._srv.commonMsg('Confirmación!','Información guardada correctamente.','success');
          this.dialog.closeAll();
          this.route.navigateByUrl("/categories");          
        }
        
        console.log(res);
      });
      
  }

  

}