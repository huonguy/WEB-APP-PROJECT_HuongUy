import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { countries } from 'src/app/_core/constants/countries';
import { User } from 'src/app/_core/models/user';
import { UserService } from 'src/app/_core/services/user.service';
import { DestroyableDirective } from 'src/app/_directives/destroyable.directive';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends DestroyableDirective implements OnInit {

  userDetails!: User;
  noAvatar: string = '../../assets/images/no-profile-picture.png';
  editUserForm: boolean = false;

  nickname: string = '';
  countries: any;
  constructor(private messageService: MessageService, private atvRoute: ActivatedRoute, private userService: UserService) {
    super()
  }

  ngOnInit(): void {
    this.atvRoute.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.nickname = params['nickname'];
    })

    this.userService.getUserDetails(this.nickname).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        this.userDetails = result;
      },
      error: err => {
        console.log({ err })
      }
    })

    this.countries = countries
  }

  editUser(event: Event) {
    event.preventDefault();
    this.editUserForm = !this.editUserForm;
  }

  cancelEditForm(): void {
    this.editUserForm = !this.editUserForm;
  }

  clickEditUser() {
    this.userService.updateUserDetail(this.userDetails.nickname, this.userDetails).pipe(takeUntil(this.destroy$)).subscribe({
      next: result => {
        console.log(result);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: `${result.message}`, life: 3000 })
      },
      error: err => {
        console.log({ err })
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 })
      }
    })
  }

}
