import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-summernote',
  templateUrl: './summernote.component.html',
  styleUrls: ['./summernote.component.scss'],
})
export class SummernoteComponent implements OnInit {
  editorContent = '';
  uniqueWords: Set<string> = new Set();
  wordCountData: { [word: string]: number } = {};
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

  ngOnInit(): void {
    // console.log('Word Count Data:', this.wordCountData);
  }

  onEditorKeyUp(text: string) {
    this.wordCountData = {}; // Reset the word count data
    this.uniqueWords.clear(); // Clear the uniqueWords Set

    const words = text.split(/\s+/).filter(Boolean);

    words.forEach((word) => {
      // Use a Set to keep track of unique words and only count them once
      if (!this.uniqueWords.has(word)) {
        this.uniqueWords.add(word);
        this.wordCountData[word] = 1;
      } else {
        this.wordCountData[word]++;
      }
    });
    console.log('Word Count Data:', this.wordCountData);
  }
}
