import { KeyValuePipe, NgFor } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { controlChar } from '../infos/caracteres';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, KeyValuePipe, ScrollPanelModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent {
  @Input() value: string = '';
  cols: any[] = [];
  completeConversion: { [key: string]: string[] } = {};
  convertedValues: {
    [key: string]:
    {
      caractere: string,
      hex: string,
      ascii: string,
      binary: string,
      decimal: string,
      octal: string
    }
  } = {};

  ngOnInit(): void {
    for (const char of this.value) {
      const charCode = char.charCodeAt(0);
      this.convertedValues[char] = {
        caractere: char,
        hex: charCode.toString(16).toUpperCase(),
        ascii: this.getAsciiRepresentation(charCode),
        binary: charCode.toString(2).padStart(8, '0'),
        decimal: charCode.toString(10),
        octal: charCode.toString(8),
      };
      this.completeConversion['caractere'] = this.completeConversion['caractere'] || [];
      this.completeConversion['hex'] = this.completeConversion['hex'] || [];
      this.completeConversion['ascii'] = this.completeConversion['ascii'] || [];
      this.completeConversion['binary'] = this.completeConversion['binary'] || [];
      this.completeConversion['decimal'] = this.completeConversion['decimal'] || [];
      this.completeConversion['octal'] = this.completeConversion['octal'] || [];

      this.completeConversion['caractere'].push(this.convertedValues[char].caractere);
      this.completeConversion['hex'].push(this.convertedValues[char].hex);
      this.completeConversion['ascii'].push(this.convertedValues[char].ascii);
      this.completeConversion['binary'].push(this.convertedValues[char].binary);
      this.completeConversion['decimal'].push(this.convertedValues[char].decimal);
      this.completeConversion['octal'].push(this.convertedValues[char].octal);
    }
    setTimeout(() => {
      console.log(this.convertedValues)
    }, 500)
  }

  getAsciiRepresentation(code: number): string {
    if (code >= 0 && code <= 32) {
      return controlChar[code];

    } else if (code === 127) {
      return 'DEL (Delete) - Deletar';
    } else {
      return String.fromCharCode(code);
    }
  }

}
