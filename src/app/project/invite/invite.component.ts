import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { User } from '../../domain/user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {

  members: User[] = [];

  constructor(@Inject(MD_DIALOG_DATA) private data, 
  private dialogRef: MdDialogRef<InviteComponent>) {}

  ngOnInit() {
    this.members = [...this.data.members];
  }

  onSubmit(ev: Event, {valid, value}: NgForm) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(this.members);
  }
  
}
