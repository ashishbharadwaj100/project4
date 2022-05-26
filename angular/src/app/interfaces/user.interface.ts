import { EmailValidator } from '@angular/forms';

export interface User {
    username: string;
    password: string;
    
}

export interface NewUser {
    id: Number;
    // email: EmailValidator;
    // password: string;
    
}

export interface NewUserRegister {
    id: string;
    email: EmailValidator;
    password: string;
    
    street: string;
    city: string;
    u_name: string;
    f_name: string;
    l_name: string;
}

