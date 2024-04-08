import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { caracteresDeControle, informacoes } from './infos/caracteres';
import { InfosComponent } from './infos/infos.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, ChipModule, FormsModule,
    InputTextModule, ButtonModule, TableComponent,
    NgIf, NgFor, InfosComponent, ScrollPanelModule,
    DialogModule, TabViewModule, ToastModule, TooltipModule,
    InputSwitchModule, CheckboxModule, ConfirmPopupModule,
    SkeletonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  // Injetando os serviços necessários
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  //<-------------- Variveis -------------->

  title = 'Converter | ASCII'; // Título da página
  isDark: boolean = false; // Controle do tema
  openModal: boolean = false; // Controle do modal com informações 
  isAscExtends: boolean = false; // Modifica entre AscII(entre 0 e 127) e AscII Extends(128-255)
  init: boolean = false; // Indica se o componente foi inicializado
  refresh: boolean = false; // Atualização dos valores
  skeleton: { [key: string]: boolean } = { // Controle de skeleton 
    title: true,
    btns: true,
    input: true,
    infos: true,
    history: true,
    card: true
  };

  inputValue: any = null; // Valor de entrada do usuário
  invalidCharactersStack: any; // Pilha para armazenar caracteres inválidos
  validCharacters: string = ''; // Armazena os caracteres válidos do escopo ASCII
  history: any[] = []; // Armazena os 5 ultimos valores
  caracInfos = caracteresDeControle; // Informações sobre caracteres de controle
  outrasInfos = informacoes; // Outras informações

  //<-------------- Variveis -------------->

  //<-------------- Links -------------->
  link_table = 'https://www.asciitable.com/'
  link_repository = 'https://github.com/tauisilva/Converter'
  //<-------------- Links -------------->

  ngOnInit() {
    let time = 500;
    Object.keys(this.skeleton).forEach((key: string) => {
      time += 300;
      this.disableSkeleton(key, time);
    });
    this.history.push({ valor: 'test 🦄' });
  }

  disableSkeleton(key: string, time?: number) {
    setTimeout(() => {
      this.skeleton[key] = false;
    }, time ? time : 500);
  }

  async initConverter(isReload?: boolean) {
    if (this.inputValue !== '') {
      this.init = true;
      if (isReload) {
        this.reload();
      } else {
        await this.verifyCaracteres(this.inputValue);
      }
      this.manegerHistory(this.inputValue);
    }
  }

  verifyCaracteres(value: any) {
    // Reiniciando a lista de caracteres válidos
    this.validCharacters = '';
    this.invalidCharactersStack = '';
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (this.isAscii(char)) {
        this.validCharacters += char; // Concatenando caracteres válidos
      } else {
        this.invalidCharactersStack += char // Concatenando caracteres inválidos
      }
    }
  }

  manegerHistory(value: any) {
    // Verificar se o valor já existe em history
    const valueExists = this.history.some(item => item.valor === value);
    if (!valueExists) {
      if (this.history?.length < 5) {
        this.history.push({ valor: value });
      } else {
        this.removeItemHistory(0);
        this.history.push({ valor: value });
      }
    }
  }

  // Método chamado quando há uma mudança na entrada do usuário
  onInputChange(value: string) {
    // Verifica se o valor é uma string vazia
  }

  reload() {
    this.verifyCaracteres(this.inputValue);
    this.refresh = true;
    this.init = false;
    setTimeout(() => {
      this.init = true;
      this.refresh = false;
    }, 500);
  }
  //<-------------- REGEX's -------------->

  // Método para verificar se um caractere é ASCII
  isAscii(char: string): boolean {
    const regexASCII = /^[\x00-\x7F]*$/;
    const regexASCIIExtended = /^[\x00-\xFF]*$/;
    return this.isAscExtends ?
      regexASCIIExtended.test(char) :
      regexASCII.test(char);
  }

  //<-------------- REGEX's -------------->

  //<-------------- Get's -------------->
  getIcon(theme?: boolean) {
    if (theme) {
      return this.isDark ? 'bi-sun' : 'bi-moon-stars';
    } else {
      return this.inputValue !== null && this.init ?
        'bi-arrow-clockwise text-xl' :
        'bi-play text-3xl';
    }
  }

  getTheme() {
    return this.isDark ? 'dark' : 'light';
  }

  removeItemHistory(index: number) {
    this.history.splice(index, 1);
  }

  // Método para exibir uma mensagem na interface
  showMessage(sev: string, summ: string, detail: string) {
    this.messageService.add({
      key: 'bc',
      severity: sev,
      summary: summ,
      detail: detail
    });
  }
}
