import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 md-dialog-tiitle>{{title}}</h3>
    <div md-dialog-content id="content">
       {{content}}
    </div>
    <div md-dialog-actions>
      <button type="button" md-raised-button color="primary" (click)="onClick(true)">Cofirm</button>
      <button type="button" md-button md-dialog-close (click)="onClick(false)">Cancel</button>
    </div>
  `,
  styles: [`
    #content  {
      margin-top: 5px;
      margin-bottom: 20px;
    }
  `]
})
export class ConfirmDialogComponent implements OnInit {
  title = '';
  content = '';
  constructor(
    private dialogRef: MdDialogRef<ConfirmDialogComponent>,
  @Inject(MD_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  onClick(result: boolean) {
    this.dialogRef.close(result);
  }

}
