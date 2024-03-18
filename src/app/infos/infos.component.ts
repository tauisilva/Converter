import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { caracteresDeControle } from './caracteres';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [
    InputTextModule,
    TabViewModule,
    NgFor,
    TableModule,
    MultiSelectModule,
    FormsModule,
    ButtonModule,
    ScrollPanelModule,
    DialogModule
  ],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class InfosComponent implements OnInit {
  infos: any[] = [];
  cols: any[] = [];
  caracInfos = caracteresDeControle;
  visible: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.iniCols();
    this.initInfos();
    console.log(this.caracInfos)
  }

  iniCols() {
    this.cols = [
      { field: 'hex', header: 'HEX' },
      { field: 'charCode', header: 'CHARCODE' },
      { field: 'binary', header: 'BINÁRIO' },
      { field: 'decimal', header: 'DECIMAL' },
      { field: 'octal', header: 'OCTAL' }
    ];
  }

  initInfos() {
    for (let i = 0; i < 256; i++) {
      const hex = this.decimalToHex(i);
      const charCode = this.getAsciiRepresentation(i);
      const binary = this.decimalToBinary(i);
      const decimal = i.toString();
      const octal = this.decimalToOctal(i);

      this.infos.push({ hex, binary, decimal, octal, charCode });
    }
  }


  decimalToHex(decimal: number): string {
    return decimal.toString(16).toUpperCase().padStart(2, '0');
  }

  decimalToBinary(decimal: number): string {
    return decimal.toString(2).padStart(8, '0');
  }

  decimalToOctal(decimal: number): string {
    return decimal.toString(8).padStart(3, '0');
  }


  getAsciiRepresentation(code: number): string {
    if (code >= 0 && code < 32) {
      const controlCharacters = [
        'NUL (NULL)', 'SOH (Start of Heading)', 'STX (Start of Text)',
        'ETX (End of Text)', 'EOT (End of Transmission)',
        'ENQ (Enquiry)', 'ACK (Acknowledgement)', 'BEL (Bell)',
        'BS (Backspace)', 'HT (Horizontal Tab)', 'LF (Line Feed)',
        'VT (Vertical Tab)', 'FF(Form Feed)', 'CR (Carriage Return)',
        'SO (Shift Out)', 'SI (Shift In)', 'DLE (Data Link Escape)', 'DC1 (Device Control 1)',
        'DC2 (Device Control 2)', 'DC3 (Device Control 3)',
        'DC4(Device Control 4)', 'NAK (Negative Acknowledgement)', 'SYN (Synchronous Idle)',
        'ETB (End of Transmission Block)', 'CAN(cancel)', 'EM (End of Medium)',
        'SUB (Substitute)', 'ESC (Escape)', 'FS (File Separator)', 'GS (Group Separator)',
        'RS (Record Separator)', 'US (Unit Separator)'
      ];
      return controlCharacters[code];
    } else if (code === 127) {
      return 'DEL';
    } else {
      return String.fromCharCode(code);
    }
  }
}