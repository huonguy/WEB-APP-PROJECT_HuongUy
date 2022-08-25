import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { countries } from 'src/app/_core/constants/countries';
import { UserService } from 'src/app/_core/services/user.service';
import { DestroyableDirective } from 'src/app/_directives/destroyable.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./../user-layout/user-layout.component.scss']
})
export class RegisterComponent extends DestroyableDirective implements OnInit {

  countries: any[];
  constructor(private router: Router, private messageService: MessageService, private userService: UserService) {
    super()
  }
  selectedCountry: string;

  ngOnInit(): void {
    this.countries = countries;
  }

  register(registerForm: NgForm): void {
    this.userService.register(registerForm.value).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        registerForm.reset();
        this.router.navigate(['/login']);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${result.message}`, life: 3000 });
      },
      error: err => {
        console.log({ err });
        if (err.error.error.original.errno = 1062) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There is already existing email/nickname into database.', life: 3000 });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });

        }
      }
    })
  }
}
