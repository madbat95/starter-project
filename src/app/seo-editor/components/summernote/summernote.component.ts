import {
  Component,
  EventEmitter,
  OnInit,
  OnDestroy,
  Output,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { WordCounterService } from '../../service/word-counter.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, catchError, debounceTime, takeUntil } from 'rxjs/operators';
import { HtmlContentService } from 'src/app/shared/services/html-content.service';
import { EditorContentService } from 'src/app/shared/services/editor-content.service';
import { TableLoaderService } from 'src/app/shared/services/table-loader.service';
import { Subject } from 'rxjs';
import { Key } from 'protractor';
import { HighlightService } from '../../service/highlight.service';

@Component({
  selector: 'app-summernote',
  templateUrl: './summernote.component.html',
  styleUrls: ['./summernote.component.scss'],
})
export class SummernoteComponent implements OnInit, OnDestroy {
  private contentChange$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  id: any;
  editorContent = '';
  isLoading = false;
  isHighlightedStates = {};
  isHighlightedKey = {};
  editorConfig = {
    theme: 'bs4-dark',
    placeholder: 'Add text here...',
    tabsize: 2,
    height: 330,
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['undo', 'redo']],
      ['font', ['bold', 'italic']],
      ['fontsize', ['fontname', 'color']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['link', 'hr']],
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
  constructor(
    private wordCounter: WordCounterService,
    private route: ActivatedRoute,
    private contentSerevice: HtmlContentService,
    private editorContentService: EditorContentService,
    public tableLoaderService: TableLoaderService,
    private highlightService: HighlightService
  ) {
    this.contentChange$
      .pipe(
        debounceTime(500), // Adjust the debounce time as needed (e.g., 500 milliseconds)
        takeUntil(this.destroy$)
      )
      .subscribe((content: string) => {
        this.onEditorKeyUp(content);
      });

    this.highlightService.getHighlightObservable().subscribe((data) => {
      this.highlightKey(data.key, data.color);
    });
  }

  onEditorContentChange(content: string) {
    this.contentChange$.next(content);
  }

  ngOnInit(): void {
    this.editorContentService
      .getScrapedDataObservable()
      .subscribe((data: string) => {
        this.editorContent = data;
        this.onEditorContentChange(data);
      });

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.id = +params.get('id');
          return this.contentSerevice.getContentById(this.id);
        })
      )
      .subscribe((response: any) => {
        this.contentSerevice.contentRetrieved = false;
        if (response.length) {
          this.id = response[0].id;
          this.editorContent = response[0].content;
          this.contentSerevice.contentRetrieved = true;
          this.onEditorContentChange(this.editorContent);
        }
      });
  }

  onEditorKeyUp(text: any) {
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

  highlightTag(tag: string) {
    if (tag === 'content') {
      const nonHeadingTags = ['p', 'div', 'span', 'a'];
      const highlightStyle = `style="background-color:rgb(255, 255, 0);"`;

      for (const nonHeadingTag of nonHeadingTags) {
        const tagToBeHighlighted = `<${nonHeadingTag}`;
        if (
          this.isHighlightedStates &&
          this.isHighlightedStates[nonHeadingTag]
        ) {
          this.isHighlightedStates[nonHeadingTag] = false;
          this.editorContent = this.editorContent
            .split(`${tagToBeHighlighted} ${highlightStyle}`)
            .join(`<${nonHeadingTag}`);
        } else {
          this.isHighlightedStates[nonHeadingTag] = true;
          this.editorContent = this.editorContent
            .split(`${tagToBeHighlighted}`)
            .join(`<${nonHeadingTag} ${highlightStyle}`);
        }
      }
    } else {
      const tagToBeHighlighted = `<${tag}`;
      const highlightStyle = `style="background-color:rgb(255, 255, 0);"`;

      if (this.isHighlightedStates && this.isHighlightedStates[tag]) {
        this.isHighlightedStates[tag] = false;
        this.editorContent = this.editorContent
          .split(`${tagToBeHighlighted} ${highlightStyle}`)
          .join(`<${tag}`);
      } else {
        this.isHighlightedStates[tag] = true;
        this.editorContent = this.editorContent
          .split(`${tagToBeHighlighted}`)
          .join(`<${tag} ${highlightStyle}`);
      }
    }
  }

  highlightKey(key: string, color: string) {
    const highlightedKeyStyle = `background-color: ${color};`;
    // Clone the editorContent
    const editorContentClone = this.editorContent;

    if (this.isHighlightedKey && this.isHighlightedKey[key]) {
      this.isHighlightedKey[key] = false;

      // for future reference, the else block is for adding a toggling effect. it will
      //check if the isHighlightedState is already toggled then it removes the blue highlight
      const regex = new RegExp(
        `<span style="${highlightedKeyStyle}">(.*?)<\/span>`,
        'gi'
      );
      const unhighlightedContent = editorContentClone.replace(regex, '$1');
      this.editorContent = unhighlightedContent;
    } else {
      this.isHighlightedKey[key] = true;

      // Get the words associated with the specified key
      const words = this.wordCounter.wordObject[key];

      if (!words || words.length === 0) {
        return;
      }

      // Create a regular expression pattern to match the words
      const wordPattern = words.map((word) => `\\b${word.word}\\b`).join('|');
      const regex = new RegExp(`(${wordPattern})`, 'gi');

      const highlightedContent = editorContentClone.replace(
        regex,
        `<span style="${highlightedKeyStyle}">$1</span>`
      );

      // Update the editorContent with the highlighted content
      this.editorContent = highlightedContent;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
