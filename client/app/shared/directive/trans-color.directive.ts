import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appTransColor]'
})
export class TransColorDirective implements OnChanges {
  constructor(private el: ElementRef) { }
  @Input('appTransColor') appTransColor: String;

  public ngOnChanges(changes: SimpleChanges) {
    this.addColor();
  }
  private addColor() {
    let res: string;
    switch (this.appTransColor) {
      case 'ClaimTransaction':
        res = 'rgb(61, 155, 195)';
        break;
      case 'MinerTransaction':
        res = 'rgb(201, 196, 47)';
        break;
      case 'ContractTransaction':
        res = 'rgb(37, 186, 155)';
        break;
      case 'RegisterTransaction':
        res = 'rgb(179, 43, 40)';
        break;
      case 'PublishTransaction':
        res = 'rgb(199, 106, 56)';
        break;
      case 'IssueTransaction':
        res = 'rgb(197, 55, 162)';
        break;
      case 'Enrollmenttransaction':
        res = 'rgb(72, 167, 39)';
        break;
      case 'InvocationTransaction':
        res = 'rgb(139, 100, 208)';
        break;
      default:
        res = '#fff';
        break;
    }
    this.el.nativeElement.style.color = res;
  }
}
