import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/service/all.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {


  login: FormGroup

  constructor(private fb: FormBuilder, private ser: AllService, private router: Router) {

    this.login = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]]
    })
  }

  get username() {
    return this.login.get('username')
  }

  get password() {
    return this.login.get('password')
  }

  allow() {

    let user = this.username?.value
    let pass = this.password?.value

    
    if (user != null && pass != null) {
      let first = this.ser.showallusers()
      // this.ser.login(user,pass)
      if (this.ser.loginmethod(user, pass)) {
        this.router.navigate([`/chat/name/${first[0].username}`])
      }
      else {
        //error
      }
    }

  }

  redirect()
  {
    this.router.navigate(['/signup'])
  }

}
