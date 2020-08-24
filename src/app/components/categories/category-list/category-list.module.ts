import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryListRoutingModule } from './category-list-routing.module';
import { CategoryListComponent } from './category-list.component';
import { LoadingModule } from 'src/app/Shared/components/loading/loading.module';
import { CategoryTableComponent } from './category-table/category-table.component';
import { MaterialModule } from 'src/app/Shared/modules/material.module';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent, CategoryTableComponent, CategoryModalComponent, CategoryManageComponent],
  imports: [
    CommonModule,
    CategoryListRoutingModule,
    MaterialModule,
    LoadingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CategoryListModule { }
