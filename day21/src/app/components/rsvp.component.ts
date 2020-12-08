import { Component, OnInit } from '@angular/core';
import { BirthdayService } from '../services/birthday.service';
import { Rsvp } from '../model/rsvp';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RsvpComponent implements OnInit {
  
  rsvps: Rsvp[];

  constructor(private birthdaySvc: BirthdayService) { }

  ngOnInit(): void {
    this.getRsvps();
  }

  getRsvps(): void {
    this.birthdaySvc.getAllRsvps()
    .subscribe(rsvps => this.rsvps = rsvps);
  }

}

