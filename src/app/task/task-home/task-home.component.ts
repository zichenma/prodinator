import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class TaskHomeComponent implements OnInit {
  
  @HostBinding('@routeAnim') state;

  lists = [
    {
      id: 1,
      name: 'waiting',
      order: 1,
      tasks: [
        {
          id: 1,
          desc: "Task One : Go to Starbucks",
          completed: true,
          priority : 3,
          owner: {
            id: 1,
            name: 'Zhang San',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date()
        },
        {
          id: 2,
          desc: "Task Two : Finish PPT assignment",
          completed: false,
          priority : 2,
          owner: {
            id: 1,
            name: 'LiSi',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        }

      ]
    },
    {
      id: 2,
      name: 'processing',
      order: 2,
      tasks: [
        {
          id: 1,
          desc: "Task Three : Code Review",
          completed: false,
          priority : 1,
          owner: {
            id: 1,
            name: 'WangWu',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: "Task Four: Making Project Plan",
          completed: false,
          priority : 2,
          owner: {
            id: 1,
            name: 'LiSi',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        }

      ]
    }
    
  
  ]

  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef) {}

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = 
    this.dialog.open(NewTaskComponent, 
      {data: {title: 'Create New Task'}});
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = 
    this.dialog.open(NewTaskComponent, 
      {data: {title: 'Edit Task', task: task}});
      dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchConfirmDialog() {
    const dialogRef =  this.dialog.open(
      ConfirmDialogComponent, 
      {data: {title : 'Delete Task List: ',
       content: 'Are your sure you want to delete this task list?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  lanchEditListDialog() {
    const dialogRef =  this.dialog.open(
      NewTaskListComponent, 
      {data: {title : 'Edit List Name: ',
       content: 'Are your sure you want to delete this task list?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  lanchNewListDialog() {
    const dialogRef =  this.dialog.open(
      NewTaskListComponent, 
      {data: {title : 'Create New List: ',
       content: 'Are your sure you want to delete this task list?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
      console.log('handling item');
      break;
      case 'task-list':
      console.log('handling list');
      const srcList = srcData.data;
      console.log(srcData);
      const tempOrder = srcList.order;
      srcList.order = list.order;
      list.order = tempOrder;
      break;
      default:
      break;
    }
  }

  handleQuickTask(desc: string) {
    console.log(desc);
  }

}
