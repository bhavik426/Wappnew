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

  receiver!: string

  chats :Array<Chat> = []


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

        this.receiver=params.name

        this.chats.filter(x=>((x.receiver == params.name) || (x.sender == params.name)))
        console.log('params',params);
        console.log('Chat Section');
        console.log('Receiver',this.receiver);
        console.log('Chats',this.chats);

        this.chats = this.ser.chatdata.filter(x => ((x.receiver == this.receiver) || (x.sender == this.receiver)))
        
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
    this.receiver = this.ser.receiver

    this.chats = this.ser.chatdata.filter(x => ((x.receiver == this.receiver) || (x.sender == this.receiver)))
    
    console.log('message',message);
    
    console.log('Receiver',this.receiver)

    console.log('Chat Updated',this.chats);
    

  }




}
