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
  titleIds: string[] = [
    'titleCount',
    'entityTitleCount',
    'lsiTitleCount',
    'variationTitleCount',
    'titleRequired',
    'entityTitleRequired',
    'lsiTitleRequired',
    'variationTitleRequired',
  ];

  descrIds: string[] = [
    'DescrCount',
    'entityDescrCount',
    'lsiDescrCount',
    'variationDescrCount',
    'DescrRequired',
    'entityDescrRequired',
    'lsiDescrRequired',
    'variationDescrRequired',
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

    const allElements = this.el.nativeElement.querySelectorAll('[id]');
    allElements.forEach((element: HTMLElement) => {
      const id = element.getAttribute('id');
      if (id && !this.titleIds.includes(id)) {
        if (this.blurState) {
          this.renderer.setStyle(element, 'filter', 'blur(5px)');
        } else {
          this.renderer.removeStyle(element, 'filter');
        }
      }
    });
  }

  DescrBlur(): void {
    console.log('description button pressed');

    this.blurState = !this.blurState;

    const allElements = this.el.nativeElement.querySelectorAll('[id]');
    allElements.forEach((element: HTMLElement) => {
      const id = element.getAttribute('id');
      if (id && !this.descrIds.includes(id)) {
        if (this.blurState) {
          this.renderer.setStyle(element, 'filter', 'blur(5px)');
        } else {
          this.renderer.removeStyle(element, 'filter');
        }
      }
    });
  }
}
