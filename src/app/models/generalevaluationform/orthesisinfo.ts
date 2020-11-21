export class OrthesisInfo{
  constructor(rightPart: boolean, leftPart: boolean, orthesisName: string){
    this.rightPart = rightPart;
    this.leftPart = leftPart;
    this.orthesisName = orthesisName;
  }
  rightPart: boolean;
  leftPart: boolean;
  orthesisName: string;
}
