import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading: Boolean = false;
  error = '';

  constructor(
    private router: Router,
    private authSevice: AuthService
  ) { }

  ngOnInit() {
    // treset login status
    this.authSevice.logout();
  }

  login() {
    this.loading = true;
    this.authSevice.login(this.model.username, this.model.password)
      .subscribe((result) => {
        if (result === true) {
          // login successfull
          this.router.navigate(['/']);
        } else {
          // login failed
          this.error = 'Login failed';
          this.loading = false;
        }
      });
  }

}
