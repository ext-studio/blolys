import { Directive, Input, HostBinding } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({ selector: 'img[buffer]' })
export class BufferImageDirective {
  @HostBinding('src') src: SafeUrl;
  constructor(
    private domS: DomSanitizer
  ) {
      
  }
  @Input() public set buffer(value: ArrayBuffer) {
    let imgBlob = new Blob( [ value ], { type: "image/jpeg" } );
    this.src = this.domS.bypassSecurityTrustUrl(window.URL.createObjectURL(imgBlob));
  }
}
