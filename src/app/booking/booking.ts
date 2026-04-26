import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { Alert } from '../alert/alert';

@Component({
  selector: 'app-booking',
  imports: [RouterModule, CommonModule, FormsModule, Alert],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {
  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  roomId: number = 0;
  room: any = null;
  alertMessage: string = '';
  alertType: 'success' | 'warning' | 'error' = 'success';
  alertVisible: boolean = false;

  form = {
    customerName: '',
    customerPhone: '',
    checkInDate: '',
    checkOutDate: '',
  };

  ngOnInit() {
    this.roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    console.log('roomId:', this.roomId);
    this.api.getRoomById(this.roomId).subscribe((data: any) => {
      this.room = data;
      console.log('room:', this.room);
      this.cdr.detectChanges();
    });
  }
  showAlert(message: string, type: 'success' | 'warning' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    this.alertVisible = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.alertVisible = false;
      this.cdr.detectChanges();
    }, 3000);
  }
  getTotalPrice() {
    if (!this.form.checkInDate || !this.form.checkOutDate) return 0;

    const checkIn = new Date(this.form.checkInDate);
    const checkOut = new Date(this.form.checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return 0;
    return nights * this.room.pricePerNight;
  }
  submitBooking() {
    if (
      !this.form.customerName ||
      !this.form.customerPhone ||
      !this.form.checkInDate ||
      !this.form.checkOutDate
    ) {
      this.showAlert('Please fill in all fields', 'warning');
      return;
    }
    const body = {
      id: 0,
      roomID: this.roomId,
      checkInDate: new Date(this.form.checkInDate).toISOString(),
      checkOutDate: new Date(this.form.checkOutDate).toISOString(),
      totalPrice: this.getTotalPrice(),
      isConfirmed: true,
      customerName: this.form.customerName,
      customerId: 'string',
      customerPhone: this.form.customerPhone,
    };
    this.api.createBooking(body).subscribe({
      next: (data: any) => {
        console.log('booking response:', data);
        this.showAlert('Booking successfully created!', 'success');
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
      error: (err) => {
        this.showAlert('Error creating booking', 'error');
        console.log(err);
      },
    });
  }
}
