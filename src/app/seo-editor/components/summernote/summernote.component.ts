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
    this.onWordObject.emit(this.wordCounter.wordObject);
    // this.onWordCount.emit(this.wordCounter.wordCount);
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
    this.onWordCount.emit(wordCount);

    // this code block will reset the word counts
    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      for (const word of this.wordCounter.wordObject[entityType]) {
        word.count = 0;
      }
    }

    this.uniqueWords.clear(); // Clear the uniqueWords Set

    // Remove HTML entities representing spaces (&nbsp;), <p> tags, and <br> tags from the text
    const cleanedText = text.replace(/<\/?[^>]+(>|$)/g, ' ');

    const words = cleanedText.split(/\s+/);

    words.forEach((word) => {
      // Check if the word is not empty and not containing only spaces
      if (word.trim().length > 0) {
        for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
          if (this.wordCounter.isWordInWordObject(word, entityType)) {
            const entityArray = this.wordCounter.wordObject[entityType];
            const matchingWord = entityArray.find(
              (entity) => entity.word === word
            );
            if (matchingWord) {
              matchingWord.count++;
            }
          }
        }
      }
    });

    this.onWordObject.emit(this.wordCounter.wordObject);
  }
}
