import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private userService: UserService, private router: Router) { }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    const user: User = this.userService.findUserByCredentials(this.username, this.password);
    if (user) {
      this.router.navigate(['/profile', user._id]);
    }
  }

  ngOnInit() {
  }

}
