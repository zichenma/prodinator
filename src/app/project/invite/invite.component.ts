import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteComponent implements OnInit {

  items = [
    {
      id: 1,
      name: 'ZhangSan'
    },
    {
      id: 2,
      name: 'Lisi'
    },
    {
      id: 3,
      name: 'WangWu'
    }
  ]

  constructor(@Inject(MD_DIALOG_DATA) private data, 
  private dialogRef: MdDialogRef<InviteComponent>) {
    
  }

  ngOnInit() {
  }

  displayUser(user : {id: string; name: string}) {
      return user ? user.name : '';
  }

  onClose(result: boolean) {
    this.dialogRef.close(result);
  }

  onClick () {
    console.log('click invite')
  }
  
  // user : {id: string; name: string} eqauls to: 

  // export interface User {
  //   id: string;
  //   name: string;
  // }

}
