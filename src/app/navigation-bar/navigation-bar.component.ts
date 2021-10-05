import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})


export class NavigationBarComponent implements OnInit {

  //constructor(private router: Router) { }

  selectOption:boolean =false;
  selectRefund(){
    this.selectOption = true;
  }
  selectDashboard(){
    this.selectOption = false
  }

  currentUser: any;
constructor(private router: Router) { }
  ngOnInit(): void {
    this.currentUser = sessionStorage.getItem('currentLoggedInUser');
  }

  /*showRefunds(){
    this.router.navigate(['./app/info-cards']);
  }*/
  logoutAdmin(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('currentLoggedInUser');
    this.router.navigate(['/']);
  }

}
