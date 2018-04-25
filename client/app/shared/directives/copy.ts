import { Directive, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({ selector: 'button[copy]' })
export class CopyDirective {
  @Input() public copy: string;
  @Output() public copied: EventEmitter<any> =  new EventEmitter<any>();
  @Output() public error: EventEmitter<any> =  new EventEmitter<any>();
  constructor() { }
  @HostListener('click') public clicked() {
    let target: any = window.document.getElementById(this.copy);
    if (!target) {
      this.error.emit();
      return;
    }
    if (window.navigator.userAgent.toLowerCase().match(/ipad|ipod|iphone/i)) {
      console.log('iphone');
      var oldContentEditable = target.contentEditable,
      oldReadOnly = target.readOnly,
      range = document.createRange();

      target.contenteditable = true;
      target.readonly = false;
      range.selectNodeContents(target);

      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(range);

      target.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

      if (document.execCommand('copy')) {
        this.copied.emit();
      } else {
        this.error.emit();
      }
      target.contentEditable = oldContentEditable;
      target.readOnly = oldReadOnly;
    } else {
      target.select();
      if (document.execCommand('copy')) {
        this.copied.emit();
      } else {
        this.error.emit();
      }
    }
  }
}
