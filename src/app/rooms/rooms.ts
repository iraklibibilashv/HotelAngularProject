import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-rooms',
  imports: [RouterModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  constructor(private api : Api,
    private cdr : ChangeDetectorRef,
    private router : Router,
    private route : ActivatedRoute
  ) {}
  rooms : any


}
