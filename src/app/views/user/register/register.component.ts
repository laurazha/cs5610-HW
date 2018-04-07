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
  errorFlag = false;
  errorMsg = 'Passwords mismatch!';

  constructor(private userService: UserService, private router: Router) { }

  register() {
    this.username = this.registerForm.value.username;
    this.password = this.registerForm.value.password;
    this.vpassword = this.registerForm.value.vpassword;
    if (this.vpassword === this.password) {
      this.userService.register(this.username, this.password).subscribe(
        (data: User) => {
          this.errorFlag = false;
          this.router.navigate(['/profile']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.errorFlag = true;
    }
  }

  ngOnInit() {
  }

}
