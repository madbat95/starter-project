import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTableBlur]',
})
export class TableBlurDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const table = this.el.nativeElement.closest('table');
    const columnIndex = this.getColumnIndex(this.el.nativeElement);

    const allCells = table.querySelectorAll('td, th');

    for (const cell of allCells) {
      const cellIndex = this.getColumnIndex(cell);
      if (
        cellIndex === columnIndex ||
        (cellIndex === columnIndex + 1 && cell.tagName == 'TD') ||
        (cellIndex === columnIndex - 1 && cell.tagName == 'TH')
      ) {
        if (cell.classList.contains('focused')) {
          this.renderer.removeClass(cell, 'focused');
        }
      } else {
        this.renderer.addClass(cell, 'focused');
      }
    }
  }

  private getColumnIndex(cell: any): number {
    const row = cell.parentElement;
    let cellIndex = 0;

    for (let i = 0; i < row.cells.length; i++) {
      const currentCell = row.cells[i];
      if (currentCell === cell) {
        return cellIndex;
      }
      cellIndex += currentCell.colSpan || 1;
    }

    return -1;
  }
}
