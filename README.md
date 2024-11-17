# Reporte del Login y Consumo de APIs para obtener credenciales en Angular

## Objetivo del proyecto
El propósito de este proyecto es desarrollar una aplicación en Angular que permita a los usuarios iniciar sesión y, tras la autenticación, visualizar una lista de usuarios obtenida desde una API pública. Para la construcción del proyecto, se utilizan componentes y servicios de Angular Material para la creación de una interfaz moderna y funcional.

## Requisitos Previos
#### Conocimientos básicos en Angular, TypeScript y HTML.
#### Tener instalado Angular CLI (npm install -g @angular/cli).
#### Entorno de desarrollo configurado con Node.js y npm.
#### Instalación de Angular Material (ng add @angular/material).
#### Conexión a una API pública 

```bash
https://api.escuelajs.co/api/v1/users
```

## Parte 1: Configuración del Proyecto Angular
Crear un nuevo proyecto en Angular ejecutando el siguiente comando:
```bash
ng new ejercicio-login-jjlr
cd ejercicio-login-jjlr
```

Aceptar las configuraciones predeterminadas.

Instalar Angular Material para los componentes de la interfaz:

```bash
ng add @angular/material
```

## Parte 2: Creación del Servicio para Consumir la API
El servicio se encarga de realizar peticiones HTTP para obtener los datos de usuarios. A continuación, se muestra el código utilizado en user.service.ts:
```bash
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}`);
  }
}
```

Explicación:

El método getUsers() utiliza el servicio HttpClient para realizar una solicitud GET a la API, devolviendo la lista de usuarios en formato JSON.

## Parte 3: Implementación del Login con Angular Material
Se ha creado un componente de login que permite a los usuarios iniciar sesión. El formulario se valida utilizando componentes de Angular Material, como MatFormField, MatInput, y MatButton.

Código del formulario de login (login.component.html):

```bash
<div class="login-container">
  <mat-card class="login-card">
    <h2>🔑 Iniciar Sesión</h2>
    <form (ngSubmit)="onSubmit()" class="login-form">
      <mat-form-field appearance="outline" class="form-field">
        <mat-label>Usuario</mat-label>
        <input matInput [(ngModel)]="username" name="username" required>
      </mat-form-field>
      <mat-form-field appearance="outline" class="form-field">
        <mat-label>Contraseña</mat-label>
        <input matInput type="password" [(ngModel)]="password" name="password" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit">Entrar</button>
    </form>
  </mat-card>
</div>
```

Lógica del Login (login.component.ts):

```bash
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  users: Array<any> = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = Object.values(data);
    });
  }

  onSubmit() {
    const userExists = this.users.find(
      (user) => user.email === this.username && user.password === this.password
    );

    if (userExists) {
      this.router.navigate(['/users']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Credenciales incorrectas!',
      });
    }
  }
}
```

Explicación:
#### ngOnInit() obtiene la lista de usuarios al cargar el componente.
#### onSubmit() verifica si las credenciales ingresadas coinciden con las de la API.
#### Si las credenciales son correctas, redirige a la página de usuarios; de lo contrario, muestra un mensaje de error.


## Parte 4: Mostrar Lista de Usuarios en una Tabla
Una vez que el usuario ha iniciado sesión correctamente, se redirige a un componente que muestra una tabla con los usuarios obtenidos de la API.

Código del Componente de Lista de Usuarios (user-list.component.html):

```bash
<div class="container mt-5">
  <h2>User List</h2>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let user of users">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
      </tr>
    </tbody>
  </table>
</div>
```

Lógica del Componente (user-list.component.ts):

```bash
import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = Object.values(data);
    });
  }
}
```

Explicación:

El componente utiliza el servicio UserService para obtener la lista de usuarios y mostrarlos en una tabla utilizando *ngFor.

## Parte 5: Ejecución del Proyecto
Para ejecutar la aplicación:
```bash
ng serve -o
```

## Resultado

### Login

![Captura de pantalla 2024-11-16 201718](https://github.com/user-attachments/assets/84b5cc39-a190-4cab-9324-25cecf636d66)

### Mensaje de error cuando hay credencias incorrectas

![Captura de pantalla 2024-11-16 201835](https://github.com/user-attachments/assets/e7aeba2e-d4f2-4a73-90c4-5862002bf321)


### Lista de usuarios consumida del api


![Captura de pantalla 2024-11-16 201940](https://github.com/user-attachments/assets/9b57e041-b1a2-4ee5-b566-2b4f08dd1d54)


## Conclusión

El desarrollo de esta aplicación en Angular, que integra un sistema de autenticación y el consumo de una API pública, nos permitió profundizar en conceptos clave del framework, como la creación de servicios, el uso de componentes reutilizables y la implementación de Angular Material para mejorar la interfaz de usuario. La separación entre la lógica de negocio y la presentación, lograda a través de los servicios, garantiza un código más modular y fácil de mantener.

El sistema de login implementado, junto con la visualización de usuarios obtenidos desde una API externa, demuestra cómo Angular puede ser utilizado para construir aplicaciones escalables que interactúan de manera eficiente con servicios remotos. Esto no solo mejora la experiencia del usuario, sino que también permite una mejor organización y gestión de los datos.
