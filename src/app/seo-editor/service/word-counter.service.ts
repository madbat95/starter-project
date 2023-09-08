import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WordObject } from 'src/app/shared/interfaces/word-object';

@Injectable({
  providedIn: 'root',
})
export class WordCounterService {
  constructor() {}

  wordCount: any = {
    Entity: {
      metaTitle: 0,
      metaTitleR: 0,
      metaDescription: 0,
      metaDescriptionR: 0,
      content: 0,
      contentR: 0,
      headers: {
        H1: 0,
        H1R: 0,
        H2: 0,
        H2R: 0,
        H3: 0,
        H3R: 0,
        H4: 0,
        H4R: 0,
        H5: 0,
        H5R: 0,
        H6: 0,
        H6R: 0,
      },
    },
    Variations: {
      metaTitle: 0,
      metaTitleR: 0,
      metaDescription: 0,
      metaDescriptionR: 0,
      content: 0,
      contentR: 0,
      headers: {
        H1: 0,
        H1R: 0,
        H2: 0,
        H2R: 0,
        H3: 0,
        H3R: 0,
        H4: 0,
        H4R: 0,
        H5: 0,
        H5R: 0,
        H6: 0,
        H6R: 0,
      },
    },
    LSIKeywords: {
      metaTitle: 0,
      metaTitleR: 0,
      metaDescription: 0,
      metaDescriptionR: 0,
      content: 0,
      contentR: 0,
      headers: {
        H1: 0,
        H1R: 0,
        H2: 0,
        H2R: 0,
        H3: 0,
        H3R: 0,
        H4: 0,
        H4R: 0,
        H5: 0,
        H5R: 0,
        H6: 0,
        H6R: 0,
      },
    },
    Words: {
      metaTitle: 0,
      metaTitleR: 0,
      metaDescription: 0,
      metaDescriptionR: 0,
      content: 0,
      contentR: 0,
      headers: {
        H1: 0,
        H1R: 0,
        H2: 0,
        H2R: 0,
        H3: 0,
        H3R: 0,
        H4: 0,
        H4R: 0,
        H5: 0,
        H5R: 0,
        H6: 0,
        H6R: 0,
      },
    },
  };

  updateWordCount(section: string, data: any) {
    const wordCount = this.wordCount[section];
    if (wordCount) {
      wordCount.metaTitleR = data.title;
      wordCount.metaDescriptionR = data.description;
      wordCount.headers.H1R = data.h1;
      wordCount.headers.H2R = data.h2;
      wordCount.headers.H3R = data.h3;
      wordCount.headers.H4R = data.h4;
      wordCount.headers.H5R = data.h5;
      wordCount.headers.H6R = data.h6;
      wordCount.contentR = data.sentences;
    }
  }

  wordObject: { [key: string]: { word: string; count: any }[] } = {
    Entity: [],
    Variations: [],
    LSIKeywords: [],
  };

  calculateMetaTagWordCount(metaText: string, property: string) {
    const textContent = metaText.replace(/<[^>]*>/g, ' ');
    const words = textContent.split(/\s+/).filter((word) => word.trim() !== '');

    this.wordCount['Words'][property] = words.length;
  }

  isPhraseInWordObject(phrase, entityType) {
    const entityArray = this.wordObject[entityType];
    for (const entity of entityArray) {
      if (phrase === entity.word) {
        return true;
      }
    }
    return false;
  }

