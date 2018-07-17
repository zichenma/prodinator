import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  // must initiate all field in FormControl
  ngOnInit() {
    // this.form = new FormGroup({
    //   email: new FormControl('Joe@email.com', 
    //   Validators.compose([Validators.required, Validators.email])),
    //   password: new FormControl('', Validators.required)
    // })
    this.form = this.fb.group({
      // customize validate
      // email: ['joe@email.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      email: ['joe@email.com', Validators.compose([Validators.required, Validators.email])],
      password : ['',Validators.required]
    })
  }
  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();

    // dinamic validate
    // if () {
    //   this.form.controls['email'].setValidators(this.validate);
    // }
    
  }
  
  // customize validator
  // validate(c: FormControl) : {[key: string] : any} {
  //   if (!c.value) {
  //     return null;
  //   }
  //   const pattern = /^joe+/;
  //   if (pattern.test(c.value)) {
  //     return null;
  //   }

  //   return {
  //     emailNotValid: 'The email must start with Joe!'
  //   }
  // }
}
