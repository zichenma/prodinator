import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class NewTaskComponent implements OnInit {
  title = '';
  priorities = [
    {
      label: 'Emergency',
      value: 1
    },
    {
      label: 'Improtant',
      value: 2
    },
    {
      label: 'Regular',
      value: 3
    }
  ];
  constructor(@Inject(MD_DIALOG_DATA) private data, 
  private dialogRef: MdDialogRef<NewTaskComponent>) {
    
  }

  ngOnInit() {
    this.title = this.data.title;
    console.log(JSON.stringify(this.data.task));
  }

  onClose(result: boolean) {
    this.dialogRef.close(result);
  }

  onClick() {
    
  }

}
