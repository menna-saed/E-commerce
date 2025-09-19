import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPoper]'
})
export class PopupDirective  {

// private readonly renderer =inject(Renderer2)
// private readonly el =inject(ElementRef)
// myDiv !:HTMLElement
//  ngAfterViewInit(): void {
//   this.myDiv= this.renderer.createComment('div')
//  }
}
