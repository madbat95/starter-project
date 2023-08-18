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
    WordTags: {
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

  calculateTotalMetaWordCount(property: string): number {
    let totalMetaWordCount = 0;

    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      totalMetaWordCount += this.wordCount[entityType][property];
    }

    return totalMetaWordCount;
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
    console.log('wordCount', this.wordCount);
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
    for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
      let tagWordCount = 0;

      for (const wordObject of this.wordObject[entityType]) {
        if (wordObject.count.summer_note > 0) {
          const word = wordObject.word;
          const regex = new RegExp(`\\b${word}\\b`, 'gi');

          // Create a regular expression for the specific header tag
          const headerRegex = new RegExp(
            `<${headerTag.toLowerCase()}[^>]*>(.*?)<\/${headerTag.toLowerCase()}>`,
            'gi'
          );
          const headerMatches = editorContent.match(headerRegex) || [];

          // Count the number of matches (i.e., number of <h1> tags)
          for (const headerMatch of headerMatches) {
            if (headerMatch.match(regex)) {
              tagWordCount++;
            }
          }
        }
      }

      this.wordCount['WordTags'].headers[headerTag] = tagWordCount;
    }
  }
}
