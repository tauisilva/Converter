import { KeyValuePipe, NgFor } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';

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
        hex: charCode.toString(16).toUpperCase(),
        ascii: charCode >= 32 && charCode <= 126 ? char : '',
        binary: charCode.toString(2).padStart(8, '0'),
        decimal: charCode.toString(10),
        octal: charCode.toString(8),
      };
      this.completeConversion['hex'] = this.completeConversion['hex'] || [];
      this.completeConversion['ascii'] = this.completeConversion['ascii'] || [];
      this.completeConversion['binary'] = this.completeConversion['binary'] || [];
      this.completeConversion['decimal'] = this.completeConversion['decimal'] || [];
      this.completeConversion['octal'] = this.completeConversion['octal'] || [];

      this.completeConversion['hex'].push(this.convertedValues[char].hex);
      this.completeConversion['ascii'].push(this.convertedValues[char].ascii);
      this.completeConversion['binary'].push(this.convertedValues[char].binary);
      this.completeConversion['decimal'].push(this.convertedValues[char].decimal);
      this.completeConversion['octal'].push(this.convertedValues[char].octal);
    }
  }
}
