import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user.model.client';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User;
  userId: string;
  updateFlag = false;
  updateMsg = 'Profile updated!';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute) { }

  updateUser() {
    this.user = this.userService.updateUser(this.userId, this.user);
    this.updateFlag = true;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.user = this.userService.findUserById(this.userId);
    });
  }

}
