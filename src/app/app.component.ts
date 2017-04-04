import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'wui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wui works!';

  dataset: any;

  constructor (private _http: Http) { }

  ngOnInit() {
    this._http.get('assets/data/100k.json')
      .subscribe(res => { this.dataset = res.json(); });
  }
}
