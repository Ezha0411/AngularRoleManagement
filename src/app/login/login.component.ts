import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showUser:any
  loginUserdetails:any
  rootFormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    cpassword: new FormControl("", [Validators.required,])
  })
  userDetails: any = []
  constructor(private userService: UserService, public route: Router) { }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.userDetails = users
    })
  }
  loginUser() {
    let error = document.querySelectorAll(".error")
    error[0].innerHTML = ""
    error[1].innerHTML = ""
    error[2].innerHTML = ""
    let loginUserData = this.userDetails.find((t: any) => t.name == this.rootFormGroup.value.username)
    this.loginUserdetails= loginUserData
    if (loginUserData != undefined) {
      let length: any = this.rootFormGroup.value.password?.length
      if (length >= 8) {
        if ((this.rootFormGroup.value.password === this.rootFormGroup.value.cpassword)) {
          if (loginUserData.role == "Admin") {
            if(this.rootFormGroup.value.password === loginUserData.password){
              this.route.navigate(['Admin-dashboard'])
            }
            else{
              error[1].innerHTML = "Please Enter the correct Password"
            }
          }
          else {
            this.route.navigate(['user-roles'],{state:{loginUserdetails:this.loginUserdetails}})
          }
        }
        else {
          error[2].innerHTML = "Password Doesn't Match"
        }
      }
      else {
        error[1].innerHTML = "Password Must be 8 Characters"
      }
    }
    else {
      error[0].innerHTML = "Please Enter the correct User Name"
    }
  }
  changeUser(){this.showUser =!this.showUser}
}
