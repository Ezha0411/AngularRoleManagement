import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: any = [] // to store the user data
  showUser: Boolean = false; //to show the uder data
  addnewuser: Boolean = false; //to add new users
  username: any //formControlName get username
  mailId: any //formControlName get username
  role: any //formControlName get username
  successmsg: boolean = false;
  updatemsg:Boolean=false
  buttonStatus: any
  userStatus: any;
  edituser: Boolean = false
  index:any
  newuserData = new FormGroup({
    username: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required,])
  })
  edituserdata = new FormGroup({
    username: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required,])
  })
  constructor(private userService: UserService,public route: Router) { }
  loadUsers() {

  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  openUserForm() {
    this.newuserData.reset()
    this.addnewuser = true
  }
  showUsers() {
    this.showUser = !this.showUser;
    console.log(this.edituser)
    if (this.edituser) {
      this.edituser = false
    }
  }
  logout(){
    this.route.navigate([''])
  }
  toggleStatus(user: any) {
    console.log(user)
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    this.userService.updateUserStatus(user.id, newStatus).subscribe(() => {
      user.status = newStatus;
    });
  }

  editUser(index: any) {
    this.newuserData.reset()
    this.index =index
    this.edituser = true
    this.newuserData.patchValue({
      username: this.users[index].name,
      mail: this.users[index].email,
      role: this.users[index].role
    })
    
  }
  updateData(){
    this.users[this.index].name = this.newuserData.value.username
    this.users[this.index].email =this.newuserData.value.mail
    this.users[this.index].role = this.newuserData.value.role
    this.updatemsg=true
    setTimeout(() => {
      this.updatemsg = false
    }, 2000);
    this.newuserData.reset()
  }
  deleteUser(index: any) {
    let bool = confirm("Sure you want to delete the User")
    if (bool) {
      this.users.splice(index, 1)
    }
  }
  closeAddUser() {
    this.addnewuser = false
    this.edituser = false
  }
  saveData() {
    this.successmsg = true
    this.users.push({
      id: this.users.length + 1,
      name: this.newuserData.value.username,
      email: this.newuserData.value.mail,
      role: this.newuserData.value.role,
      status: "Active"
    })
    setTimeout(() => {
      this.successmsg = false
    }, 2000);
    this.newuserData.reset()
  }
}
