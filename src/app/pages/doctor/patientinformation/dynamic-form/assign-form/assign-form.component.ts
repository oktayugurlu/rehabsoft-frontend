import {Component, OnInit} from '@angular/core';
import {FormDynamicService} from '../../../../../shared/services/formdynamic.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../../../../../shared/services/patient.service';
import {FormField} from '../../../../../models/dynamicform/formfield';
import {FormFieldDefaultValue} from '../../../../../models/dynamicform/formfielddefaultvalue';



@Component({
  selector: 'app-assign-form',
  templateUrl: './assign-form.component.html',
  styleUrls: ['./assign-form.component.scss']
})
export class AssignFormComponent implements OnInit {
  tcKimlikNo:string;
  dataSource: FormField[];
  formFieldDefaultValueMap: any = new Map();
  formFieldSelectBoxElements: string[];
  showDragIcons: boolean;

  constructor(private dynamicFormService:FormDynamicService,private router: Router,route: ActivatedRoute,private patientService:PatientService) {
    route.parent.params.subscribe(
      (params) => {
        this.tcKimlikNo = params.tckimlikno;

      });
    this.dataSource = [];
    this.showDragIcons = true;
  }


  ngOnInit(): void {

  }

  onReorder = (e) => {
    var visibleRows = e.component.getVisibleRows(),
      toIndex = this.dataSource.indexOf(visibleRows[e.toIndex].data),
      fromIndex = this.dataSource.indexOf(e.itemData);

    this.dataSource.splice(fromIndex, 1);
    this.dataSource.splice(toIndex, 0, e.itemData);
    console.log(e.itemData);
  }

  onInitNewRow = (event) =>{
    event.data.key = new Date().valueOf().toString();
    console.log("event.data.key",this.formFieldDefaultValueMap);
    this.formFieldDefaultValueMap[event.data.key] = Array<FormFieldDefaultValue>();
  }

  submit = () =>{
    delete this.dataSource[0].key;
  }

}
