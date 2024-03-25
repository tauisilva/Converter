import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { caracteresDeControle, informacoes } from './infos/caracteres';
import { InfosComponent } from './infos/infos.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, ChipModule, FormsModule,
    InputTextModule, ButtonModule, TableComponent,
    NgIf, InfosComponent, ScrollPanelModule,
    DialogModule, TabViewModule, ToastModule,
    ConfirmPopupModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  // Propriedades do componente
  title = 'converter | ASCII'; // Título da página
  value: any = null; // Valor de entrada do usuário
  validCharacters: string = ''; // Armazena os caracteres válidos do escopo ASCII
  init: boolean = false; // Indica se o componente foi inicializado
  visible: boolean = false; // Indica se algum elemento é visível na interface do usuário
  caracInfos = caracteresDeControle; // Informações sobre caracteres de controle
  outrasInfos = informacoes; // Outras informações sobre o componente
  msg: any = null; // Mensagem de erro ou aviso

  // Injetando os serviços necessários
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  // Método chamado quando há uma mudança na entrada do usuário
  onInputChange(value: string) {
    let invalidCharacters = '';

    // Reiniciando a lista de caracteres válidos
    this.validCharacters = '';

    // Verificando cada caractere da entrada do usuário
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (this.isAscii(char)) {
        this.validCharacters += char; // Concatenando caracteres válidos
      } else {
        invalidCharacters += char; // Concatenando caracteres inválidos
      }
    }

    // Se houver caracteres inválidos, exibe uma mensagem de erro
    if (invalidCharacters !== '') {
      this.showMessage(
        'error',
        'Caracteres Inválidos',
        `Use apenas caracteres pertencentes à tabela ASCII.`
      );
      this.msg = invalidCharacters;
    }
  }

  // Método para verificar se um caractere é ASCII
  isAscii(char: string): boolean {
    const regexASCII = /^[\x00-\x7F]*$/;
    return regexASCII.test(char);
  }

  // Método para recarregar o componente
  reload() {
    this.init = false;
    this.msg = null;
    setTimeout(() => {
      this.init = true;
    }, 500);
  }

  // Método para confirmar uma ação com o usuário
  confirm(event: Event) {
    if (this.msg !== null) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Alguns caracteres foram removidos, continuar?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        accept: () => {
          this.init = true;
        },
        reject: () => {
          this.msg = null;
          this.init = false;
          this.value = null;
          this.validCharacters = '';
        }
      });
    } else {
      this.init = true;
    }
  }

  // Método para exibir uma mensagem na interface
  showMessage(sev: string, summ: string, detail: string) {
    this.messageService.add({
      severity: sev,
      summary: summ,
      detail: detail
    });
  }
}

