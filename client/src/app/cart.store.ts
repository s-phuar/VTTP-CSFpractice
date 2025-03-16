
// TODO Task 2

import { Injectable } from "@angular/core";
import { Cart, LineItem, Product } from "./models";
import { ComponentStore } from "@ngrx/component-store";

// Use the following class to implement your store

const INIT: Cart = {
    lineItems: []
}

@Injectable()
export class CartStore extends ComponentStore<Cart>{

    //using componentstore without dexie
    constructor(){
        super(INIT)
    }

    //adding product to array
    readonly addProduct = this.updater<LineItem>(
        (slice: Cart, item: LineItem) => {
            console.info('>>> Saving...', item)
            // return [...slice, newProduct] //returns a new array
            return {
                lineItems: [...slice.lineItems, item]
            } as Cart
        }
    )


    //select all products for display (observable)
    readonly getCart$ = this.select(state => state)
    
    readonly getCartCount$ = this.select<number>(
        (slice:Cart) => slice.lineItems.length
    )
    




}
