import { Component, OnInit } from '@angular/core';
import * as papa from 'papaparse';
export interface PeriodicElement {
  name: string;
  position: number; marketPercent: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', marketPercent: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', marketPercent: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', marketPercent: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', marketPercent: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', marketPercent: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', marketPercent: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', marketPercent: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', marketPercent: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', marketPercent: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', marketPercent: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-file-piker',
  templateUrl: './file-piker.component.html',
  styleUrls: ['./file-piker.component.css']
})
export class FilePikerComponent implements OnInit {
  csvData: any[] = [];
  headerRow: any[] = [];
  uploaded = false;
  displayedColumns: string[] = ['position', 'name',  marketPercent, 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor() { }
  public changeListener(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      const file : File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        // @ts-ignore
        const csv: string = reader.result;
        this.extractData(csv);
        console.log(this.csvData);
      };
    }
  }
  private extractData(res) {
    const parsedData = papa.parse(res).data;
    this.headerRow = parsedData[0];
    parsedData.splice(0, 1);
    this.csvData = parsedData;
  }
  ngOnInit() {
  }

}
