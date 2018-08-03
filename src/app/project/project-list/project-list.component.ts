import { Component, OnInit, OnDestroy, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { MdDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';
import { ProjectService } from '../../services/project.service';
import * as _ from 'lodash';
import { Project } from '../../domain';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';


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
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;
  
  projects;
  sub: Subscription;

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
      this.sub = this.service$.get("1").subscribe(projects => {
      this.projects = projects;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
        this.sub.unsubscribe();
    }
  }

  openNewProjectDialog () {
   
    const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
    const dialogRef =  this.dialog.open(NewProjectComponent, 
      {data: {thumbnails: this.getThumbnails(), img: selectedImg}});
    dialogRef.afterClosed()
    // using take(1), only take the first and complete, no need to unsubscribe
    .take(1)
    // filter out emtpy project (undefine or null) when close
    .filter(n => n)
    // if obj not has certian attr, it will add this attr
    .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
    .switchMap(v => this.service$.add(v))
    .subscribe(project => {
      this.projects = [...this.projects, project];
      this.cd.markForCheck();
    });
  }

  launchInviteDialog() {
    const dialogRef =  this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(project: Project) {
    const dialogRef =  this.dialog.open(NewProjectComponent, 
      {data: {thumbnails: this.getThumbnails(), project: project}});
    dialogRef.afterClosed()
    .take(1)
    .filter(n => n)
    .map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)}))
    .switchMap(v => this.service$.update(v))
    .subscribe(project => {
      // get the index of id from projects obj list
      const index = this.projects.map(p => p.id).indexOf(project.id);
      // [keep before the project, only update project, keep after project]
      this.projects = [...this.projects.slice(0, index), project, ...this.projects.slice(index + 1)];
      this.cd.markForCheck();
    });
    // const dialogRef =  this.dialog.open(NewProjectComponent, {data: {title : 'Edit Project: '}});
  }

  launchConfirmDialog(project) {
    const dialogRef =  this.dialog.open(
      ConfirmDialogComponent, 
      {data: {title : 'Delete Project: ',
       content: 'Are your sure you want to delete this project?'}});
      dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .switchMap(_ => this.service$.del(project))
      .subscribe(prj => {
        this.projects = this.projects.filter(p => p.id !== prj.id)
        this.cd.markForCheck();
    }
    );
  }

  private getThumbnails() {
    console.log()
    return _.range(0, 40)
           .map(i => `assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string): string {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }
  
}
 