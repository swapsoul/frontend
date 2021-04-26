import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  mode = 'indeterminate';
  value = 50;
  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
