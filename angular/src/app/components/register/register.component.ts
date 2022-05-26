import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { ActivatedRoute, Router } from '@angular/router';
import { NewUser } from '../../interfaces/user.interface';
import { NewUserRegister } from '../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/must-match.validatorRegister';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUser: NewUser;
  newUserRegister: NewUserRegister;
  registerForm: FormGroup;
  
  submitted = false;
 
  constructor(private _authService: AuthService,
    private _route: ActivatedRoute, private _router: Router, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirmPassword: ['', Validators.required],
        city: ['', Validators.required],
      street: ['', Validators.required],
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      
         
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
   
   
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
  

  onSubmit() {
    
    this.submitted = true;
  
    var id = this.registerForm.value.id;
     this.newUser = { id: id }
   this._authService.register(this.newUser).subscribe(data => {
       let isIdInUse = data['data']['isIdInUse'];
     console.log(data);
     if (isIdInUse == "id in use") {
       this._authService.isIdValid = false;
     } else {
      this._authService.isIdValid = true;
     }
     if (this.registerForm.controls.id.status == 'INVALID'  ||
     isIdInUse == "id in use" ||
      this.registerForm.controls.email.status == 'INVALID' ||
      this.registerForm.controls.password.status == 'INVALID' ||
       this.registerForm.controls.confirmPassword.status == 'INVALID'
        )
    {
     this.submitted = true;
      this._authService.isFormValid = false;
      } else {
          this.submitted = false;
          this._authService.isFormValid = true;
       }
      }
      )
    }
  
 
  onSubmit1() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
      // stop here if form is invalid
    } 
   if (this.registerForm.invalid == false) {
     
      let id = this.registerForm.value.id;
      let email = this.registerForm.value.email;
      let password = this.registerForm.value.password;
      let street = this.registerForm.value.street;
      let city = this.registerForm.value.city;
      let u_name = this.registerForm.value.username;
      let f_name = this.registerForm.value.firstname;
      let l_name = this.registerForm.value.lastname;
      this.newUserRegister = { id, email, password, street, city, u_name, f_name, l_name }
      this._authService.registerUser(this.newUserRegister).subscribe(data => {
        console.log(data);
        if (data['token']) {
          
          this._authService.isLogIn = true;
          this._authService.name = f_name;
          this._authService.userId = data['usercart']['userId'];
          this._authService.cartId = data['usercart']['cartId'];
          this._authService.isCartNotExist = true;
          sessionStorage.setItem("token", data['token']);
          alert(`Wellcome To Your First Buy ${f_name}`)
          
        }
        this._router.navigate(['login'])  
      }
      )}
  }
}
  