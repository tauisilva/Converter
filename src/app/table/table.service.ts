import { Injectable } from '@angular/core';
import { controlChar } from '../infos/caracteres';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  detectType(value: any): Promise<string> {
    return new Promise((resolve) => {
      if (/^[01\s]+$/.test(value.trim())) {
        resolve('binary');
      } else if (/^[0-7\s]+$/.test(value.trim())) {
        resolve('octal');
      } else if (/^0*[1-9]\d*$/.test(value.trim())) {
        resolve('decimal');
      } else if (/^[0-9A-F\s,|]+$/i.test(value.trim())) {
        resolve('hex');
      } else if (/^[\x00-\x7F]*$/.test(value.trim())) {
        resolve('ascii');
      } else {
        resolve('string');
      }
    });
  }
  


  convertToValues(charCode: number): any {
    return {
      caractere: String.fromCharCode(charCode),
      hex: charCode.toString(16).toUpperCase(),
      ascii: this.getAscii(charCode),
      binary: charCode.toString(2).padStart(8, '0'),
      decimal: charCode.toString(10),
      octal: charCode.toString(8),
    };
  }

  getAscii(code: number): string {
    if (code >= 0 && code <= 32) {
      return controlChar[code];

    } else if (code === 127) {
      return 'DEL (Delete) - Deletar';
    } else {
      return String.fromCharCode(code);
    }
  }

  setValues(values: any, completeConversion: { [key: string]: string[] }): void {
    completeConversion['caractere'] = completeConversion['caractere'] || [];
    completeConversion['hex'] = completeConversion['hex'] || [];
    completeConversion['ascii'] = completeConversion['ascii'] || [];
    completeConversion['binary'] = completeConversion['binary'] || [];
    completeConversion['decimal'] = completeConversion['decimal'] || [];
    completeConversion['octal'] = completeConversion['octal'] || [];

    completeConversion['caractere'].push(values.caractere);
    completeConversion['hex'].push(values.hex);
    completeConversion['ascii'].push(values.ascii);
    completeConversion['binary'].push(values.binary);
    completeConversion['decimal'].push(values.decimal);
    completeConversion['octal'].push(values.octal);
  }
}
