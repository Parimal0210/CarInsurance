import { Component, Injectable, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})


export class NavigationBarComponent implements OnInit {

  //constructor(private router: Router) { }
constructor(private router: Router) { }
  ngOnInit(): void {
  }

  /*showRefunds(){
    this.router.navigate(['./app/info-cards']);
  }*/

}