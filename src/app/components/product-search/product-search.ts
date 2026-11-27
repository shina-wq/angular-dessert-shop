import { Component, output, signal } from '@angular/core';

/**
 * Presentational search box: it shows the input and reports every keystroke.
 * Debouncing and filtering happen in the stream that listens to it.
 */
@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch {
  readonly termChange = output<string>();

  protected readonly query = signal('');

  protected update(value: string): void {
    this.query.set(value);
    this.termChange.emit(value);
  }

  protected clear(input: HTMLInputElement): void {
    this.update('');
    input.focus();
  }
}
