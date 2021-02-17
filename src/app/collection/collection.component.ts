import { Component, OnInit } from '@angular/core';
import {HeroService} from 'src/app/hero.service';
import { MatTabsModule } from '@angular/material/tabs';


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
  prod_data: any[];
  str;
  

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
        this.show("All");
      }
      else if (this.status1 = 'danger') {
        this.status1 = 'success';
        this.show("All");
      }
    }

    else if (a == 2){
      this.status2 = !this.status2;
      this.show("NewArrival");
    }
    else if (a == 3){
      this.status3 = !this.status3;
      this.show("Popular");
    }
    else if (a == 4)
      this.status4 = !this.status4;
      this.show("BestOffers");
  }


  show(str)
  {
    console.log(this.allData);
    let prod_data=[];
    for(let i=0;i<this.allData.length;i++)
    {
      console.log(this.allData[i].cat);
      console.log(str);
      if(this.allData[i].cat == "All")
      {
        console.log("ooooooooo");
        prod_data.push(this.allData[i]);
      }
    }
    console.log(this.prod_data);
  }
}
