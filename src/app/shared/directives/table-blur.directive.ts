import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTableBlur]',
})
export class TableBlurDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    console.log('on click directive');
    const columnCells =
      this.el.nativeElement.parentElement.querySelectorAll('td');
    const columnIndex = Array.from(columnCells).indexOf(this.el.nativeElement);

    const table = this.el.nativeElement.closest('table');
    const allCells = table.querySelectorAll('td');

    for (const cell of allCells) {
      if (
        Array.from(allCells).indexOf(cell) % columnCells.length ===
        columnIndex
      ) {
        // this.renderer.addClass(cell, 'focused');
        this.renderer.removeClass(cell, 'focused');
      } else {
        this.renderer.addClass(cell, 'focused');
      }
    }
  }
}
