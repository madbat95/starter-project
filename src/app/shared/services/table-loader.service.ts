import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableLoaderService {
  constructor() {}
  variationTableLoader = false;
  suggestionTableLoader = false;
}
