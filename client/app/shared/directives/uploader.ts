import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';

@Directive({ selector: '[uploader]' })
export class UploaderDirective {
  @Input() public maxSize: number;
  @Input() public minSize: number;
  @Output() public onChosen: EventEmitter<File> = new EventEmitter<File>();
  @Output() public onError: EventEmitter<any> = new EventEmitter<any>();
  private dom: HTMLInputElement;
  constructor(
    private global: GlobalService,
    private http: HttpClient
  ) {
    this.dom = document.createElement('input');
    this.dom.type = 'file';
    this.dom.onchange = () => {
      this.inputChanged();
    };
  }
  @HostListener('click') public onClick() {
    this.dom.click();
  }
  private inputChanged() {
    if (!(this.dom.files && this.dom.files.length)) {
      return;
    }
    let file = this.dom.files[0];
    if (file.type.indexOf('image') < 0) {
      this.onError.emit('not_image');
      this.dom.value = '';
      return;
    }
    if (this.minSize && file.size < this.minSize) {
      this.onError.emit('too_small');
      this.dom.value = '';
      return;
    }
    if (this.maxSize && file.size > this.maxSize) {
      this.onError.emit('too_large');
      this.dom.value = '';
      return;
    }
    // const formData: FormData = new FormData();
    // formData.append('files', file, file.name);
    this.onChosen.emit(file);
  }
}