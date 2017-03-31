import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'wui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wui works!';

  // testData = {
  //   cols: [
  //     { name: 'name' },
  //     { name: 'gender' },
  //     { name: 'age' }
  //   ],
  //   rows: [
  //     { name: 'julie', gender: 'female', weight: '143' },
  //     { name: 'max', gender: 'male', weight: '176' },
  //     { name: 'charles', gender: 'male', weight: '203' },
  //     { name: 'elle', gender: 'female', weight: '168' },
  //   ]
  // };

  dataset: any;

  constructor (private _http: Http) { }

  ngOnInit() {
    this._http.get('assets/data/100k.json')
      .subscribe(res => {
        this.dataset = res.json();
        console.log(this.dataset);
      });
  }
}
