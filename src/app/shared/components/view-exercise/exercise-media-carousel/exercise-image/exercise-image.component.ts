import {Component, Input, OnChanges, OnInit} from "@angular/core";
import notify from "devextreme/ui/notify";
import { switchMap,map } from 'rxjs/operators';

import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-exercise-image-component',
  template: `
    <img class="d-block w-75" [src]="dataUrl$|async" [alt]="'asa'">
  `
})
export class ExerciseImageComponent  implements OnChanges, OnInit {

  @Input()
  src:string;
  private src$ = new BehaviorSubject(this.src);
  ngOnChanges(): void {
    this.src$.next(this.src);
  }

// this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  dataUrl$ = this.src$.pipe(switchMap(url => this.loadImage(url)))

  constructor(private httpClient: HttpClient, private domSanitizer: DomSanitizer) {
  }


  private loadImage(url: string): Observable<any> {
    return this.httpClient
      // load the image as a blob
      .get(url, {responseType: 'blob'})
      // create an object url of that blob that we can use in the src attribute
      .pipe(map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))));
  }

  ngOnInit(): void {
    console.log("Acildi");
  }
}
