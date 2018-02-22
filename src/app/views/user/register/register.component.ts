import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @ViewChild('r') registerForm: NgForm;
  username: string;
  password: string;
  vpassword: string;
  errorFlag: boolean;
  errorMsg = 'Password mismatching!';

  constructor(private userService: UserService, private router: Router) { }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.vpassword = this.registerForm.value.vpassword;
    if (this.vpassword === this.password) {
      this.errorFlag = false;
      let user = new User('', this.username, this.password, '', '');
      user = this.userService.createUser(user);
      if (user) {
        this.router.navigate(['/profile', user._id]);
      }
    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
  }

}
