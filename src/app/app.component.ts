import { AfterViewInit, Component, HostListener } from '@angular/core';
import { environment } from '../environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { RequestService } from './services/request/request.service';

declare const gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'swapsoul';

  sectionStyles: any = {};

  constructor(private router: Router, private cookie: CookieService,
              private requestService: RequestService) {
    if (environment.envName !== 'development') {
      this.addGoogleAnalyticsScript();
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        gtag('event', 'page_view', {
          page_path: event.urlAfterRedirects
        });
      });
    }
    this.requestService.initializeUserFromCookie();
  }

  addGoogleAnalyticsScript(): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gtagId;
    document.head.prepend(script);

    /* Disable automatic page view hit to fix duplicate page view count  */
    gtag('config', environment.gtagId, { send_page_view: false });
  }

  @HostListener('window:resize', ['$event'])
  onResize(_): void {
    const navbarHeight = document.getElementsByTagName('app-navbar')[0].clientHeight;
    this.sectionStyles = { 'min-height': (window.innerHeight - navbarHeight) + 'px' };
  }

  ngAfterViewInit(): void {
    this.onResize(null);
  }
}
