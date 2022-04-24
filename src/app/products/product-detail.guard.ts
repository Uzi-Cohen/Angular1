import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class ProductDetailGuard implements CanActivate{
    canAcivate(): boolean{
        ...
    }
}