import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RsvpComponent } from './components/rsvp.component';
import { AddRsvpComponent } from './components/add-rsvp.component';

const routes: Routes = [
  { path: "", component: RsvpComponent },
  { path: "addRsvp", component: AddRsvpComponent },
  { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
