import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion-table',
  templateUrl: './suggestion-table.component.html',
  styleUrls: ['./suggestion-table.component.scss'],
})
export class SuggestionTableComponent implements OnInit {
  tableData: any;
  @Input() set data(val: any) {
    this.tableData = val;
  }

  ngOnInit(): void {
    // this.listOfData = [
    //   {
    //     name: 'Entities',
    //   },
    //   {
    //     name: 'LSI Keywords',
    //   },
    //   {
    //     name: 'Variations',
    //   },
    //   {
    //     name: 'Words/Tags',
    //   },
    // ];
  }
}
