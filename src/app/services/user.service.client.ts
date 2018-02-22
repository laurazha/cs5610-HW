import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

  constructor() {}

  users: User[] = [
    new User('123', 'alice', 'alice', 'Alice', 'Wonder'),
    new User('234', 'bob', 'bob', 'Bob', 'Marley'),
    new User('345', 'charly', 'charly', 'Charly', 'Garcia'),
    new User('456', 'jannunzi', 'jannunzi', 'Jose', 'Annunzi'),
  ];

  createUser(user: User) {
    user._id = Math.floor(Math.random() * 1000000) + '';
    this.users.push(user);
    return user;
  }

  findUserById(userId: string) {
    return this.users.find(function(user) {
      return user._id === userId;
    });
  }

  findUserByUsername(username: string) {
    return this.users.find(function(user) {
      return user.username === username;
    });
  }

  findUserByCredentials(username: string, password: string) {
    return this.users.find( function (user) {
      return user.username === username && user.password === password;
    });
  }

  updateUser(userId: string, user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i]._id === userId) {
        this.users[i].username = user.username;
        this.users[i].password = user.password;
        this.users[i].firstName = user.firstName;
        this.users[i].lastName = user.lastName;
        return this.users[i];
      }
    }
  }

  deleteUser(userId: String) {
    this.users.splice(this.users.findIndex(function(user) {
      return user._id === userId;
    }), 1);
  }
}
