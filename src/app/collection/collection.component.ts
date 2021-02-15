import { Component, OnInit } from '@angular/core';
import {HeroService} from 'src/app/hero.service';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})


export class CollectionComponent implements OnInit {

  allData: any[];
  newArrivalData: any[];
  popularData: any[];
  bestOffersData: any[];
  

  constructor(private data_service: HeroService,) { }

  ngOnInit(): void {
    this.data_service.collData().subscribe(data => {
      this.allData = data;
    })
  }

  status1: string = 'success';
  status2: boolean = false;
  status3: boolean = false;
  status4: boolean = false;
  myClick(a) {
    if (a == 1) {
      if (this.status1 == 'success') {
        this.status1 = 'danger';
      }
      else if (this.status1 = 'danger') {
        this.status1 = 'success';
      }
    }

    else if (a == 2)
      this.status2 = !this.status2;
    else if (a == 3)
      this.status3 = !this.status3;
    else if (a == 4)
      this.status4 = !this.status4;
  }




}
