import {Injectable, inject} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order, Product} from "./models";
import { Router } from "@angular/router";

@Injectable()
export class ProductService {

  private http = inject(HttpClient)
  private router = inject(Router)


  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductCategories(): Observable<string[]> {
    return this.http.get<string[]>('/api/categories')
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`/api/category/${category}`)
  }

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked


  checkout(order: Order) {
    console.info('order object:', order);
    this.http.post<any>('/api/order', order).subscribe({
      next: (response) => {
        console.info(response)
        alert(response['orderId']);
        this.router.navigate(['/']) //back home
      },
      error: (err) =>{
        console.error('message:', err.error) //grab error json from controller
        alert(err.error['messages']);
      },
      complete:() =>{
        console.info('completed checkout');
      }
    });
}

}
