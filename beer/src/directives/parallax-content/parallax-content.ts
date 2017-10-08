import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[parallax]',
  host:{
    '(ionScroll)':'onCntScroll($event)',
  }

})
export class ParallaxContentDirective {
  ta: any;
  mainCnt: any;
  header: any;

  constructor(public elem:ElementRef, public rend:Renderer2) {
  }

  ngOnInit(){
    let cnt=this.elem.nativeElement.getElementsByClassName('scroll-content')[0];
    this.header=cnt.getElementsByClassName('background-image')[0];
    this.mainCnt=cnt.getElementsByClassName('main-cnt')[0];

    this.rend.setStyle(this.header, 'webTransformOrigin','center bottom');
    this.rend.setStyle(this.header, 'background-size', 'cover');
    this.rend.setStyle(this.mainCnt, 'position', 'absolute');
  }

  onCntScroll(ev) {
    ev.domWrite(()=>{
      this.update(ev);
    });
  }

  update(ev){
    if(ev.scrollTop>0){
      this.ta=ev.scrollTop/2;
    }
    this.rend.setStyle(this.header, 'webkitTransform', 'translate3d(0,'+ this.ta +'px,0) scale(1,1)');
  }

}
