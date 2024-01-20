import { Component } from '@angular/core';
import { Book } from './shared/book';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

@Component({
  selector: 'wea5-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  // listOn = true;
  // detailsOn = false;
  // book: Book = new Book();
  
  // showList() {
  //   this.listOn = true;
  //   this.detailsOn = false;
  // }
  
  // showDetails(book: Book) {
  //   this.book = book;
  //   this.listOn = false;
  //   this.detailsOn = true;
  // }

  constructor(private oauthService: OAuthService) {
    // this.configureWithNewConfigApi();
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}
