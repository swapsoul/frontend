import { Component, OnInit } from '@angular/core';
import { ExternalUrlsService } from '../../services/externalUrls/external-urls.service';

@Component({
  selector: 'app-campus-ambassador',
  templateUrl: './campus-ambassador.component.html',
  styleUrls: ['./campus-ambassador.component.scss']
})
export class CampusAmbassadorComponent implements OnInit {

  constructor(public externalUrlService: ExternalUrlsService) { }

  ngOnInit(): void {
  }
}
