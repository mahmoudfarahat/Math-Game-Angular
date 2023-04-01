import { AbstractControl } from "@angular/forms"




export class MathValidators {
  static addition(target:string , sourceOne:string , sourceTwo:string){
    return(form:AbstractControl)=>{
   const  sum = form.value[target];
   const first = form.value[sourceOne]
   const second = form.value[sourceTwo]

      if(first + second === parseInt(sum)){
        return null
      }
      return {addition:true}
    }

  }
//  static addition(form:AbstractControl){
//   const {a,b,answer} = form.value
//   if(a + b === parseInt(answer)){
//     return null
//   }
//   return {addition:true}
// }



}




