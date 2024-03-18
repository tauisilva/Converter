import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { caracteresDeControle, informacoes } from './infos/caracteres';
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
    NgIf,
    InfosComponent,
    ScrollPanelModule,
    DialogModule,
    TabViewModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  title = 'converter | ASCII';
  value: any = null;
  init: boolean = false;
  visible: boolean = false;
  caracInfos = caracteresDeControle;
  outrasInfos = informacoes;

  reload() {
    this.init = false;
    setTimeout(() => {
      this.init = true;
    }, 500)
  }
}
