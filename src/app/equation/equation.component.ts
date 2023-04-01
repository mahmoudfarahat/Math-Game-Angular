import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MathValidators } from '../math-validators';
import { delay, filter, scan } from 'rxjs';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {

  secondsPerSolution = 0
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [
      MathValidators.addition('answer', 'a', 'b'),
      // (form:AbstractControl) => {
      //   // const {a,b,answer} = form.value
      //   // if(a + b === parseInt(answer)){
      //   //   return null
      //   // }
      //   // return {addition:true}
      // }
    ]
  );

  get a() {
    return this.mathForm.value.a;
  }

  get b() {
    return this.mathForm.value.b;
  }
  constructor() {}

  ngOnInit(): void {
    // const startTime = new Date()
    // let numberSolved = 0


    this.mathForm.statusChanges
      .pipe(
        filter((value) => value === 'VALID'),
        delay(100),
        scan((acc)=>{
return{
  numberSolved : acc.numberSolved+1,
  startTime: acc.startTime
}
        },{numberSolved:0,startTime: new Date()})
      )
      .subscribe(({numberSolved, startTime}) => {
        //  numberSolved++
          this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime())/numberSolved / 1000


        this.mathForm.setValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
