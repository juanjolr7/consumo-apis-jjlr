import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  users: Array<any> = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = Object.values(data);
      console.log('users ', this.users);
    });
  }

  onSubmit() {
    // Verificar si existe un usuario con el email y password proporcionados
    const userExists = this.users.find(
      (user) => user.email === this.username && user.password === this.password
    );

    if (userExists) {      
      this.router.navigate(['/users']);
    } else {
      alert('Credenciales incorrectos');
    }
  }
}
