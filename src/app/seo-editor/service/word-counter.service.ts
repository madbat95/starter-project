import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WordCounterService {
  constructor() {}

  wordCount: any = {
    Entity: {
      metaTitle: 0,
      metaTitleR: 10,
      metaDescription: 0,
      metaDescriptionR: 10,
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
        H6R: 0,
      },
    },
  };

  wordObject = {
    Entity: [
      {
        word: 'security',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'security service',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'privacy',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'data',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'virginia',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'veritext',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'access',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'access to a door',
        count: { summer_note: 0, meta: 0 },
      },

      {
        word: 'finance',
        count: { summer_note: 0, meta: 0 },
      },
    ],
    Variations: [
      {
        word: 'privacy',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'alexandria',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'videographers',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'north',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'breach',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'statistics',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'logistics',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'finance',
        count: { summer_note: 0, meta: 0 },
      },
    ],
    LSIKeywords: [
      {
        word: 'privacy',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'paper',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'testimony',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'chicago',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'united',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'manchester',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'city',
        count: { summer_note: 0, meta: 0 },
      },
      {
        word: 'trial',
        count: { summer_note: 0, meta: 0 },
      },
    ],
  };
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
}
