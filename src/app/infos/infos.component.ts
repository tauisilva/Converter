import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { controlCharacters } from './caracteres';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [
    InputTextModule, TabViewModule,
    NgFor, NgIf, TableModule,
    FormsModule, ButtonModule
  ],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class InfosComponent implements OnInit {
  infos: any[] = []; // Array para armazenar as informações
  cols: any[] = []; // Array para definir as colunas da tabela

  ngOnInit(): void {
    this.iniCols(); // Inicializa as colunas da tabela
    this.initInfos(); // Inicializa as informações para cada código ASCII
  }

  // Método para inicializar as colunas da tabela
  iniCols() {
    this.cols = [
      { field: 'hex', header: 'HEX' }, // Coluna para representação hexadecimal
      { field: 'decimal', header: 'DECIMAL' }, // Coluna para representação decimal
      { field: 'octal', header: 'OCTAL' }, // Coluna para representação octal
      { field: 'binary', header: 'BINÁRIO' }, // Coluna para representação binária
      { field: 'charCode', header: 'CHARCODE' }, // Coluna para representação do código ASCII
      { field: 'html', header: 'HTML', escape: false }, // Coluna para representação HTML
    ];
  }

  // Recursividade
  // A cada chamada da função initInfos(),
  //  um código ASCII é processado e as informações correspondentes são adicionadas ao array infos.
  //  Em seguida, a função se chama novamente com o próximo código ASCII no intervalo especificado.
  //  Esse processo continua até que o código ASCII atinja o limite superior do intervalo especificado,
  // momento em que a recursão para devido à condição de parada.

  // Método para inicializar as informações para cada código ASCII
  initInfos(start: number = 0, end: number = 255) {
    if (start > end) return; // Condição de parada da recursão

    const hex = this.decimalToHex(start); // Converte para hexadecimal
    const decimal = start.toString(); // Mantém o valor decimal
    const octal = this.decimalToOctal(start); // Converte para octal
    const binary = this.decimalToBinary(start); // Converte para binário
    let html;
    if (start >= 32 && start <= 126) { // Verifica se está dentro do intervalo imprimível
      html = `&#${start};`; // Obtém a representação HTML
    } else if (start === 127) {
      html = 'DEL'; // Caractere especial DEL
    } else {
      html = '&nbsp;'; // Espaço em branco para caracteres não imprimíveis
    }
    const charCode = this.getAsciiRepresentation(start); // Obtém a representação ASCII
    this.infos.push({ hex, decimal, octal, binary, html, charCode }); // Adiciona as informações ao array

    // Chamada recursiva para o próximo código ASCII
    this.initInfos(start + 1, end);
  }


  // Método para converter decimal para hexadecimal
  decimalToHex(decimal: number): string {
    return decimal.toString(16).toUpperCase().padStart(2, '0'); // Converte e formata para duas casas hexadecimais
  }

  // Método para converter decimal para binário
  decimalToBinary(decimal: number): string {
    return decimal.toString(2).padStart(8, '0'); // Converte e formata para oito dígitos binários
  }

  // Método para converter decimal para octal
  decimalToOctal(decimal: number): string {
    return decimal.toString(8).padStart(3, '0'); // Converte e formata para três dígitos octais
  }

  // Método para obter a representação ASCII
  getAsciiRepresentation(code: number): string {
    if (code >= 0 && code <= 32) { // Verifica se está dentro do intervalo dos códigos de controle
      // Array com nomes e descrições dos caracteres de controle
      return controlCharacters[code]; // Retorna o nome e descrição do caractere de controle
    } else if (code === 127) { // Verifica se é o caractere DEL
      return 'DEL (Delete) - Deletar'; // Retorna a descrição do caractere DEL
    } else {
      return String.fromCharCode(code); // Retorna o caractere correspondente ao código
    }
  }
}
