import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-hotel-details',
  imports: [RouterModule,CommonModule],
  templateUrl: './hotel-details.html',
  styleUrl: './hotel-details.scss',
})
export class HotelDetails {
  constructor(
    private api : Api,
    private cdr : ChangeDetectorRef,
    private route : ActivatedRoute,
    private router : Router
  ) {}
  hotel : any = null;
ngOnInit() {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.api.getHotelById(id).subscribe((data: any) => {
    this.hotel = data;
    this.cdr.detectChanges();
  
  });
}
}
