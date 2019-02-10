import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as papa from 'papaparse';
export interface PeriodicElement {
  name: string;
  percent1: number; percent2: number;
  difference: number;
}

let ELEMENT_DATA: PeriodicElement[] = [
];
@Component({
  selector: 'app-file-piker',
  templateUrl: './file-piker.component.html',
  styleUrls: ['./file-piker.component.css']
})
export class FilePikerComponent implements OnInit {
  csvData: any[] = [];
  headerRow: any[] = [];
  analyzed = false;
  uploaded = false;
  displayedColumns: string[] = ['name', 'percent1',  'percent2', 'difference'];
  dataSource = ELEMENT_DATA;
  constructor() { }
  public changeListener1(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        // @ts-ignore
        const csv: string = reader.result;
        this.extractData(csv);

        for ( let i = 0; i < this.csvData.length; i++) {
          let temp = this.csvData[5 + i][1];
          let percent = temp.toString().substring(2).substr(0  , 7);
          let num = parseFloat(percent);
          ELEMENT_DATA.push({  name: this.csvData[5 + i][0],
            percent1: num, percent2: 0,
            difference: 0});
        }
        console.log('element data is : ' + ELEMENT_DATA[0].percent1);
      };
    }
  }

  public changeListener2(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        // @ts-ignore
        const csv: string = reader.result;
        this.extractData(csv);

        for ( let i = 0; i < this.csvData.length; i++) {
          let temp = this.csvData[5 + i][1]; // this is the string value of percentage
          let percent = temp.toString().substring(2).substr(0, 7); // sub the = and " "
          let num =parseFloat(percent); // convert to number
          for ( let j = 0; j <ELEMENT_DATA.length; j++ ) {
            if (ELEMENT_DATA[j].name === this.csvData[5 + i][0]) {
              ELEMENT_DATA[j].percent2 = num;
              ELEMENT_DATA[j].difference = Math.round((ELEMENT_DATA[j].percent1 - num) * 100000) / 100000;
            }
          }
        }
        console.log('element data is : ' + ELEMENT_DATA[0].percent1);
      };
    }
  }
  private showbtn() {
    this.uploaded = true;
  }
  private extractData(res) {
    const parsedData = papa.parse(res).data;
    this.headerRow = parsedData[0];
    parsedData.splice(0, 1);
    this.csvData = parsedData;
  }
  private refresh() {
  this.analyzed = true;

  }
  ngOnInit() {
  }

}
