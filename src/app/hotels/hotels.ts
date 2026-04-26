import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-hotels',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './hotels.html',
  styleUrl: './hotels.scss',
})
export class Hotels {
  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  hotels: any;
  activeFilter: any;
  filteredHotels: any;

  ngOnInit() {
    this.filterHotels('All');
  }

  filterHotels(city: string) {
    this.activeFilter = city;
    if (city === 'All') {
      this.api.getHotels('Hotels/GetAll').subscribe((data: any) => {
        this.filteredHotels = data;
        this.cdr.detectChanges();
      });
    } else {
      this.api.getHotelsByCity(city).subscribe((data: any) => {
        this.filteredHotels = data;
        this.cdr.detectChanges();
      });
    }
  }

  goToDetails(id: number) {
    this.router.navigate(['/hotel-details', id]);
  }
}
