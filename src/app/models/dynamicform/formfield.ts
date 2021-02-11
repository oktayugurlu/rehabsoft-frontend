import {FormDynamic} from './formdynamic';
import {FormFieldDefaultValue} from './formfielddefaultvalue';

export class FormField{
  id: number;
  fieldName: string;
  fieldType: string;
  fieldOrder: number;
  defaultValues: FormFieldDefaultValue[];

  // Its just used for front end purpose
  key:string;
}
