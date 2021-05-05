import { Component, OnInit } from '@angular/core';
import { ExternalUrlsService } from '../../services/externalUrls/external-urls.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public externalUrlService: ExternalUrlsService) { }

  ngOnInit(): void {
  }
}
