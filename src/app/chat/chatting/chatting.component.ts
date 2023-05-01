import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllService, Chat } from 'src/app/service/all.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent {

  receiver: string=this.ser.otherUsers[0].username

  chats :Array<Chat> = []

  bothchat:Array<Chat> = []

  loginuser=this.ser.Activeuser

  //form
  message: FormGroup

  constructor(private fb: FormBuilder, private ser: AllService,private router:ActivatedRoute) {


    this.message = this.fb.group({
      text: []
    })



      // this.receiver = this.ser.receiver
      // this.chats = this.ser.chatdata.filter(x => ((x.receiver == this.receiver) || (x.receiver == this.active)))
      // console.log(this.chats, this.receiver)

      this.router.params.subscribe((params: any) => {

        this.loginuser=this.ser.Activeuser

        this.receiver=params.name
        console.log('params', params);
        
        console.log('Chat Filter 0',this.chats);

        this.chats = this.ser.chatdata.filter(x => ( (x.receiver == this.loginuser.username)||(x.sender == this.loginuser.username)))
        // this.chats.filter(x=>((x.receiver == params.name)
        // //  || (x.sender == params.name)
        //  ))
        console.log('Chat Filter 1',this.chats);

        this.chats = this.chats.filter(x=>(x.receiver==params.name)||(x.sender==params.name))
        // console.log('params',params);
        // console.log('Chat Section');
        // console.log('Receiver',this.receiver);


        console.log('Chat Filter 2',this.chats);
        
      })


  }

  get text() {
    return this.message.get('text')
  }

  sendtext() {
    let message = this.text?.value
    // console.log(message);

    if (message != null) {
      this.ser.sendmsg(message)
      // console.log(message);
    }
    // this.receiver = this.ser.receiver

    this.chats = this.ser.chatdata.filter(x => ( (x.receiver == this.loginuser.username)||(x.sender == this.loginuser.username)))
    // this.chats.filter(x=>((x.receiver == params.name)
    // //  || (x.sender == params.name)
    //  ))
    console.log('Chat Filter 1',this.chats);

    this.chats = this.chats.filter(x=>(x.receiver==this.receiver)||(x.sender==this.receiver))
    
    // console.log('message',message);
    
    // console.log('Receiver',this.receiver)

    console.log('Chat Updated',this.chats);
    

  }
}

