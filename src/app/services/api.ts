import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private api : HttpClient) {}
  baseUrl = "https://hotelbooking.stepprojects.ge/api/"

  getHotels(url : string){
    return this.api.get(this.baseUrl + url)
  }
  getHotelById(id : number){
    return this.api.get(this.baseUrl + `Hotels/GetHotel/${id}`)
  }
  getHotelsByCity(city : string){
    return this.api.get(this.baseUrl + `Hotels/GetHotels?city=${city}`);
  }
  getRooms(url : string){
    return this.api.get(this.baseUrl + url)
  }


}
