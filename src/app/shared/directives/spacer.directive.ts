import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[Spacer]',
  standalone: true
})
export class SpacerDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'flex', '1 1 auto');
  }

}
