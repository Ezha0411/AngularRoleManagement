import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    { id: 1, name: 'Ezhavendhan', email: 'ezhavendhan@gmail.com', role: 'Admin', status: 'Inactive' ,password:'Admin123'},
    { id: 2, name: 'Thangasamy', email: 'thangasamy@gmail.com', role: 'SDE', status: 'Active' },
    { id: 3, name: 'vinoth', email: 'vinoth@gmail.com', role: 'Network', status: 'Active' },
  ];
 
  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  updateUserStatus(userId: number, status: string): Observable<void> {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = status;
    }
    return of();
  }

  deleteUser(userId: number): Observable<void> {
    this.users = this.users.filter(u => u.id !== userId);
    return of();
  }
}
