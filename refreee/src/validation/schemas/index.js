import * as Yup from "yup"


// signUp
export const signUpSchema = Yup.object({
    firstname:Yup.string().min(2).max(20).required("Please enter your first name"),
    lastname:Yup.string().min(2).max(20).required("Please enter your last name"),
    contact:Yup.number().min(6).required("Please enter your contact number"),
    email:Yup.string().email().required("Please enter your email"),
    password:Yup.string().min(6).required("Please enter your password"),
    confirm_password:Yup.string().required("Password is require ").oneOf([Yup.ref("password"),null],"Password must match")
})


//logIn
export const logInSchema =Yup.object({
    email:Yup.string().email().required("Please enter your email"),
    password:Yup.string().min(6).required("Please enter your password"),
})


//update password
export const forgatePassSchema =Yup.object({
    password:Yup.string().min(6).required("Please enter your password"),
    new_password:Yup.string().min(6,"atleast 6 character").required("Please enter your new password"),
    confirm_password:Yup.string().required("Please enter your conform password").oneOf([Yup.ref("new_password"),null],"Password must match")
})


// edite profile
export const editeSchema = Yup.object({
    firstname:Yup.string().min(2).max(20).required("Please enter your first name"),
    lastname:Yup.string().min(2).max(20).required("Please enter your last name"),
    contact:Yup.number().min(6).required("Please enter your contact number"),
    email:Yup.string().email().required("Please enter your email"),
    
})
