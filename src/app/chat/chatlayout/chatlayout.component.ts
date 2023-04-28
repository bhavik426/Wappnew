import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllService, Chat, User } from 'src/app/service/all.service';

@Component({
  selector: 'app-chatlayout',
  templateUrl: './chatlayout.component.html',
  styleUrls: ['./chatlayout.component.css']
})
export class ChatlayoutComponent {

  loggedinuser = this.ser.Activeuser.username

  allusers=this.ser.showallusers()

  minichat:Array<Chat>=[]

  stopper=0

  stopper1()
  {
    this.stopper++
  }
  stopper2()
  {
    this.stopper--
  }

  time!:Date

  constructor(private router: Router, private ser: AllService,private activatedroute:ActivatedRoute) {

    this.friends = this.ser.showallusers()

    this.activatedroute.params.subscribe((params)=>
    {

      // console.log('unusedparams',params);
      let v:Array<Chat> = []
      for(let i of this.allusers)
      {
        
        if(this.ser.chatdata.length>0)
        {
           v = this.ser.chatdata.filter(x=>((x.receiver==i.username)||(x.sender==i.username)))
           
           console.log('filtered chat',this.ser.chatdata.filter(x=>{(x.receiver==i.username)||(x.sender==i.username)}));
        }

        if(v.length>0)
        {
          this.minichat.push(v[v.length-1])
        }


        
        
      }
      console.log('last v',v,'minichat',this.minichat);
    })
  }



  friends: Array<User> = []

  receiver(receiver: string) {
    this.ser.setreceiver(receiver)
  }

  logout() {

    this.ser.logoutmethod()
    this.router.navigate(['/signin']);

  }
}
