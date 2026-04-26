import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-room-details',
  imports: [RouterModule, CommonModule],
  templateUrl: './room-details.html',
  styleUrl: './room-details.scss',
})
export class RoomDetails {
  constructor(
    private route: ActivatedRoute,
    private api: Api,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  room: any = null;
  selectedImage: string = '';

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    (this.api.getRoomById(id).subscribe((data: any) => {
      this.room = data;
      this.selectedImage = data.images[0]?.source;
      this.cdr.detectChanges();
    }),
      (error: any) => {
        console.log(error);
      });
  }
  selectImage(src: string) {
    this.selectedImage = src;
  }
  goToBooking() {
    this.router.navigate(['/booking', this.room.id]);
  }
}
