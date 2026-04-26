import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  constructor(private api : Api,
    private cdr : ChangeDetectorRef,
    private router : Router,
    private route : ActivatedRoute
  ) {}
  rooms : any[] = []
  roomsTypes : any[] = []

  filters = {
    roomTypeId : 0,
    priceFrom : 0,
    priceTo : 1000,
    maximumGuests : 1,
    checkIn : '',
    checkOut : ''
  }
  ngOnInit(){
    this.applyFilters();
    this.getRoomTypes();
  }
  getRoomTypes(){
    this.api.getRoomTypes('Rooms/GetRoomTypes').subscribe((data : any) => {
      this.roomsTypes = data;
      this.cdr.detectChanges();
    }),
    (error : any) => {
      console.log(error);
    }
  }
  applyFilters(){
    const body ={
      roomTypeId : this.filters.roomTypeId,
      priceFrom : this.filters.priceFrom,
      priceTo : this.filters.priceTo,
      maximumGuests : this.filters.maximumGuests,
      checkIn : this.filters.checkIn || new Date().toISOString(),
      checkOut : this.filters.checkOut || new Date().toISOString()
    }
    this.api.getFilteredRooms(body).subscribe((data : any) => {
      this.rooms = data;
      this.cdr.detectChanges();
    }),
    (error : any) => {
      console.log(error);
    }
  }
  resetFilters() {
    this.filters = {
      roomTypeId: 0,
      priceFrom: 0,
      priceTo: 1000,
      maximumGuests: 1,
      checkIn: '',
      checkOut: ''
    };
    this.applyFilters();
  }
  goToDetails(id : number){
    this.router.navigate(['room-details',id])
  
  }
}
