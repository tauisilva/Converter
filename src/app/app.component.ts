import { NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { InfosComponent } from './infos/infos.component';
import { TableComponent } from './table/table.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, ChipModule, FormsModule,
    InputTextModule, ButtonModule, TableComponent,
    NgIf, InfosComponent, ScrollPanelModule,
    DialogModule, TabViewModule, ToastModule, TooltipModule,
    InputSwitchModule, CheckboxModule, ConfirmPopupModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  //<-------------- Variveis -------------->

  title = 'Converter | ASCII'; // Título da página
  isDark: boolean = false; // Controle do tema
  openModal: boolean = false; // Controle do modal com informações 
  isAscExtends: boolean = false; // Modifica entre AscII(entre 0 e 127) e AscII Extends(128-255)
  init: boolean = false; // Indica se o componente foi inicializado
  refresh: boolean = false; // Atualização dos valores
  skeleton: { [key: string]: boolean } = {
    initSkeleton: false,
    title: false,
    btns: false,
    input: false,
    card: false
  };

  inputValue: any = null; // Valor de entrada do usuário
  invalidCharactersStack: any; // Pilha para armazenar caracteres inválidos

  //<-------------- Variveis -------------->

  //<-------------- Links -------------->

  link_table = 'https://www.asciitable.com/;'

  //<-------------- Links -------------->

  async ngOnInit(): Promise<void> {
    this.ativarSkeleton();
    let time = 500;
    Object.keys(this.skeleton).forEach((key: string) => {
      time += 10;
      if (key !== 'initSkeleton') {
        this.disableSkeleton(key, time);
      }
    });
    this.skeleton['initSkeleton'] = false;
  }

  ativarSkeleton(): void {
    Object.keys(this.skeleton).forEach((key: string) => {
      this.skeleton[key] = true;
    });
  }

  async disableSkeleton(key: string, time?: number) {
    await new Promise<void>(resolve =>
      setTimeout(() => {
        console.log(key, time)
        this.skeleton[key] = false;
        resolve();
      }, time ? time : 500));
  }

  async initConverter() {
    this.init = true;
    await this.verifyCaracteres(this.inputValue);
  }

  verifyCaracteres(value: any) {
    let validCharacters = '';
    this.invalidCharactersStack = '';
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      if (this.isAscii(char)) {
        validCharacters += char; // Concatenando caracteres válidos
      } else {
        this.invalidCharactersStack += char // Concatenando caracteres inválidos
      }
    }
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
}
