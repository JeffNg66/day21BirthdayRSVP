import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BirthdayService } from '../services/birthday.service';
import { Rsvp } from '../model/rsvp';

@Component({
  selector: 'app-add-rsvp',
  templateUrl: './add-rsvp.component.html',
  styleUrls: ['./add-rsvp.component.css']
})
export class AddRsvpComponent implements OnInit {
  
  statuses = [ 'Count me in!', 'Next time'];

  rsvpForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", Validators.required),
    status: new FormControl("Count me in!", Validators.required),
  });

  constructor(private rspSvc: BirthdayService, 
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveRsvp(){
    let name = this.rsvpForm.get("name").value;
    let email = this.rsvpForm.get("email").value;
    let phone = this.rsvpForm.get("phone").value;
    let status = this.rsvpForm.get("status").value;
    
    this.rspSvc.addRsvp({name, email, phone, status} as Rsvp)
      .subscribe(rsvp => {
        console.log(rsvp);
        // let snackBarRef = this.snackBar.open("Rsvp Added", "Done", {
        this.snackBar.open("Rsvp Added", "Done", {
          duration: 3000
        });
        this.router.navigate(['']);
      });
  }

}
