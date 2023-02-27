import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClien: HttpClient) { 

  }

  getProductList(_theCategoryId: number): Observable<Product[]> {
    // build the url based on category id 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${_theCategoryId}`;
    
    return this.httpClien.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
