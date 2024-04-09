import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
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
  imports: [ // importação dos modulos
    RouterOutlet, FormsModule,
    TableComponent, NgIf, NgFor,
    InfosComponent, ScrollPanelModule,
    DialogModule, TabViewModule, ToastModule, TooltipModule,
    InputSwitchModule, CheckboxModule, ConfirmPopupModule,
    SkeletonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None // quebra de encapsulamento dos modulos importados 
})
export class AppComponent implements OnInit {

  // Injetando os serviços necessários
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  //<-------------- Variveis -------------->
  title = 'Converter | ASCII'; // Título da página
  isDark: boolean = true; // Controle do tema
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
    let time = 500; // inicia com 500 milisegundos
    Object.keys(this.skeleton).forEach((key: string) => {
      time += 300; // Incrementa valor sobre time
      this.disableSkeleton(key, time); // Desabilta cada key com seu nome/time
    });
    this.addTest(); //Add itens mock
  }

  disableSkeleton(key: string, time?: number) { // Função para desabilitar o skeleton com base no valor/Key
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
    const valueExists = this.history.some(item => item.valor === value); // verificar se valor ja não existe para evitar redundancia 
    if (!valueExists) {
      if (this.history?.length < 5) {
        this.history.push({ valor: value }); // adiciona valor no historico 
      } else {
        this.removeItemHistory(0); // remove o iten 0 mantendo sempre 5 items
        this.history.push({ valor: value });
      }
    }
  }

  // Método chamado quando há uma mudança na entrada do usuário
  onInputChange(value: string) {
    // Verifica se o valor é uma string vazia
  }

  reload() { // controle da valor para atualizar o DOM
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
  getIcon(theme?: boolean) { //Icones do sitema de acordo com cada situação
    if (theme) {
      return this.isDark ? 'bi-sun' : 'bi-moon-stars';
    } else {
      return this.inputValue !== null && this.init ?
        'bi-arrow-clockwise text-xl' :
        'bi-play text-3xl';
    }
  }

  getTheme() { // Controle de tema(dark default)
    return this.isDark ? 'dark' : 'light';
  }

  removeItemHistory(index: number) { // remover item da lista pela ação do user de acordo com o index
    this.history.splice(index, 1);
  }

  // Função para limitar o número de caracteres
  limitarCaracteres(valor: string): string {
    if (valor && valor.length > 15) {
      return valor.substring(0, 15) + '...';
    }
    return valor;
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

  addTest() { // Adiccionar valores mock para testes
    this.history.push({ valor: 'Test 🦄🐲🦉' });
    this.history.push({ valor: 'Transborde, morada do caos! Recipiente insolente de loucura! Negue a vontade oculta, congele e oblitere! Perturbe o sono! A donzela de ferro rasteja! A boneca de lama desintegra! Se una! Se oponha! Preencha a terra e reconheça sua própria impotência!' });
  }
}
