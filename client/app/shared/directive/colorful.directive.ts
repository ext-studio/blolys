import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorful]'
})
export class ColorfulDirective {

  constructor(private el: ElementRef) {
    this.addColor();
  }
  @Input('appColorful') colorName: String;

  private addColor() {
    let res: string;
    switch(this.colorName) {
      case 'Claim Transaction': 
        res = '#31aadc';
        break;
      case 'Miner Transaction':
        res = '#f3f536';
        break;
      case 'Contract Transaction':
        res = '#3ee9c3';
        break;
      case 'Register Transaction':
        res = '#f04731';
        break;
      case 'Publish Transaction':
        res = '#f97d3a';
        break;
      case 'Issue Transaction':
        res = '#ff3a5a';
        break;
      case 'Enrollment transaction':
        res = '#ff30cc';
        break;
    }
    this.el.nativeElement.style.color = res;
  } 
}
