
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roles = [
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User', permissions: ['Read'] }
  ];

  getRoles(): Observable<any[]> {
    return of(this.roles);
  }

  deleteRole(roleId: number): Observable<void> {
    this.roles = this.roles.filter(role => role.id !== roleId);
    return of();
  }
}
