import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IProduct } from "./product";
import { Pipe, PipeTransform } from "@angular/core";
import { Productservice } from "./product.service";


@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [Productservice]
})

export class ProductListComponent implements OnInit{
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    private _listFilter: string = ' ';
    errorMessage: string = '';
    get listFilter(): string {
        return this._listFilter;

    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter:', value);
        this.filteredProducts = this.performFilter(value);
    }
    filteredProducts: IProduct[]= [];

    products: IProduct[] = [
    ]
    
     constructor(private productService: Productservice){}
    performFilter(filterBy: string ): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct)=>
        product.productName.toLocaleLowerCase().includes(filterBy)
        )
    

    }
    toggleImage(): void{
        this.showImage = !this.showImage;
    }
    ngOnInit() : void{
      this.productService.getProducts().subscribe({
          next: products => {this.products = products;
        this.filteredProducts = this.products;
        },

            error: err => this.errorMessage = err

      });
      
    }
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List' + message;
    }


}