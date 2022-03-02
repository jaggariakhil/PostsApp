import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
@Injectable() //Should be provided in app.module in a diff way refer app.module in providers
export class AuthInterceptor implements HttpInterceptor
{
constructor(private authServ :AuthService ){

}
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const   authToken=this.authServ.getToken();
  console.log("checkinh"+authToken);
  const authReq=req.clone({
    headers:req.headers.set('authorization',"Bearer "+authToken),//set is like append
    //Authorization added in backend
  })

  return next.handle(authReq);

}

}