import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() cssClass;
  public title: string = "Quản lý abc";
  constructor() { }

  ngOnInit(): void {
  }

}
