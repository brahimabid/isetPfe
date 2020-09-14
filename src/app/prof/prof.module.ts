import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfRoutingModule } from './prof-routing.module';
import { ProfComponent, DialogOverviewExampleDialog } from './prof.component';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [ProfComponent,DialogOverviewExampleDialog],
  imports: [
    CommonModule,
    ProfRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatListModule,
    MatBadgeModule,
    MatDialogModule
  ],entryComponents:[DialogOverviewExampleDialog]
})
export class ProfModule { }
