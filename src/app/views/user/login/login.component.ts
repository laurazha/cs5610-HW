import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: string;
  password: string;
  errorFlag = false;
  errorMsg = 'Invalid username or password!';

  constructor(private userService: UserService,
              private router: Router,
              private sharedService: SharedService) {}

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    this.userService.login(this.username, this.password)
      .subscribe(
        (user: any) => {
          this.sharedService.user = user;
          this.router.navigate(['/profile']);
          },
        (error: any) => {
          console.log(error);
          this.errorFlag = true;
        }
      );
  }

  ngOnInit() {
  }

}
