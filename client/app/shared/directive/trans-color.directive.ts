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
    console.log(this.appTransColor);
    switch (this.appTransColor) {
      case 'ClaimTransaction':
        res = '#31aadc';
        break;
      case 'MinerTransaction':
        res = '#f3f536';
        break;
      case 'ContractTransaction':
        res = '#3ee9c3';
        break;
      case 'RegisterTransaction':
        res = '#f04731';
        break;
      case 'PublishTransaction':
        res = '#f97d3a';
        break;
      case 'IssueTransaction':
        res = '#ff3a5a';
        break;
      case 'Enrollmenttransaction':
        res = '#ff30cc';
        break;
      default:
        res = '#fff';
        break;
    }
    this.el.nativeElement.style.color = res;
  }
}
