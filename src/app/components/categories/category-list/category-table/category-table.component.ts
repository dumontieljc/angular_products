import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../../product.service';
import { ProductI } from 'src/app/Shared/models/product.interface';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss']
})
export class CategoryTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['Id', 'Code', 'Name', 'Description', 'Exitence','Price', 'actions'];  
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _srv:ProductService, 

    public dialog: MatDialog, private route: Router) { }

  ngOnInit() {
    this._srv.getAllCategories().subscribe(res => {this.dataSource.data = res; console.log(res);});
    //this.paginator._intl.itemsPerPageLabel = "Elementos por página:";
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit()
  {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(item: ProductI)
  {
    this._srv.commonOkCancelDeleteDialog()
      .then((result) => {
        if (result.value) {
          
          this._srv.deleteById(item)
          .subscribe(
            res => {
              if(res.Success == false)
              {
                this._srv.commonMsg('Error!', 'Error: ' + res.ErrorMessage,'error');
              }
              else{
                this._srv.commonMsg('Confirmación!','Producto eliminado correctamente.','success');
                this.dialog.closeAll();
                //this.route.navigate(['/categories']);
              }
              
              console.log(res);
            });
        }
      });    
  }

  onEdit(item: ProductI)
  {
    this.openDialog(item);
  }
  
  onNew() 
  {
    this.openDialog();
  }

  openDialog(item?: ProductI) :void
  {
    const config = {
      data: {
        message: item ? 'Editar Producto' : 'Nuevo Producto',
        content: item,
      }
    };

    const dialogRef= this.dialog.open(CategoryModalComponent, config);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog result ${result}`);      
    });
  }

}