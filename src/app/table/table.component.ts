import { KeyValuePipe, NgFor } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, KeyValuePipe, ScrollPanelModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  @Input() value: any; // Valor de entrada fornecido para a tabela
  private service = inject(TableService); // Serviço para lidar com operações de tabela
  type: string = ''; // Tipo do valor fornecido
  completeConversion: { [key: string]: string[] } = {}; // Conversão completa dos valores
  convertedValues: { // Valores convertidos para cada formato
    [key: string]: {
      caractere: string,
      hex: string,
      ascii: string,
      binary: string,
      decimal: string,
      octal: string
    }
  } = {};

  async ngOnInit(): Promise<void> {
    await this.convertValues(); // Inicia a conversão dos valores na inicialização do componente
  }

  async convertValues(): Promise<void> {
    const valueType = await this.service.detectType(this.value); // Detecta o tipo do valor fornecido
    this.type = valueType; // Atualiza o tipo
    switch (valueType) {
      case 'binary':
        this.convertBinary(); // Converte valores binários
        break;
      case 'octal':
        this.convertOctal(); // Converte valores octais
        break;
      case 'decimal':
        this.convertDecimal(); // Converte valores decimais
        break;
      case 'hex':
        this.convertHex(); // Converte valores hexadecimais
        break;
      default:
        this.convertAscii(); // Converte valores ASCII ou de outra forma
    }
  }

  // Método para converter valores ASCII
  convertAscii(): void {
    for (const char of this.value) {
      const charCode = char.charCodeAt(0); // Obtém o código ASCII do caractere
      this.convertedValues[char] = this.service.convertToValues(charCode); // Converte para diferentes formatos
      this.updateCompleteConversion(this.convertedValues[char]); // Atualiza a conversão completa
    }
  }

  // Método para converter valores binários
  convertBinary(): void {
    let binaryBytes = this.value.replace(/\s+/g, '').match(/.{1,8}/g); // Separa os bytes binários
    if (!binaryBytes) {
      binaryBytes = this.value.split(','); // Separa por vírgula se não houver espaços
      if (!binaryBytes[0]) {
        binaryBytes = this.value.split('|'); // Separa por barra vertical se não houver vírgulas
      }
    }
    if (!binaryBytes || binaryBytes.length === 0) {
      console.error('Formato binário inválido.'); // Log de erro para formato inválido
      return;
    }

    for (const binaryStr of binaryBytes) {
      const decimal = parseInt(binaryStr, 2); // Converte para decimal
      this.convertedValues[binaryStr] = this.service.convertToValues(decimal); // Converte para diferentes formatos
      this.updateCompleteConversion(this.convertedValues[binaryStr]); // Atualiza a conversão completa
    }
  }

  // Método para converter valores octais
  convertOctal(): void {
    let octalBytes = this.value.replace(/\s+/g, '').match(/.{1,3}/g); // Separa os bytes octais
    if (!octalBytes) {
      octalBytes = this.value.split(','); // Separa por vírgula se não houver espaços
      if (!octalBytes[0]) {
        octalBytes = this.value.split('|'); // Separa por barra vertical se não houver vírgulas
      }
    }
    if (!octalBytes || octalBytes.length === 0) {
      console.error('Formato octal inválido.'); // Log de erro para formato inválido
      return;
    }

    for (const octalStr of octalBytes) {
      const decimal = parseInt(octalStr, 8); // Converte para decimal
      this.convertedValues[octalStr] = this.service.convertToValues(decimal); // Converte para diferentes formatos
      this.updateCompleteConversion(this.convertedValues[octalStr]); // Atualiza a conversão completa
    }
  }

  // Método para converter valores decimais
  convertDecimal(): void {
    let decimalValues = this.value.replace(/\s+/g, '').split(','); // Separa os valores decimais
    if (decimalValues.length === 0 || decimalValues[0] === '') {
      decimalValues = this.value.split('|'); // Separa por barra vertical se não houver vírgulas
    }
    if (decimalValues.length === 0 || decimalValues[0] === '') {
      console.error('Formato decimal inválido.'); // Log de erro para formato inválido
      return;
    }

    for (const decimalStr of decimalValues) {
      const decimal = parseInt(decimalStr, 10); // Mantém o valor decimal
      this.convertedValues[decimalStr] = this.service.convertToValues(decimal); // Converte para diferentes formatos
      this.updateCompleteConversion(this.convertedValues[decimalStr]); // Atualiza a conversão completa
    }
  }

  // Método para converter valores hexadecimais
  convertHex(): void {
    let hexValues = this.value.replace(/\s+/g, '').split(','); // Separa os valores hexadecimais
    if (hexValues.length === 0 || hexValues[0] === '') {
      hexValues = this.value.split('|'); // Separa por barra vertical se não houver vírgulas
    }
    if (hexValues.length === 0 || hexValues[0] === '') {
      console.error('Formato hexadecimal inválido.'); // Log de erro para formato inválido
      return;
    }

    for (const hexStr of hexValues) {
      const decimal = parseInt(hexStr, 16); // Converte para decimal
      this.convertedValues[hexStr] = this.service.convertToValues(decimal); // Converte para diferentes formatos
      this.updateCompleteConversion(this.convertedValues[hexStr]); // Atualiza a conversão completa
    }
  }

  // Método privado para atualizar a conversão completa dos valores
  private updateCompleteConversion(values: any): void {
    this.service.setValues(values, this.completeConversion); // Chama o serviço para atualizar os valores
  }
}
