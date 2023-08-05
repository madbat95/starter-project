import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WordCountService } from '../../service/word-count.service';

@Component({
  selector: 'app-summernote',
  templateUrl: './summernote.component.html',
  styleUrls: ['./summernote.component.scss'],
})
export class SummernoteComponent implements OnInit {
  editorContent = '';
  uniqueWords: Set<string> = new Set();
  wordCountData: { [word: string]: number } = {};
  @Output() onWordCount = new EventEmitter<{ [word: string]: number }>();
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

  wordObject = {
    Entity: [
      {
        word: 'privacy',
        count: 0,
      },
      {
        word: 'data',
        count: 0,
      },
      {
        word: 'virginia',
        count: 0,
      },
      {
        word: 'veritext',
        count: 0,
      },
      {
        word: 'access',
        count: 0,
      },
      {
        word: 'security',
        count: 0,
      },
      {
        word: 'finance',
        count: 0,
      },
    ],
    Variations: [
      {
        word: 'alexandria',
        count: 0,
      },
      {
        word: 'videographers',
        count: 0,
      },
      {
        word: 'north',
        count: 0,
      },
      {
        word: 'breach',
        count: 0,
      },
      {
        word: 'statistics',
        count: 0,
      },
      {
        word: 'logistics',
        count: 0,
      },
      {
        word: 'finance',
        count: 0,
      },
    ],
    LSIKeywords: [
      {
        word: 'paper',
        count: 0,
      },
      {
        word: 'testimony',
        count: 0,
      },
      {
        word: 'chicago',
        count: 0,
      },
      {
        word: 'united',
        count: 0,
      },
      {
        word: 'manchester',
        count: 0,
      },
      {
        word: 'city',
        count: 0,
      },
      {
        word: 'trial',
        count: 0,
      },
    ],
  };

  ngOnInit(): void {
    this.onWordObject.emit(this.wordObject);
  }

  countWordsInHeadersAndContent(
    element,
    headerAncestors = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
  ) {
    const result = {
      content: 0,
      headers: {},
    };

    const nodeName = element.nodeName.toUpperCase();
    const isHeader = headerAncestors.includes(nodeName);

    if (isHeader) {
      result.headers[nodeName] =
        (result.headers[nodeName] || 0) + this.countWordsInElement(element);
    } else {
      if (element.nodeType === Node.TEXT_NODE) {
        result.content += this.countWordsInElement(element);
      } else {
        const childNodes = element.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
          const childResult = this.countWordsInHeadersAndContent(
            childNodes[i],
            headerAncestors
          );
          result.content += childResult.content;
          Object.entries(childResult.headers).forEach(([headerTag, count]) => {
            result.headers[headerTag] =
              (result.headers[headerTag] || 0) + count;
          });
        }
      }
    }

    return result;
  }

  countWordsInElement(element) {
    const text = element.textContent.trim();
    const words = text.split(/\s+/);
    let count = 0;

    words.forEach((word) => {
      if (this.isWordInWordObject(word)) {
        count++;
      }
    });

    return count;
  }

  isWordInWordObject(word) {
    for (const entityName of Object.values(this.wordObject)) {
      for (const entity of entityName) {
        if (entity.word === word) {
          return true;
        }
      }
    }
    return false;
  }

  // Example usage:

  onEditorKeyUp(text: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    console.log(doc.body);
    // const body = document.body;
    const wordCount = this.countWordsInHeadersAndContent(doc.body, [
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
    ]);
    console.log(wordCount);
    this.wordCountData = {}; // Reset the word count data
    this.uniqueWords.clear(); // Clear the uniqueWords Set

    // Remove HTML entities representing spaces (&nbsp;), <p> tags, and <br> tags from the text
    const cleanedText = text.replace(/<\/?[^>]+(>|$)/g, ' ');

    const words = cleanedText.split(/\s+/);

    words.forEach((word) => {
      // Check if the word is not empty and not containing only spaces
      if (word.trim().length > 0 && this.isWordInWordObject(word)) {
        // Use a Set to keep track of unique words and only count them once
        if (!this.uniqueWords.has(word)) {
          this.uniqueWords.add(word);
          this.wordCountData[word] = 1;
        } else {
          this.wordCountData[word]++;
        }
      }
    });

    // console.log('Word Count Data:', this.wordCountData);

    this.onWordCount.emit(this.wordCountData);
  }
}
