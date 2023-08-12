import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';

@Component({
  selector: 'app-suggestion-table',
  templateUrl: './suggestion-table.component.html',
  styleUrls: ['./suggestion-table.component.scss'],
})
export class SuggestionTableComponent implements OnInit {
  tableData: any;
  blurState: boolean = false; // Keep track of blur state
  cellIdsToBlur: string[] = [
    'titleCount',
    'entityTitleCount',
    'lsiTitleCount',
    'variationTitleCount',
  ];

  constructor(
    private wordCounter: WordCounterService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.tableData = this.wordCounter.wordCount;
    console.log(this.tableData);
  }

  titleBlur(): void {
    console.log('button pressed');

    this.blurState = !this.blurState;

    this.cellIdsToBlur.forEach((id) => {
      const element = this.el.nativeElement.querySelector(`#${id}`);
      if (element) {
        if (this.blurState) {
          this.renderer.setStyle(element, 'filter', 'blur(5px)');
        } else {
          this.renderer.removeStyle(element, 'filter');
        }
      }
    });
  }
}
