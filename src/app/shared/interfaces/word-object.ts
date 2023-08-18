export interface WordObject {
  wordObject: {
    Entity: WordItem[];
    Variations: WordItem[];
    LSIKeywords: WordItem[];
  };
}

interface WordItem {
  word: string;
  count: { summer_note: number; meta: number };
}
