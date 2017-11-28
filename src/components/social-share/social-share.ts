import { Component, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'social-share',
  templateUrl: 'social-share.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SocialShareComponent),
    multi: true
  }]
})

export class SocialShareComponent implements ControlValueAccessor {
  @Input() show: boolean = false;
  @Input() publishType: number = 1;
  @Output() retail = new EventEmitter();
  @Output() peer = new EventEmitter();

  private propagateChange: any = {};

  cancelShare() {
    this.show = false;
    this.propagateChange(this.show);
  }

  sharePeer() {
    this.peer.emit({});
  }

  shareRetail() {
    this.retail.emit({});
  }


  writeValue(obj: any): void {
    this.show = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
}
