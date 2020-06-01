import { Component, OnInit } from '@angular/core';
import { Actions } from 'src/app/models/Actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public givenAction: Actions;
  nrSelect = 'three'

  constructor() { }

  ngOnInit() {
  }

}
