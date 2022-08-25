import { NgModule } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [],
  imports: [
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    MessageModule,
    MessagesModule
  ],
  exports: [
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    MessageModule,
    MessagesModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ]
})
export class PrimengModule { }
