import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit , OnDestroy{

  // NOTE: you are free to modify this component
  private cartStore = inject(CartStore)
  private sub !: Subscription


  private router = inject(Router)

  itemCount!: number

  ngOnInit(): void {
    this.sub = this.cartStore.getCartCount$.subscribe({
      next: (count:number) => {
        this.itemCount = count
      }
    })
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }


  isDisabled(){
    if(this.itemCount < 1){
      return true
    }else{
      return false
    }
    
  }


  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe()
  }



}
