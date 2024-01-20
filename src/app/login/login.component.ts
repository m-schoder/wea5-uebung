import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wea5-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  login: any = {
    username: '',
    password: ''
  };

  private returnTo: string = '';

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.returnTo = params['returnUrl'])
  }

  submitForm() {
    if (this.auth.login(this.login.username, this.login.password)) {
      this.router.navigateByUrl(this.returnTo);
    } else {
      // TODO error message
    }
  }

}
