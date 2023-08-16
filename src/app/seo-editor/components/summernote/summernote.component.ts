import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-summernote',
  templateUrl: './summernote.component.html',
  styleUrls: ['./summernote.component.scss'],
})
export class SummernoteComponent implements OnInit {
  declare $: any;
  constructor(
    private wordCounter: WordCounterService,
    private route: ActivatedRoute
  ) {}
  id: any;
  editorContent = '';
  uniqueWords: Set<string> = new Set();

  editorConfig = {
    placeholder: 'Add text here...',
    tabsize: 2,
    height: 183,
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear',
        ],
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'hr']],
      ['offer', ['offer']],
      ['dispute', ['dispute']],
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
  @Output() onWordObject = new EventEmitter<any>();
  @Output() onWordCount = new EventEmitter<any>();
  @Output() onEditorContent = new EventEmitter<any>();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
    });
  }

  onEditorKeyUp(text: any) {
    this.onEditorContent.emit({ report: this.id, content: this.editorContent });
    console.log({ report: this.id, content: this.editorContent });

    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    console.log('doc', doc.body);

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

    this.uniqueWords.clear(); // Clear the uniqueWords Set

    const cleanedText = text.replace(/<\/?[^>]+(>|$)/g, ' ');

    const words = cleanedText.split(/\s+/);

    this.wordCounter.wordCountCalculate(cleanedText, 'summer_note');
  }
}
