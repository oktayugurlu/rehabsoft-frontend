import {Component, Input, OnChanges, OnInit} from "@angular/core";
import notify from "devextreme/ui/notify";
import { switchMap,map } from 'rxjs/operators';

import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-asyn-image-component',
  template: `
    <img [src]="dataUrl$|async" [alt]="'asa'" class="img-responsive">
  `
})
export class AsynImageComponent  implements OnChanges, OnInit {

  @Input()
  src:string;
  private src$: BehaviorSubject<any>;

// this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  dataUrl$:Observable<any>;

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
    console.log("this.src$",this.src$);
    this.src$ = new BehaviorSubject(this.src);
    this.dataUrl$ = this.src$.pipe(switchMap(url => this.loadImage(url)));
    this.src$.next(this.src);
  }

  ngOnChanges(): void {
  }
}
