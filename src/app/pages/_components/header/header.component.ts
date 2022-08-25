import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { USER_LOGIN } from 'src/app/_core/util/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userInput: any;
  user: any;
  isLogged: boolean = false;
  isOpenedProfile: boolean = false;
  noAvatar: string = '../../../../assets/images/no-profile-picture.png';

  constructor(private router: Router, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    if (localStorage.getItem(USER_LOGIN)) {
      this.isLogged = true;
    }
    else {
      this.isLogged = false;
    }
  }

  toggleProfile(): void {
    this.isOpenedProfile = !this.isOpenedProfile;
  }

  logOut(): void {
    this.confirmationService.confirm({
      message: 'Are you sure want to logout?',
      header: 'Logout',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      accept: () => {
        //Actual logic to perform a confirmation
        if (localStorage.getItem(USER_LOGIN)) {
          localStorage.removeItem(USER_LOGIN);
        }
        this.router.navigate(['/login']);
      }
    });
  }

}
