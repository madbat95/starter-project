import { Injectable } from '@angular/core';

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
        H1R: 10,
        H2: 0,
        H2R: 5,
        H3: 0,
        H3R: 10,
        H4: 0,
        H4R: 5,
        H5: 0,
        H5R: 5,
        H6: 0,
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
        H1R: 10,
        H2: 0,
        H2R: 5,
        H3: 0,
        H3R: 10,
        H4: 0,
        H4R: 5,
        H5: 0,
        H5R: 5,
        H6: 0,
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
        H1R: 10,
        H2: 0,
        H2R: 5,
        H3: 0,
        H3R: 10,
        H4: 0,
        H4R: 5,
        H5: 0,
        H5R: 5,
        H6: 0,
      },
    },
  };

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
        word: 'privacy',
        count: 0,
      },
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
        word: 'privacy',
        count: 0,
      },
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
  countWordsInElement(element, entityType) {
    const text = element.textContent.trim();
    const words = text.split(/\s+/);
    let count = 0;

    words.forEach((word) => {
      if (this.isWordInWordObject(word, entityType)) {
        count++;
      }
    });

    return count;
  }

  isWordInWordObject(word, entityType) {
    const entityArray = this.wordObject[entityType];
    for (const entity of entityArray) {
      if (entity.word === word) {
        return true;
      }
    }
    return false;
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

  wordCountCalculate(text, initial) {
    const words = text.split(/\s+/);
    words.forEach((word) => {
      // Check if the word is not empty and not containing only spaces
      if (word.trim().length > 0) {
        for (const entityType of ['Entity', 'Variations', 'LSIKeywords']) {
          if (this.isWordInWordObject(word, entityType)) {
            const entityArray = this.wordObject[entityType];
            const matchingWord = entityArray.find(
              (entity) => entity.word === word
            );
            if (matchingWord) {
              matchingWord.count++;
            }
          }
        }
      }
    });
  }
}
