import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seo-editor',
  templateUrl: './seo-editor.component.html',
  styleUrls: ['./seo-editor.component.css'],
})
export class SeoEditorComponent implements OnInit {
  wordCountData: { [word: string]: number } = {};

  onChange(wordCountData): void {
    console.log('onchange', wordCountData);
    this.wordCountData = wordCountData;
  }

  mapDataToTable(wordCountData: {
    [word: string]: number;
  }): { name: string; quantity: number }[] {
    return Object.entries(wordCountData).map(([name, quantity]) => ({
      name,
      quantity,
    }));
  }

  ngOnInit(): void {}
}
