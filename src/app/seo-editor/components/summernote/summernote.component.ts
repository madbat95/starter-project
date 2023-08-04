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
    Entity: {
      h1: [
        {
          word: 'privacy',
          required: '0',
          count: '0',
        },
      ],
      h2: [
        {
          word: 'access',
          required: '0',
          count: '0',
        },
      ],
      h3: [
        {
          word: 'data',
          required: '0',
          count: '0',
        },
      ],
      h4: [
        {
          word: 'authorize',
          required: '0',
          count: '0',
        },
      ],
      h5: [
        {
          word: 'security',
          required: '0',
          count: '0',
        },
      ],
      h6: [
        {
          word: 'password',
          required: '0',
          count: '0',
        },
      ],
      content: [
        {
          word: 'security',
          required: '0',
          count: '0',
        },
      ],
    },
    Variations: {
      h1: [
        {
          word: 'privacy',
          required: '0',
          count: '0',
        },
      ],
      h2: [
        {
          word: 'access',
          required: '0',
          count: '0',
        },
      ],
      h3: [
        {
          word: 'data',
          required: '0',
          count: '0',
        },
      ],
      h4: [
        {
          word: 'authorize',
          required: '0',
          count: '0',
        },
      ],
      h5: [
        {
          word: 'security',
          required: '0',
          count: '0',
        },
      ],
      h6: [
        {
          word: 'password',
          required: '0',
          count: '0',
        },
      ],
      content: [
        {
          word: 'security',
          required: '0',
          count: '0',
        },
      ],
    },
    LSIKeywords: {
      h1: [
        {
          word: 'privacy',
          required: '0',
          count: '0',
        },
      ],
      h2: [
        {
          word: 'access',
          required: '0',
          count: '0',
        },
      ],
      h3: [
        {
          word: 'data',
          required: '0',
          count: '0',
        },
      ],
      h4: [
        {
          word: 'authorize',
          required: '0',
          count: '0',
        },
      ],
      h5: [
        {
          word: 'security',
          required: '0',
          count: '0',
        },
      ],
      h6: [
        {
          word: 'password',
          required: '0',
          count: '0',
        },
      ],
      content: [
        {
          word: 'security',
          required: '0',
          count: '0',
        },
      ],
    },
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
    for (const EntityName of Object.values(this.wordObject)) {
      for (const Entity of Object.values(EntityName)) {
        for (const data of Entity) {
          if (data.word === word) {
            return true;
          }
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
