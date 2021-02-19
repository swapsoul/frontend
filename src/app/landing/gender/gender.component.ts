import { Component, OnInit } from '@angular/core';
import {HeroService} from 'src/app/hero.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css']
})
export class GenderComponent implements OnInit {

  allData: any[];

  constructor(private data_service: HeroService,) { }

  ngOnInit(): void {
    this.data_service.collData().subscribe(data => {
      this.allData = data;
      //console.log(this.allData);
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
        //this.show("All");
      }
      else if (this.status1 = 'danger') {
        this.status1 = 'success';
        //this.show("All");
      }
    }

    else if (a == 2) {
      this.status2 = !this.status2;
      //this.show("NewArrival");
    }
    else if (a == 3) {
      this.status3 = !this.status3;
      //this.show("Popular");
    }
    else if (a == 4)
      this.status4 = !this.status4;
    //this.show("BestOffers");
  }


}
