import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';
import { USER_LOGIN } from 'src/app/_core/util/config';
import { DestroyableDirective } from 'src/app/_directives/destroyable.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./../user-layout/user-layout.component.scss'],
  providers: [MessageService]
})
export class LoginComponent extends DestroyableDirective implements OnInit {
  rememberMe: boolean = false;
  nickname: string;
  password: string;

  constructor(private messageService: MessageService, private userService: UserService, private router: Router) {
    super()
  }

  ngOnInit(): void {
  }

  login(user: User): void {

    this.userService.login(user).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.router.navigate([`/profile/${result.user.nickname}`]);

        let usLogin = JSON.stringify(result.user);
        localStorage.setItem(USER_LOGIN, usLogin);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: result.message })
      },
      error: err => {
        console.log({ err });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
      }
    })
  }
}
