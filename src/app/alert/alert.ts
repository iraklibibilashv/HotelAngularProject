import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  @Input() message: string = '';
  @Input() type: 'success' | 'warning' | 'error' = 'success';
  @Input() visible: boolean = false;
}
