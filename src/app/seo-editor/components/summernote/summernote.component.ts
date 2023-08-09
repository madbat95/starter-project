import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';

@Component({
  selector: 'app-summernote',
  templateUrl: './summernote.component.html',
  styleUrls: ['./summernote.component.scss'],
})
export class SummernoteComponent implements OnInit {
  constructor(private wordCounter: WordCounterService) {}

  editorContent = '';
  uniqueWords: Set<string> = new Set();

  editorConfig = {
    placeholder: 'Add text here...',
    tabsize: 2,
    height: 183,
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
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

  @Output() onWordObject = new EventEmitter<any>();
  @Output() onWordCount = new EventEmitter<any>();

  ngOnInit(): void {
    // this.onWordObject.emit(this.wordCounter.wordObject);
  }

  onEditorKeyUp(text: any) {
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
    console.log('wordCount', wordCount);
    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      this.wordCounter.wordCount[entityType].headers =
        wordCount[entityType].headers;
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

    // Remove HTML entities representing spaces (&nbsp;), <p> tags, and <br> tags from the text
    const cleanedText = text.replace(/<\/?[^>]+(>|$)/g, ' ');

    const words = cleanedText.split(/\s+/);
    console.log(words);

    this.wordCounter.wordCountCalculate(cleanedText, 'summer_note');

    // this.onWordObject.emit(this.wordCounter.wordObject);
  }
}
