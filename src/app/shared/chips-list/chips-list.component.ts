import {Component, forwardRef, OnInit, Input} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { User } from '../../domain/user.model';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

@Input() multiple = true;
@Input() placeholderText = 'type a member email';
@Input() label = 'Add/Edit Memebers';

form: FormGroup;
items: User[] = [];
memberResults$: Observable<User[]>;


constructor(private fb: FormBuilder, private service: UserService) { }

ngOnInit() {
  this.form = this.fb.group({
    memberSearch : ['']
  });
  this.memberResults$ = this.form.get('memberSearch').valueChanges
  .debounceTime(500)
  .distinctUntilChanged()
  .filter(s => s && s.length > 1)
  .switchMap(str => this.service.searchUsers(str));
}

private propagateChange = (_: any) => {};

// 提供值的写入方法
public writeValue(obj: User[]) {
  if (obj && this.multiple) {
    // convert a array to a hashmap
    const userEntities = obj.reduce((e, c) => ({...e, c}), {});
    if (this.items) {
      const remaining = this.items.filter(item => !userEntities[item.id]);
      // 获得 remaining 和 obj 的并集
      this.items = [...remaining, ...obj];
    }
  } else if (obj && !this.multiple) {
      this.items = [...obj];
  }
}

// 当表单控件值改变时，函数 fn 会被调用
// 这也是我们把变化 emit 回表单的机制
public registerOnChange(fn: any) {
  this.propagateChange = fn;
}

// 这里没有使用，用于注册 touched 状态
public registerOnTouched(fu: any): void {};

// 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
validate(c: FormControl): {[key: string]: any} {
  return this.items ? null : {
    chipListInvalid: true
  };
}

removeMember(member: User) {
  const ids = this.items.map(item => item.id);
  const i = ids.indexOf(member.id);
  if (this.multiple) {
    this.items = [...this.items.slice(0 , i), ...this.items.slice(i + 1)];
  } else {
    this.items = [];
  }
}

handleMemberSelection (member: User) {
  // if current array items contains the member we want to add,
  // just return;
  if (this.items.map(item => item.id).indexOf(member.id) !== -1) {
    return;
  }
  this.items = this.multiple ? [...this.items, member] : [member];
  this.form.patchValue({memberSearch: member.name});
  this.propagateChange(this.items);
}

displayUser (user: User): string {
  return user ? user.name : '';
}



get displayInput() {
  return this.multiple || (this.items.length === 0);
}

}
