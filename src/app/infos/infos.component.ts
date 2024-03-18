import { NgFor, NgIf } from '@angular/common';
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
    InputTextModule, TabViewModule,
    NgFor, NgIf, TableModule,
    MultiSelectModule, FormsModule,
    ButtonModule, ScrollPanelModule,
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
      { field: 'decimal', header: 'DECIMAL' },
      { field: 'octal', header: 'OCTAL' },
      { field: 'binary', header: 'BINÁRIO' },
      { field: 'charCode', header: 'CHARCODE' },
      { field: 'html', header: 'HTML', escape: false },
    ];
  }

  initInfos() {
    for (let i = 0; i < 256; i++) {
      const hex = this.decimalToHex(i);
      const decimal = i.toString();
      const octal = this.decimalToOctal(i);
      const binary = this.decimalToBinary(i);
      let html;
      if (i >= 32 && i <= 126) {
        html = `&#${i};`;
      } else if (i === 127) {
        html = 'DEL';
      } else {
        html = '&nbsp;';
      }
      const charCode = this.getAsciiRepresentation(i);
      this.infos.push({ hex, decimal, octal, binary, html, charCode });
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
    if (code >= 0 && code <= 32) {
      const controlCharacters = [
        'NUL (NULL) - Nulo',
        'SOH (Start of Heading) - Início do cabeçalho',
        'STX (Start of Text) - Início do texto',
        'ETX (End of Text) - Fim do texto',
        'EOT (End of Transmission) - Fim da transmissão',
        'ENQ (Enquiry) - Interrogação',
        'ACK (Acknowledgement) - Confirmação',
        'BEL (Bell) - Sino',
        'BS (Backspace) - Retrocesso',
        'HT (Horizontal Tab) - Tabulação Horizontal',
        'LF (Line Feed) - Avanço de linha',
        'VT (Vertical Tab) - Tabulação Vertical',
        'FF (Form Feed) - Avanço de página',
        'CR (Carriage Return) - Retorno de Carro',
        'SO (Shift Out) - Deslocamento para fora',
        'SI (Shift In) - Deslocamento para dentro',
        'DLE (Data Link Escape) - Escape de Link de Dados',
        'DC1 (Device Control 1) - Controle de Dispositivo 1',
        'DC2 (Device Control 2) - Controle de Dispositivo 2',
        'DC3 (Device Control 3) - Controle de Dispositivo 3',
        'DC4 (Device Control 4) - Controle de Dispositivo 4',
        'NAK (Negative Acknowledgement) - Resposta Negativa',
        'SYN (Synchronous Idle) - Ocioso Síncrono',
        'ETB (End of Transmission Block) - Fim do Bloco de Transmissão',
        'CAN (Cancel) - Cancelamento',
        'EM (End of Medium) - Fim do Meio',
        'SUB (Substitute) - Substituto',
        'ESC (Escape) - Escape',
        'FS (File Separator) - Separador de Arquivo',
        'GS (Group Separator) - Separador de Grupo',
        'RS (Record Separator) - Separador de Registro',
        'US (Unit Separator) - Separador de Unidade',
        'SPACE ( " " ) - Espaço em branco'
      ];
      return controlCharacters[code];
    } else if (code === 127) {
      return 'DEL (Delete) - Deletar';
    } else {
      return String.fromCharCode(code);
    }

  }
}