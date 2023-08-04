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

  WordObject = {
    Entity: {
      h1: [
        {
          privacy: 0,
        },
      ],
      h2: [
        {
          data: 0,
        },
      ],
      h3: [
        {
          folder: 0,
        },
      ],
      h4: [
        {
          security: 0,
        },
      ],
      h5: [
        {
          access: 0,
        },
      ],
      h6: [
        {
          transfer: 0,
        },
      ],
      content: [
        {
          authorize: 0,
        },
      ],
    },
  };

  ngOnInit(): void {}

  parseElement(element, resultMap, isHeading = false) {
    let tagName = element.tagName.toLowerCase();

    if (tagName.startsWith('h') && tagName.length === 2 && !isNaN(tagName[1])) {
      var innerText = element.innerText.trim();
      var wordCount = innerText.split(/\s+/).length;
      resultMap[tagName] = (resultMap[tagName] || 0) + wordCount; // Increment the count for the heading tag
      // if (element.children.length) {
      //   resultMap = this.iterateBodyElements(element.children, resultMap, true);
      //   return;
      // }
    } else {
      // If it's not a heading tag, process the text content without counting child elements
      const cleanedText = element.innerText.replace(/\s+/g, ' ').trim();

      if (cleanedText !== '') {
        // Only count non-empty text
        let wordCount = cleanedText.split(/\s+/).length;
        resultMap['content'] = (resultMap['content'] || 0) + wordCount; // Increment the content count
      }
    }
    return { resultMap, isHeading };
  }
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
  iterateBodyElements(element, resultMap = {}, isHeading = false) {
    var children = element.children;
    for (let i = 0; i < children.length; i++) {
      const { resultMap: re, isHeading: h } = this.parseElement(
        children[i],
        resultMap,
        isHeading
      );
      this.iterateBodyElements(children[i], re, h);
    }
    return resultMap;
  }

  countWordsInHeadersAndContent(
    element,
    headerAncestors = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
  ) {
    const result = {
      content: '',
      headers: {},
    };

    const nodeName = element.nodeName.toUpperCase();
    const isHeader = headerAncestors.includes(nodeName);

    if (isHeader) {
      result.headers[nodeName] =
        (result.headers[nodeName] || 0) + this.countWordsInElement(element);
    } else {
      if (element.nodeType === Node.TEXT_NODE) {
        result.content += element.textContent.trim() + ' ';
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
    return element.textContent.trim().split(/\s+/).length;
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
      'content',
    ]);
    console.log(wordCount);
    this.wordCountData = {}; // Reset the word count data
    this.uniqueWords.clear(); // Clear the uniqueWords Set

    // var children = doc.body.children;
    // var resultMap = {};
    // var isHeading = false;
    // if (!children.length) {
    //   console.log('no children', children);
    //   var a = this.parseElement(doc.body, {});
    //   resultMap = a.resultMap;
    // } else {
    //   resultMap = this.iterateBodyElements(doc.body);
    // }
    // console.log('final', resultMap);

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

    // console.log('Word Count Data:', this.wordCountData);

    this.onWordCount.emit(this.wordCountData);
  }
}
