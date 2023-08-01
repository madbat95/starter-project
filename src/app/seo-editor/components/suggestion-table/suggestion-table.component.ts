import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestion-table',
  templateUrl: './suggestion-table.component.html',
  styleUrls: ['./suggestion-table.component.scss'],
})
export class SuggestionTableComponent implements OnInit {
  listOfData: any[] = [];

  ngOnInit(): void {
    this.listOfData = [
      {
        name: 'Entities',
      },
      {
        name: 'LSI Keywords',
      },
      {
        name: 'Variations',
      },
      {
        name: 'Words/Tags',
      },
    ];
  }
}
