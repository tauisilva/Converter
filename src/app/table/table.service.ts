import { Injectable } from '@angular/core';
import { controlChar } from '../infos/caracteres';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  // Método para detectar o tipo do valor fornecido
  detectType(value: any): Promise<string> {
    return new Promise((resolve) => {
      // Verifica se o valor é uma sequência binária
      if (/^[01\s]+$/.test(value.trim())) {
        resolve('binário');
      } else if (/^[0-7\s]+$/.test(value.trim())) {
        // Verifica se o valor é uma sequência octal
        resolve('octal');
      } else if (/^0*[1-9]\d*$/.test(value.trim())) {
        // Verifica se o valor é uma sequência decimal
        resolve('decimal');
      } else if (/^[0-9A-F\s,|]+$/i.test(value.trim())) {
        // Verifica se o valor é uma sequência hexadecimal
        resolve('hexadecimal');
      } else if (/^[\x00-\x7F]*$/.test(value.trim())) {
        // Verifica se o valor é uma sequência ASCII
        resolve('ascii');
      } else {
        // Se nenhum dos casos acima corresponder, considera como uma sequência de caracteres
        resolve('string');
      }
    });
  }

  // Método para converter um código de caractere em diversos formatos
  convertToValues(charCode: number): any {
    return {
      caractere: String.fromCharCode(charCode), // Obtém o caractere correspondente ao código
      hex: charCode.toString(16).toUpperCase(), // Converte para hexadecimal
      ascii: this.getAscii(charCode), // Obtém a representação ASCII
      binary: charCode.toString(2).padStart(8, '0'), // Converte para binário
      decimal: charCode.toString(10), // Mantém o valor em decimal
      octal: charCode.toString(8), // Converte para octal
    };
  }

  // Método para obter a representação ASCII de um código de caractere
  getAscii(code: number): string {
    if (code >= 0 && code <= 32) {
      // Retorna a representação ASCII para códigos de controle
      return controlChar[code];
    } else if (code === 127) {
      // Caso especial para o código de controle "DEL"
      return 'DEL (Delete) - Deletar';
    } else {
      // Para outros códigos, retorna o caractere correspondente
      return String.fromCharCode(code);
    }
  }

  // Método para configurar os valores de conversão completos
  setValues(values: any, completeConversion: { [key: string]: string[] }): void {
    // Inicializa as listas no objeto completeConversion, se não existirem
    completeConversion['caractere'] = completeConversion['caractere'] || [];
    completeConversion['hex'] = completeConversion['hex'] || [];
    completeConversion['ascii'] = completeConversion['ascii'] || [];
    completeConversion['binary'] = completeConversion['binary'] || [];
    completeConversion['decimal'] = completeConversion['decimal'] || [];
    completeConversion['octal'] = completeConversion['octal'] || [];

    // Adiciona os valores fornecidos às respectivas listas
    completeConversion['caractere'].push(values.caractere);
    completeConversion['hex'].push(values.hex);
    completeConversion['ascii'].push(values.ascii);
    completeConversion['binary'].push(values.binary);
    completeConversion['decimal'].push(values.decimal);
    completeConversion['octal'].push(values.octal);
  }
}

