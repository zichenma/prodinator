import { Component, OnInit, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  
  projects;

  // projects = [
  //   {
  //     "id" : 1,
  //     "name" : "Enterprise Coordinator",
  //     "desc" : "This is an interal project",
  //     "coverImg" : "assets/img/covers/0.jpg"
  //   },
  //   {
  //     "id" : 2,
  //     "name" : "Auto Testing Project",
  //     "desc" : "This is an interal project",
  //     "coverImg" : "assets/img/covers/1.jpg"
  //   }
  // ]

  constructor(private dialog: MdDialog, private cd: ChangeDetectorRef, private service$: ProjectService) {}

  ngOnInit() {
    this.service$.get("1").subscribe(projects => this.projects = projects);
    let a = this.service$.get("1").subscribe(projects => this.projects = projects);
  }

  openNewProjectDialog () {
    const dialogRef =  this.dialog.open(NewProjectComponent, {data: {title : 'Create New Project: '}});
    dialogRef.afterClosed().subscribe(result => {
      this.projects = [...this.projects, {id: 3, name: 'a new project', desc: 'this is a new project', coverImg: 'assets/img/covers/8.jpg'}]
      this.cd.markForCheck();
    }
    );
  }

  launchInviteDialog() {
    const dialogRef =  this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef =  this.dialog.open(NewProjectComponent, {data: {title : 'Edit Project: '}});
  }

  launchConfirmDialog(project) {
    const dialogRef =  this.dialog.open(
      ConfirmDialogComponent, 
      {data: {title : 'Delete Project: ',
       content: 'Are your sure you want to delete this project?'}});
    dialogRef.afterClosed().subscribe(result => {
      this.projects = this.projects.filter(p => p.id !== project.id)
      this.cd.markForCheck();
    }
    );
  }

}
 