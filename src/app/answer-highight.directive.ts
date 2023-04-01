import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { map , filter } from 'rxjs';
@Directive({
  selector: '[appAnswerHighight]'
})
export class AnswerHighightDirective {

  constructor(private elementRef:ElementRef, private controlName:NgControl) {
    // console.log(this.controlName.control?.parent)

   }

 ngOnInit(){
  // console.log(this.controlName.control?.parent)
  this.controlName.control?.parent?.valueChanges
  .pipe(
    map(({a,b,answer})=> Math.abs((a+b-answer) / (a+b))),
    // filter(value => value < 0.2)
  )
  .subscribe((value)=>{
console.log(value)
if(value < 0.2){
  this.elementRef.nativeElement.classList.add('close');
}else{
  this.elementRef.nativeElement.classList.remove('close');

}
  })
 }



}
