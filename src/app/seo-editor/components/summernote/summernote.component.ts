import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';
import { HtmlContentService } from 'src/app/shared/services/html-content.service';
import { EditorContentService } from 'src/app/shared/services/editor-content.service';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';

@Component({
  selector: 'app-summernote',
  templateUrl: './summernote.component.html',
  styleUrls: ['./summernote.component.scss'],
})
export class SummernoteComponent implements OnInit {
  constructor(
    private wordCounter: WordCounterService,
    private route: ActivatedRoute,
    private contentSerevice: HtmlContentService,
    private editorContentService: EditorContentService,
    public tableLoaderService: TableLoaderService
  ) {}
  id: any;
  editorContent = '';
  isLoading = false;

  editorConfig = {
    theme: 'bs4-dark',
    placeholder: 'Add text here...',
    tabsize: 2,
    height: 230,
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['undo', 'redo']],
      [
        'font',
        [
          'bold',
          'italic'
        ],
      ],
      ['fontsize', ['fontname', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', [ 'link', 'hr']],
    ],
    fontNames: [
      'Helvetica',
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      'Roboto',
      'Times',
    ],
  };

  @Input() isDisabled: boolean = false;
  @Output() onEditorContent = new EventEmitter<any>();

  ngOnInit(): void {
    this.editorContentService
      .getScrapedDataObservable()
      .subscribe((data: string) => {
        this.editorContent = data;
        this.onEditorKeyUp(data);
      });

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.id = +params.get('id');
          return this.contentSerevice.getContentById(this.id);
        })
      )
      .subscribe((response: any) => {
        if (response.length) this.editorContent = response[0].content;
        this.onEditorKeyUp(this.editorContent);
      });
  }

  onEditorKeyUp(text: any) {
    console.log('loading true');

    this.onEditorContent.emit({
      report: this.id,
      content: this.editorContent,
    });

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    const wordCount = this.wordCounter.countWordsInHeadersAndContent(doc.body, [
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
    ]);

    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      this.wordCounter.wordCount[entityType].headers.H1 =
        wordCount[entityType].headers.H1;
      this.wordCounter.wordCount[entityType].headers.H2 =
        wordCount[entityType].headers.H2;
      this.wordCounter.wordCount[entityType].headers.H3 =
        wordCount[entityType].headers.H3;
      this.wordCounter.wordCount[entityType].headers.H4 =
        wordCount[entityType].headers.H4;
      this.wordCounter.wordCount[entityType].headers.H5 =
        wordCount[entityType].headers.H5;
      this.wordCounter.wordCount[entityType].headers.H6 =
        wordCount[entityType].headers.H6;
      this.wordCounter.wordCount[entityType].content =
        wordCount[entityType].content;
    }

    // // this code block will reset the word counts
    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      for (const word of this.wordCounter.wordObject[entityType]) {
        word.count.summer_note = 0;
      }
    }
    const cleanedText = text
      .replace(/<\/?[^>]+(>|$)/g, ' ')
      .replace(/&nbsp;+/g, '');
    this.wordCounter.wordCountCalculate(cleanedText, 'summer_note');

    for (const headerTag of ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']) {
      this.wordCounter.calculateHeaderTagWordCount(
        headerTag,
        this.editorContent
      );
    }
  }
}
