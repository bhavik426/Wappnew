import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  Totalusers: Array<User> = [
    { id: 0, username: 'alice123', password: 'Alice123' },
    { id: 1, username: 'bob12345', password: 'Bob12345' }
  ]

  otherUsers!: Array<User>

  Activeuser: User = {} as User

  id = 3

  seen: Array<Seen>=[]

  constructor(private router: ActivatedRoute) {


    // unseen chat number

    this.router.params.subscribe(() => {

     let x = this.Totalusers.filter(u => u != this.Activeuser)

      for(let v of x)
      {

        let count = 0

        let filter = this.chatdata.filter(y=>y.sender==v.username)

        for (let i of filter) {
          if (!i.seen && this.chatdata.length>0) {
  
            count++
  
          }
          else {

          }
        }
        // if()
        // {
          this.seen.push({receiver:v.username,count:count})
        // }

      }

    })

  }

  //register user Function
  registeruser(user: string, pass: string) {

    // console.log(user, pass);

    this.Totalusers.push({ id: this.id++, username: user, password: pass })
    alert("User Successfully registered");

  }

  //Login user function
  loginmethod(user: string, pass: string) {

    let result = this.Totalusers.findIndex(x => ((x.username == user) && (x.password == pass)))

    let obj = this.Totalusers[result]
    if (result != -1) {
      this.Activeuser = obj
      this.otherUsers=this.Totalusers.filter(u => u != this.Activeuser)
      this.receiver=this.otherUsers[0].username
      // console.log(obj);
      return true
    }
    else {
      alert("Please Enter Proper username and password");
      return false
    }

  }


  //Logout function
  logoutmethod() {

    this.Activeuser = {} as User

    // console.log('User Logged Out', this.Activeuser);

  }


  //Active user data
  activeuserdata() {

    // console.log('Active User', this.Activeuser);

    return this.Activeuser

  }

  //guard function
  isloggdin() {
    if (this.Activeuser) {
      return true
    }
    else {
      return false
    }
  }

  //return all users except active one
  showallusers() {

    // console.log(this.Activeuser);

    return this.Totalusers.filter(u => u != this.Activeuser)

  }


  // chatlogic===============================================================================================================


  chatdata: Array<Chat> = []

  receiver!: string

  chatid = 1

  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  sendmsg(message: string) {
    let loginuser = this.Activeuser
    let sender = this.Activeuser.username
    let receiver = this.receiver
    let hour = new Date().getHours()
    let min = new Date().getMinutes()
    let date = new Date()
    let year = date.getFullYear()
    let month = this.month[date.getMonth()]
    let day = date.getDate()
    let msg = message

    if (loginuser != null && receiver != null && msg != null) {

      let obj: Chat = {
        id: this.chatid++,
        sender: sender,
        receiver: receiver,
        message: msg,
        hour: hour,
        min: min,
        date: date,
        year: year,
        month: month,
        day: day,
        seen: false
      }
      
      this.chatdata.push(obj)
      console.log('Chat Array', this.chatdata,obj);
    }
  }

  setreceiver(receiver: string) {

    this.receiver = receiver
    // console.log('Receiver Updated to', this.receiver);

  }





}
export interface User {

  id?: number
  username: string
  password: string

}


export interface Chat {
  id?: number
  sender: string
  receiver: string
  message: string
  hour?: number
  min?: number
  date?: Date
  year?: number
  month?: string
  day?: number
  seen?: boolean
}

export interface Seen {
  receiver: string
  count: number
}