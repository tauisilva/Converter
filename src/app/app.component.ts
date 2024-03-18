import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { InfosComponent } from './infos/infos.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ChipModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableComponent,
    InfosComponent,
    TooltipModule,
    NgIf
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'converter';
  value: any = null;
  init: boolean = false;

  reload() {
    this.init = false;
    setTimeout(() => {
      this.init = true;
    }, 500)
  }
}
