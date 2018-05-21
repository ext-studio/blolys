import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTransBorderColor]'
})
export class TransBorderColorDirective implements OnChanges {

  constructor(private el: ElementRef) { }
  @Input('appTransBorderColor') appTransBorderColor: String;

  public ngOnChanges(changes: SimpleChanges) {
    this.addColor();
  }
  private addColor() {
    let res: string;
    switch (this.appTransBorderColor) {
      case 'ClaimTransaction':
        res = 'rgb(57, 181, 232)';
        break;
      case 'MinerTransaction':
        res = 'rgb(243, 245, 54)';
        break;
      case 'ContractTransaction':
        res = 'rgb(62, 233, 195)';
        break;
      case 'RegisterTransaction':
        res = 'rgb(240, 71, 49)';
        break;
      case 'PublishTransaction':
        res = 'rgb(249, 125, 58)';
        break;
      case 'IssueTransaction':
        res = 'rgb(255, 48, 204)';
        break;
      case 'Enrollmenttransaction':
        res = 'rgb(79, 214, 81)';
        break;
      case 'InvocationTransaction':
        res = 'rgb(160, 99, 243)';
        break;
      default:
        res = '#fff';
        break;
    }
    this.el.nativeElement.style.borderLeftColor = res;
  }
}
