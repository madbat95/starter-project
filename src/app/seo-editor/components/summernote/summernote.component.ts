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

  constructor(private wordCountService: WordCountService) {}

  ngOnInit(): void {}

  getAllHeadings(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const headingCounts = {};

    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach((tagName) => {
      const headings = doc.querySelectorAll(tagName);
      const headingTexts = Array.from(headings).map(
        (heading: any) => heading.innerText
      );
      let wordCount = 0;
      headingTexts.forEach((headingText) => {
        const words = headingText.trim().split(/\s+/);
        wordCount += words.length;
      });

      headingCounts[tagName] = wordCount;
    });

    console.log('Heading Word Count:', headingCounts);
    return headingCounts;
  }

  onEditorKeyUp(text: any) {
    this.wordCountData = {}; // Reset the word count data
    this.uniqueWords.clear(); // Clear the uniqueWords Set

    console.log('text entered', text);

    // Count words in headings
    const headingCounts = this.getAllHeadings(text);

    // Remove HTML entities representing spaces (&nbsp;), <p> tags, and <br> tags from the text
    const cleanedText = text.replace(/(&nbsp;|<p>|<\/p>|<br>)/g, '');

    const lines = cleanedText.split('\n');

    lines.forEach((line) => {
      // Check if the line is not empty and not containing only spaces
      if (line.trim().length > 0) {
        const words = line.trim().split(/\s+/);

        words.forEach((word) => {
          // Use a Set to keep track of unique words and only count them once
          if (!this.uniqueWords.has(word)) {
            this.uniqueWords.add(word);
            this.wordCountData[word] = 1;
          } else {
            this.wordCountData[word]++;
          }
        });
      }
    });

    console.log('Word Count Data:', this.wordCountData);
    this.onWordCount.emit(this.wordCountData);
  }
}
