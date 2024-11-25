import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
  loginUserdetails: any
  userdetails: Boolean = false
  userTask:Boolean=false

  constructor(public route: Router) { }

  ngOnInit(): void {
    this.loginUserdetails = history.state

    console.log(this.loginUserdetails.loginUserdetails);
  }
  viewDetails() {
    this.userdetails =  !this.userdetails
  }
  viewTask(){this.userTask =!this.userTask}
  logout(){
    this.route.navigate([''])
  }


}

