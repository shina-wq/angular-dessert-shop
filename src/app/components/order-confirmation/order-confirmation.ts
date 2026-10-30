import { CurrencyPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CartItem } from '../../models/product';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-order-confirmation',
  styleUrl: './order-confirmation.css',
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmation implements AfterViewInit {
  @Input({ required: true }) items!: CartItem[];
  @Input({ required: true }) total!: number;

  @Output() newOrder = new EventEmitter<void>();

  @ViewChild('newOrderButton') newOrderButton!: ElementRef<HTMLButtonElement>;

  // Move keyboard focus into the modal when it opens
  ngAfterViewInit(): void {
    this.newOrderButton.nativeElement.focus();
  }
}
