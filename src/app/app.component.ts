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
  title = 'converter | ASCII'; // Título da aplicação
  value: any = null; // Valor inicial para a entrada de dados
  init: boolean = false; // Indica se a aplicação foi inicializada
  visible: boolean = false; // Indica se um componente é visível na interface
  caracInfos = caracteresDeControle; // Informações sobre caracteres de controle
  outrasInfos = informacoes; // Outras informações relevantes

  // Método para recarregar a aplicação
  // Necessario para limpeza dos dados e evitar uso de lixo
  reload() {
    this.init = false; // Define que a aplicação não está inicializada
    setTimeout(() => {
      this.init = true; // Define que a aplicação está inicializada após um pequeno intervalo
    }, 500); // Tempo de espera antes de reinicializar a aplicação (500ms)
  }
}
