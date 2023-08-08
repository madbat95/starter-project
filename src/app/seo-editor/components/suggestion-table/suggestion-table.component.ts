import { Component, Input, OnInit } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';

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
  constructor(private wordCounter: WordCounterService) {}
  ngOnInit(): void {
    this.tableData = this.wordCounter.wordCount;
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
