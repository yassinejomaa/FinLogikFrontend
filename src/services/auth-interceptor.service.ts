import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { TokenService } from "./token.service";
import { Observable } from "rxjs";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const accessToken = this.tokenService.getToken();
  
      // Exclure les requêtes à l'API Cloudinary de l'ajout de l'en-tête Authorization
      if (!req.url.includes('cloudinary.com')) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      }
  
      return next.handle(req);
    }
  }