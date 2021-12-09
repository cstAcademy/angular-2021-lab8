import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ElementService } from '../core/services/element.service';
import { ElementDialogComponent } from '../element-dialog/element-dialog.component';

@Component({
  selector: 'app-elements-table',
  templateUrl: './elements-table.component.html',
  styleUrls: ['./elements-table.component.css'],
})
export class ElementsTableComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource!:any;
  elementList!:any;
  symbolSearchValue!: string;

  constructor(public dialog: MatDialog, private elementService:ElementService) {}

  ngOnInit(): void {
    this.elementList = this.elementService.getElementList()
    this.dataSource = new MatTableDataSource(this.elementList);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  
  openDialog() {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.elementList.push(result.value);
        this.dataSource.data = this.elementList;
      }
    });
  }

  onDelete(row:any){
    console.log('Delete', row);
    const index = this.elementList.indexOf(row);
    if (index > -1) {
      this.elementList.splice(index, 1);
      this.dataSource.data = this.elementList;
    }
  }

  onEdit(row:any){
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '300px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const elementIndex = this.elementList.findIndex((element:any) => element.position == result.value.position);
        this.elementList[elementIndex].name = result.value.name;
        this.elementList[elementIndex].symbol = result.value.symbol;
        this.elementList[elementIndex].weight = result.value.weight;
      }
    });
  }


  searchBySymbol() {
    console.log(this.symbolSearchValue);
    this.dataSource.data = this.elementList.filter((e:any) => e.symbol.toLowerCase() === this.symbolSearchValue);
  }

  clearSymbolSearch() {
    this.symbolSearchValue = "";
    this.dataSource = new MatTableDataSource(this.elementList);
  }
}
