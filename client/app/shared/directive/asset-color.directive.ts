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
    switch (this.appAssetColor) {
      case 'Token':
        res = '#627913';
        break;
      case 'Share':
        res = '#693277';
        break;
      case 'Nep5':
        res = '#84670e';
        break;
      default:
        res = '#1187a4';
        break;
    }
    this.el.nativeElement.style.color = res;
  }

}
