import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  nome: string = '';
  senha: string = '';
  errorMessage: string = '';
  dataAtual = new Date();

  constructor(private router: Router, private authService: AuthService) {}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login(): void {
    this.errorMessage = '';

    const usuarioParaLogin = {
      nome: this.nome,
      senha: this.senha,
    };

    this.authService.login(usuarioParaLogin).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.errorMessage = 'Nome de usuário ou senha inválidos.';
        alert('Erro no login: ' + this.errorMessage);
      },
    });
  }
}
