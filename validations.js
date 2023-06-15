export function NameEmpty(name){
    if(name.length == 0){
        alert("Name field cannot be empty")
        
    }
    else{
        return true
    }
}
export function checkboxvalidation(box){
    box = document.querySelector("#box")
    if(box.checked !== true){
        alert("Kindly Accept the terms and conditions")
    } 
}
export function ValidateEmail(Email){
    if(Email.includes("@")){
        return true
    }else{
        alert("Enter a valid Email Address")
    }
}
export function passwordValidation(password){
         if(password.length > 10){
            return true
         }
         else{
            alert("Password length should be greater than 10 characters")
         }
}
export function confirmation(password , confirm_pass){
    if(password === confirm_pass){
        return true
    }
    else{
        alert("Password and confirm password does not match")
    }
}
