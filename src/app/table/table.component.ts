import { KeyValuePipe, NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { controlChar } from '../infos/caracteres';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgFor, KeyValuePipe,
    ScrollPanelModule,
    TableModule, TabViewModule,
    InputTextModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  // Propriedades do componente
  @Input() value: any; // Valor de entrada do usuário
  convertedCharacters: any[] = []; // Array para armazenar caracteres convertidos
  cols: any[] = []; // Colunas da tabela

  // Método chamado durante a inicialização do componente
  ngOnInit(): void {
    this.initCols(); // Inicializa as colunas da tabela
    this.convertValue(this.value); // Converte o valor de entrada
  }

  // Método para inicializar as colunas da tabela
  initCols() {
    this.cols = [
      { field: 'character', header: 'CHAR' },
      { field: 'hex', header: 'HEX' },
      { field: 'decimal', header: 'DECIMAL' },
      { field: 'octal', header: 'OCTAL' },
      { field: 'binary', header: 'BINÁRIO' },
      { field: 'html', header: 'HTML', escape: false },
    ];
  }

  // Método para converter o valor de entrada em caracteres ASCII
  convertValue(value: string): void {
    const convertedSet = new Set(); // Conjunto para armazenar caracteres já convertidos

    for (let i = 0; i < value.length; i++) {
      const charCode = value.charCodeAt(i);
      if (!isNaN(charCode)) {
        // Verifica se o caractere já foi convertido
        if (!convertedSet.has(charCode)) {
          const conversionResult = this.convertCharacter(charCode); // converter valor e armazena 
          this.convertedCharacters.push(conversionResult); // adiciona na lista 
          convertedSet.add(charCode); // Adiciona o código do caractere ao conjunto
        }
      }
    }
  }


  // Método para converter um caractere em suas representações ASCII
  convertCharacter(charCode: number) {
    return {
      character: this.getAscii(charCode), // Obtém o caractere ASCII correspondente
      hex: charCode.toString(16).toUpperCase(), // Representação hexadecimal do caractere
      binary: charCode.toString(2).padStart(8, '0'), // Representação binária do caractere
      octal: charCode.toString(8), // Representação octal do caractere
      html: `&#${charCode};`, // Representação HTML do caractere
      decimal: charCode, // Representação decimal do caractere
    };
  }

  getAscii(code: number): string {
    // Verifica se o código está dentro do intervalo de 0 a 32, inclusivo (caracteres de controle)
    if (code >= 0 && code <= 32) {
      return controlChar[code]; // Retorna a representação legível do caractere de controle do array controlChar
    }
    // Verifica se o código é igual a 127 (caractere DELETE)
    else if (code === 127) {
      return 'DEL (Delete) - Deletar'; // Retorna uma string indicando que é um caractere de delete
    }
    // Se não estiver dentro dos casos anteriores, retorna o caractere correspondente ao código
    else {
      return String.fromCharCode(code); // Retorna o caractere correspondente ao código usando String.fromCharCode
    }
  }
}