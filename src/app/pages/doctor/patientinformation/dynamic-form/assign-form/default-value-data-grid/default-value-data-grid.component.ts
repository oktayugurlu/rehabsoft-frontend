import {Component, Input, AfterViewInit} from '@angular/core';
import {FormFieldDefaultValue} from '../../../../../../models/dynamicform/formfielddefaultvalue';
import {FormDynamic} from '../../../../../../models/dynamicform/formdynamic';



@Component({
  selector: 'app-default-value-data-grid',
  templateUrl: './default-value-data-grid.component.html',
  styleUrls: ['./default-value-data-grid.component.scss']
})
export class DefaultValueDataGridComponent implements AfterViewInit {

  @Input()
  formFieldDefaultValueMap: any;

  @Input()
  key:number;

  dataSource: FormFieldDefaultValue[];
  defaultValue :FormFieldDefaultValue;


  ngAfterViewInit() {
    this.dataSource = this.formFieldDefaultValueMap[this.key];
    this.defaultValue = new FormFieldDefaultValue();
  }

  addMediaToList = (e) => {
    console.log("detay:",this.key);
    console.log("detay:",this.formFieldDefaultValueMap);
    this.formFieldDefaultValueMap[this.key].push(this.defaultValue);
    this.defaultValue = new FormFieldDefaultValue();
  }
}
