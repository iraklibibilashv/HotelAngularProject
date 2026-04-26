import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(
    private api: Api,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  hotels: any[] = [];

  ngOnInit() {
    this.getAllHotels();
  }

  getAllHotels() {
    this.api.getHotels('Hotels/GetAll').subscribe({
      next: (data: any) => {
        this.hotels = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
        this.cdr.detectChanges();
      },
    });
  }
  goToDetails(id: number) {
    this.router.navigate(['/hotel-details', id]);
  }
}
