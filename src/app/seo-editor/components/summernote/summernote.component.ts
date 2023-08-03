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

  ngOnInit(): void {}

  getAllHeadings(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    // console.log('doc here', doc);
    const headingCounts = {};
    // Initialize an array to hold content from non-heading tags
    let content = [];
    const heading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    heading.forEach((tagName) => {
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
    // Iterate through other tags and collect their content
    const nonHeadingTags = ['p', 'div', 'span', 'a']; // Add more tags as needed
    nonHeadingTags.forEach((tagName) => {
      const elements = doc.querySelectorAll(tagName);
      elements.forEach((element: any) => {
        content.push(element.innerText);
      });
    });
    // Join the content array and split into words to count
    const contentText = content.join(' ');
    const contentWords = contentText.trim().split(/\s+/);
    headingCounts['content'] = contentWords.length;
    console.log('Heading Word Count:', headingCounts);
    return headingCounts;
  }

  // iterateBodyElements(element, resultMap = {}) {
  //   var tagName = element.tagName.toLowerCase();
  //   var innerText = element.innerText.trim();
  //   var wordCount = innerText.split(/\s+/).length;

  //   if (tagName.startsWith('h') && tagName.length === 2 && !isNaN(tagName[1])) {
  //     resultMap[tagName] = wordCount;
  //   } else {
  //     if ('content' in resultMap) {
  //       resultMap['content'] += wordCount;
  //       console.log('wordCount :', wordCount);
  //       console.log('resultmap: ', resultMap['content']);
  //     } else {
  //       resultMap['content'] = wordCount;
  //     }
  //   }

  //   var children = element.children;

  //   for (var i = 0; i < children.length; i++) {
  //     this.iterateBodyElements(children[i], resultMap);
  //   }

  //   return resultMap;
  // }
  iterateBodyElements(element, resultMap = {}) {
    var children = element.children;
    console.log('children', children);
    for (let i = 0; i < children.length; i++) {
      let tagName = children[i].tagName.toLowerCase();
      // console.log('eklement', element);
      if (
        tagName.startsWith('h') &&
        tagName.length === 2 &&
        !isNaN(tagName[1])
      ) {
        var innerText = children[i].innerText.trim();
        var wordCount = innerText.split(/\s+/).length;
        resultMap[tagName] = (resultMap[tagName] || 0) + wordCount; // Increment the count for the heading tag
      } else {
        // If it's not a heading tag, process the text content without counting child elements
        const cleanedText = children[i].innerText.replace(/\s+/g, ' ').trim();

        if (cleanedText !== '') {
          // Only count non-empty text
          console.log('cleanedText', cleanedText);
          let wordCount = cleanedText.split(/\s+/).length;
          console.log('word count', wordCount);
          resultMap['content'] = (resultMap['content'] || 0) + wordCount; // Increment the content count

          // console.log('Words in content:', cleanedText.split(/\s+/));
        }
      }
      this.iterateBodyElements(children[i], resultMap);
    }

    return resultMap;
  }

  onEditorKeyUp(text: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    this.wordCountData = {}; // Reset the word count data
    this.uniqueWords.clear(); // Clear the uniqueWords Set
    // console.log('text: ', text);
    console.log('doc body: ', doc.body);
    // console.log('text entered', text);

    // Count words in headings
    const headingCounts = this.getAllHeadings(text);
    // console.log();
    var c = this.iterateBodyElements(doc.body);
    // console.log('final', c);

    // Remove HTML entities representing spaces (&nbsp;), <p> tags, and <br> tags from the text
    const cleanedText = text.replace(/<\/?[^>]+(>|$)/g, ' ');

    const words = cleanedText.split(/\s+/);

    words.forEach((word) => {
      // Check if the word is not empty and not containing only spaces
      if (word.trim().length > 0) {
        // Use a Set to keep track of unique words and only count them once
        if (!this.uniqueWords.has(word)) {
          this.uniqueWords.add(word);
          this.wordCountData[word] = 1;
        } else {
          this.wordCountData[word]++;
        }
      }
    });

    console.log('Word Count Data:', this.wordCountData);

    this.onWordCount.emit(this.wordCountData);
  }
}