  countWordsInElement(element, entityType) {
    const text = element.textContent.trim();
    const words = text.split(/\s+/);
    let count = 0;

    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j <= words.length; j++) {
        const phrase = words.slice(i, j).join(' ');
        if (this.isPhraseInWordObject(phrase, entityType)) {
          count++;
          i = j - 1; //this line skips all the words in the current phrase
        }
      }
    }

    return count;
  }

  countWordsInHeadersAndContent(
    element,
    headerAncestors = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
  ) {
    const result = {
      Entity: {
        content: 0,
        headers: {
          H1: 0,
          H2: 0,
          H3: 0,
          H4: 0,
          H5: 0,
          H6: 0,
        },
      },
      Variations: {
        content: 0,
        headers: {
          H1: 0,
          H2: 0,
          H3: 0,
          H4: 0,
          H5: 0,
          H6: 0,
        },
      },
      LSIKeywords: {
        content: 0,
        headers: {
          H1: 0,
          H2: 0,
          H3: 0,
          H4: 0,
          H5: 0,
          H6: 0,
        },
      },
    };

    const nodeName = element.nodeName.toUpperCase();
    const isHeader = headerAncestors.includes(nodeName);

    if (isHeader) {
      for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
        result[entityType].headers[nodeName] =
          (result[entityType].headers[nodeName] || 0) +
          this.countWordsInElement(element, entityType);
      }
    } else {
      if (element.nodeType === Node.TEXT_NODE) {
        for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
          result[entityType].content += this.countWordsInElement(
            element,
            entityType
          );
        }
      } else {
        const childNodes = element.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
          const childResult = this.countWordsInHeadersAndContent(
            childNodes[i],
            headerAncestors
          );
          for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
            result[entityType].content += childResult[entityType].content;
            Object.entries(childResult[entityType].headers).forEach(
              ([headerTag, count]) => {
                result[entityType].headers[headerTag] =
                  (result[entityType].headers[headerTag] || 0) + count;
              }
            );
          }
        }
      }
    }
    return result;
  }

  wordCountCalculate(text, source: string) {
    const words = text.split(/\s+/);

    for (let i = 0; i < words.length; i++) {
      for (let j = i + 1; j <= words.length; j++) {
        const phrase = words.slice(i, j).join(' ');
        if (phrase.trim().length > 0) {
          for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
            if (this.isPhraseInWordObject(phrase, entityType)) {
              const entityArray = this.wordObject[entityType];
              const matchingPhrase = entityArray.find(
                (entity) => entity.word === phrase
              );
              if (matchingPhrase) {
                matchingPhrase.count[source]++;
              }
            }
          }
        }
      }
    }
  }

  calculateHeaderTagWordCount(headerTag: string, editorContent: string): void {
    const headerRegex = new RegExp(
      `<${headerTag.toLowerCase()}[^>]*>(.*?)<\/${headerTag.toLowerCase()}>`,
      'gi'
    );

    // Match the header tag in the editor content
    const headerMatches = editorContent.match(headerRegex) || [];

    // Update the word count in this.wordCount['Words'].headers
    this.wordCount['Words'].headers[headerTag] = headerMatches.length;
  }

  calculateContentTagWordCount(editorContent: string) {
    const textContent = editorContent.replace(/<[^>]*>/g, ' ');
    const words = textContent.split(/\s+/).filter((word) => word.trim() !== '');

    this.wordCount['Words'].content = words.length;
  }

  calculateAverageRatios(): number {
    let totalRatio = 0;
    let ratioCount = 0;

    const elementsToCalculateRatiosFor = [
      this.wordCount.Entity?.metaTitle,
      this.wordCount.Entity?.metaTitleR,
      this.wordCount.Entity?.metaDescription,
      this.wordCount.Entity?.metaDescriptionR,
      this.wordCount.Entity?.headers.H1,
      this.wordCount.Entity?.headers.H1R,
      this.wordCount.Entity?.headers.H2,
      this.wordCount.Entity?.headers.H2R,
      this.wordCount.Entity?.headers.H2,
      this.wordCount.Entity?.headers.H2R,
      this.wordCount.Entity?.headers.H3,
      this.wordCount.Entity?.headers.H3R,
      this.wordCount.Entity?.headers.H4,
      this.wordCount.Entity?.headers.H4R,
      this.wordCount.Entity?.headers.H5,
      this.wordCount.Entity?.headers.H5R,
      this.wordCount.Entity?.headers.H6,
      this.wordCount.Entity?.headers.H6R,
      this.wordCount.Entity?.content,
      this.wordCount.Entity?.contentR,

      this.wordCount.LSIKeywords?.metaTitle,
      this.wordCount.LSIKeywords?.metaTitleR,
      this.wordCount.LSIKeywords?.metaDescription,
      this.wordCount.LSIKeywords?.metaDescriptionR,
      this.wordCount.LSIKeywords?.headers.H1,
      this.wordCount.LSIKeywords?.headers.H1R,
      this.wordCount.LSIKeywords?.headers.H2,
      this.wordCount.LSIKeywords?.headers.H2R,
      this.wordCount.LSIKeywords?.headers.H2,
      this.wordCount.LSIKeywords?.headers.H2R,
      this.wordCount.LSIKeywords?.headers.H3,
      this.wordCount.LSIKeywords?.headers.H3R,
      this.wordCount.LSIKeywords?.headers.H4,
      this.wordCount.LSIKeywords?.headers.H4R,
      this.wordCount.LSIKeywords?.headers.H5,
      this.wordCount.LSIKeywords?.headers.H5R,
      this.wordCount.LSIKeywords?.headers.H6,
      this.wordCount.LSIKeywords?.headers.H6R,
      this.wordCount.LSIKeywords?.content,
      this.wordCount.LSIKeywords?.contentR,

      this.wordCount.Variations?.metaTitle,
      this.wordCount.Variations?.metaTitleR,
      this.wordCount.Variations?.metaDescription,
      this.wordCount.Variations?.metaDescriptionR,
      this.wordCount.Variations?.headers.H1,
      this.wordCount.Variations?.headers.H1R,
      this.wordCount.Variations?.headers.H2,
      this.wordCount.Variations?.headers.H2R,
      this.wordCount.Variations?.headers.H2,
      this.wordCount.Variations?.headers.H2R,
      this.wordCount.Variations?.headers.H3,
      this.wordCount.Variations?.headers.H3R,
      this.wordCount.Variations?.headers.H4,
      this.wordCount.Variations?.headers.H4R,
      this.wordCount.Variations?.headers.H5,
      this.wordCount.Variations?.headers.H5R,
      this.wordCount.Variations?.headers.H6,
      this.wordCount.Variations?.headers.H6R,
      this.wordCount.Variations?.content,
      this.wordCount.Variations?.contentR,
    ];

    for (let i = 0; i < elementsToCalculateRatiosFor.length; i += 2) {
      const count = elementsToCalculateRatiosFor[i];
      const required = elementsToCalculateRatiosFor[i + 1];

      if (count !== undefined && required !== undefined && required !== 0) {
        const ratio = count / required;
        totalRatio += ratio;
        ratioCount++;
      }
    }

    const averageRatio = Math.round((totalRatio / ratioCount) * 100);

    // this.onAverageRatioChange.emit(averageRatio);
    return averageRatio;
  }
}
