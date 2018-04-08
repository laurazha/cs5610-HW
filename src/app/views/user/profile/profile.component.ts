import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User;
  updateFlag = false;
  updateMsg = 'Profile updated!';
  errorFlag = false;
  errorMsg = 'Username cannot be empty!';

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedService) {
    this.user = new User(null, '', '', '', '', '');
  }

  ngOnInit() {
    this.user = this.sharedService.user;
    this.errorFlag = false;
    this.updateFlag = false;
  }

  updateUser() {
    this.errorFlag = false;
    this.updateFlag = false;
    if (!this.user.username || !this.user.password) {
      this.errorFlag = true;
      this.updateFlag = false;
      return;
    }
    this.userService.updateUserInServer(this.user._id, this.user).subscribe(
      (user: User) => {
        this.user = user;
        this.updateFlag = true;
        this.errorFlag = false;
      },
      (error: any) => console.log(error));
  }

  deleteUser() {
    this.userService.deleteUserInServer(this.user._id).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error: any) => console.log(error)
    );
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login']),
        (error: any) => console.log(error)
      );
  }

}

