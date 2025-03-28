import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import {ProductService} from './product.service';
import { CategoryComponent } from './components/category.component';
import { OrderFormComponent } from './components/order-form.component';
import {ConfirmCheckoutComponent} from './components/confirm-checkout.component';
import { CartStore } from './cart.store';

// NOTE: you are free to modify this file

const appRoutes: Routes = [
  {path:'', component: MainComponent},
  {path:'category/:category', component: CategoryComponent},
  {path:'checkout', component: ConfirmCheckoutComponent},
  {path:'**', redirectTo: '/', pathMatch:'full'}

]

@NgModule({
  declarations: [
    AppComponent, MainComponent, CategoryComponent,
    OrderFormComponent, ConfirmCheckoutComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [ ProductService, CartStore ],
  bootstrap: [AppComponent]
})
export class AppModule { }
