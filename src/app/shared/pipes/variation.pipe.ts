import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'variation',
})
export class VariationPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();
    return items.filter((item) => item.word.toLowerCase().includes(searchText));
  }
}
