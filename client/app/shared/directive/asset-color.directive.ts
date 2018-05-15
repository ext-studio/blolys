import { Directive, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAssetColor]'
})
export class AssetColorDirective implements OnChanges {
  constructor(private el: ElementRef) { }
  @Input('appAssetColor') appAssetColor: String;

  public ngOnChanges(changes: SimpleChanges) {
    this.addColor();
  }

  private addColor() {
    let res: string;
    console.log(this.appAssetColor);
    switch (this.appAssetColor) {
      case 'Token':
        res = '#ff30cc';
        break;
      case 'Share':
        res = '#f97d3a';
        break;
      default:
        res = '#3ee9c3';
        break;
    }
    this.el.nativeElement.style.color = res;
  }

}
