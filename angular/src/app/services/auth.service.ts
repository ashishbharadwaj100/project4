import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { NewUser } from '../interfaces/user.interface'
import { NewUserRegister } from '../interfaces/user.interface'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authApiUrl = 'http://localhost:3000/users/';
  public isAdmin: boolean = false;
  public isLogIn: boolean = false;
  public name: string = "";
  public isEmailValid: boolean = true;
  public isIdValid: boolean = true;
  public isFormValid: boolean = false;
  public isUserNameNpasswordOK: boolean = false;
  public isCartOpen: boolean = false;
  public isCartNotExist: boolean = false;
  public cartId: string = "";
  public userId: string = "";
  public user = "";
  constructor(private _http: HttpClient) { }

  login(user: User): Observable<User> {
 
  
    return this._http.post<User>(this.authApiUrl + 'login', user)
  }
  logout() {
    sessionStorage.removeItem("token");
    this.isLogIn = false;
    this.isCartOpen = false;
    this.isCartNotExist = false;
    this.isAdmin = false;
    this.name = "";
    // this.isEmailValid =  true;
    this.isIdValid = true;
    this.isFormValid = false;
    this.isUserNameNpasswordOK = false;
    this.isCartOpen = false;
    this.isCartNotExist = false;
    this.cartId = "";
    this.userId = "";
    this.user = "";
    
  }
  register(newUser: NewUser): Observable<NewUser> {
  
    return this._http.post<NewUser>(this.authApiUrl + 'register', newUser)
  }
  registerUser(newUserRegister: NewUserRegister): Observable<NewUser> {
  
    return this._http.post<NewUser>(this.authApiUrl + 'registernewuser', newUserRegister)
  }

}
