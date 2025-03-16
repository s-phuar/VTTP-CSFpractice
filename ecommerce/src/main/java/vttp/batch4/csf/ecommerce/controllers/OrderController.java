package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping(path = "/order")
  @ResponseBody
  public ResponseEntity<String> postOrder(@RequestBody String payload) {
    // TODO Task 3
    
    JsonReader reader = Json.createReader(new StringReader(payload));
    JsonObject jObj = reader.readObject();

    //make custom objects
    JsonArray liArray= jObj.getJsonObject("cart").getJsonArray("lineItems");
    List<LineItem> itemList= new LinkedList<>();
    for(int i = 0; i < liArray.size(); i ++){
      LineItem li = new LineItem();
      li.setName(liArray.getJsonObject(i).getString("name"));
      li.setProductId(liArray.getJsonObject(i).getString("prodId"));
      li.setQuantity(liArray.getJsonObject(i).getInt("quantity"));
      li.setPrice(liArray.getJsonObject(i).getInt("price"));
      itemList.add(li);
    }
    Cart cart = new Cart();
    cart.setLineItems(itemList);

    Order order = new Order();
    order.setCart(cart);
    order.setAddress(jObj.getString("address"));
    order.setComments(jObj.getString("comments"));
    order.setName(jObj.getString("name"));
    order.setPriority(jObj.getBoolean("priority"));

    try{
      poSvc.createNewPurchaseOrder(order);
      // System.out.println(jObj.toString());
      // System.out.println(order);
      JsonObject successObj = Json.createObjectBuilder()
        .add("orderId", order.getOrderId())
        .build();
  
     return ResponseEntity.status(HttpStatus.OK).body(successObj.toString());
    }catch(Exception e){
      JsonObject failObj = Json.createObjectBuilder()
      .add("messages", "something went wrong")
      .build();
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(failObj.toString());
    }


  }
}
