import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class Auth{
    //configue Auth0
    lock = new Auth0Lock('1xyvYevgJ9EaoutouHHkIV3CQsRqT4zD', 'authenapp.auth0.com', {});

    constructor(){
        // Add callback for lock `authenticated` event
       this.lock.on("authenticated", (authResult:any) => {

        //get user profile fields
           this.lock.getProfile(authResult.accessToken, (error:any, profile:any){
               if(error){
                   console.log(error);
               }
               // Set Profile
               localStorage.setItem('profile', JSON.stringify(profile));
               // Set Token
               localStorage.setItem('id_token', authResult.idToken);
           })
       });
   }
   
   public login() {
       // Call the show method to display the widget.
       this.lock.show();
   };
   
   public authenticated(){
       return tokenNotExpired();
   }
   
   public logout() {
       // Remove info from localStorage
       localStorage.removeItem('id_token');
       localStorage.removeItem('profile');
   };
}