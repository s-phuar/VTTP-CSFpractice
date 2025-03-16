import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartStore } from '../cart.store';
import { Cart, LineItem, Order } from '../models';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit{

  // TODO Task 3

  private fb = inject(FormBuilder)
  protected form !: FormGroup

  protected productServe = inject(ProductService)
  private cartStore = inject(CartStore)
  private sub!: Subscription //constantly subcribe to state
  protected cartList!: Cart
  protected itemList!: LineItem[]
  protected totalAmount: number = 0

  ngOnInit(): void {
    this.createForm()
    this.sub = this.cartStore.getCart$.subscribe({
      next: (cart: Cart) =>{
        this.cartList = cart
        this.itemList = cart.lineItems
        console.info('cartList', this.itemList)
      }
    })
    this.totalAmount = this.calculateTotal(this.itemList)
  }

  calculateTotal(items: LineItem[]):number{
    let accum = 0
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      const cost = element.price * element.quantity
      accum += cost
    }
    return accum
  }
  

  createForm(){
    this.form = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    })

  }

  placeOrder(){
    const order: Order = {
      name:this.form.value['name'],
      address:this.form.value['address'],
      priority:this.form.value['priority'],
      comments:this.form.value['comments'],
      cart:this.cartList
    }

    // console.info(order)
    this.productServe.checkout(order)
  }



}
