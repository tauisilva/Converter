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
  @Input() value: any;
  private service = inject(TableService);
  type: string = '';
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

  async ngOnInit(): Promise<void> {
    await this.convertValues();
  }

  async convertValues(): Promise<void> {
    const valueType = await this.service.detectType(this.value);
    this.type = valueType;
    switch (valueType) {
      case 'binary':
        this.convertBinary();
        break;
      case 'octal':
        this.convertOctal();
        break;
      case 'decimal':
        this.convertDecimal();
        break;
      case 'hex':
        this.convertHex();
        break;
      default:
        this.convertAscii();
    }
  }

  convertAscii(): void {
    for (const char of this.value) {
      const charCode = char.charCodeAt(0);
      this.convertedValues[char] = this.service.convertToValues(charCode);
      this.updateCompleteConversion(this.convertedValues[char]);
    }
  }

  convertBinary(): void {
    let binaryBytes = this.value.replace(/\s+/g, '').match(/.{1,8}/g);
    if (!binaryBytes) {
      binaryBytes = this.value.split(',');
      if (!binaryBytes[0]) {
        binaryBytes = this.value.split('|');
      }
    }
    if (!binaryBytes || binaryBytes.length === 0) {
      console.error('Formato binário inválido.');
      return;
    }

    for (const binaryStr of binaryBytes) {
      const decimal = parseInt(binaryStr, 2);
      this.convertedValues[binaryStr] = this.service.convertToValues(decimal);
      this.updateCompleteConversion(this.convertedValues[binaryStr]);
    }
  }

  convertOctal(): void {
    let octalBytes = this.value.replace(/\s+/g, '').match(/.{1,3}/g);
    if (!octalBytes) {
      octalBytes = this.value.split(',');
      if (!octalBytes[0]) {
        octalBytes = this.value.split('|');
      }
    }
    if (!octalBytes || octalBytes.length === 0) {
      console.error('Formato octal inválido.');
      return;
    }

    for (const octalStr of octalBytes) {
      const decimal = parseInt(octalStr, 8);
      this.convertedValues[octalStr] = this.service.convertToValues(decimal);
      this.updateCompleteConversion(this.convertedValues[octalStr]);
    }
  }

  convertDecimal(): void {
    let decimalValues = this.value.replace(/\s+/g, '').split(',');
    if (decimalValues.length === 0 || decimalValues[0] === '') {
      decimalValues = this.value.split('|');
    }
    if (decimalValues.length === 0 || decimalValues[0] === '') {
      console.error('Formato decimal inválido.');
      return;
    }

    for (const decimalStr of decimalValues) {
      const decimal = parseInt(decimalStr, 10);
      this.convertedValues[decimalStr] = this.service.convertToValues(decimal);
      this.updateCompleteConversion(this.convertedValues[decimalStr]);
    }
  }

  convertHex(): void {
    let hexValues = this.value.replace(/\s+/g, '').split(',');
    if (hexValues.length === 0 || hexValues[0] === '') {
      hexValues = this.value.split('|');
    }
    if (hexValues.length === 0 || hexValues[0] === '') {
      console.error('Formato hexadecimal inválido.');
      return;
    }

    for (const hexStr of hexValues) {
      const decimal = parseInt(hexStr, 16);
      this.convertedValues[hexStr] = this.service.convertToValues(decimal);
      this.updateCompleteConversion(this.convertedValues[hexStr]);
    }
  }

  private updateCompleteConversion(values: any): void {
    this.service.setValues(values, this.completeConversion);
  }
}
