import {AbstractControl} from '@angular/forms';
export class MatchingValidator {
    static create(sourcefield:string = 'password', matchfield:string = 'confirmpwd'){
        return (AC: AbstractControl) => {
            if(AC.parent){
                let value = AC.parent.controls[sourcefield]!=null?AC.parent.controls[sourcefield].value:''; 
                let confirm = AC.parent.controls[matchfield]!=null?AC.parent.controls[matchfield].value:''; 
                if(value != confirm) {
                    if(AC != AC.parent.controls[matchfield]
                        &&AC.parent.controls[matchfield]!=null){
                        AC.parent.controls[matchfield].setErrors( {matching: true} );
                        return null;
                    }else{
                        return {matching: true};
                    }
                } else {
                    return null;
                }
            }else{
                return null;
            }
        }
    }
}