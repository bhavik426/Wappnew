import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/service/all.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  
  login:FormGroup

  constructor(private fb:FormBuilder,private ser:AllService,private route:Router)
  {

    this.login=this.fb.group({
      username:['',[Validators.required,Validators.minLength(3)]],
      password:['',[Validators.required,Validators.minLength(8),Validators.pattern("^(?=.*)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$")]]
    })
  }

  get username()
  {
    return this.login.get('username')
  }

  get password()
  {
    return this.login.get('password')
  }
  
  register()
  {

    let user = this.username?.value
    let pass = this.password?.value

    if(user!=null && pass!=null)
    {
      this.ser.registeruser(user,pass)
      this.route.navigate(['/signin'])
    }

  }
}
