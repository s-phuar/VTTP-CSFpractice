package vttp.batch4.csf.ecommerce.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // TODO Task 3
    String sql_order = "INSERT INTO orderCSF (orderId, date, name, address, priority, comments) values (?, ?, ?, ?, ?, ?)";
    String sql_lineitem= "INSERT INTO lineitemCSF (productId, orderId, name, quantity, price) values (?, ?, ?, ?, ?)";

    template.update(sql_order, order.getOrderId(), order.getDate(), order.getName(),order.getAddress(), order.getPriority(), order.getComments());
    List<LineItem> li = order.getCart().getLineItems();
    for(int i = 0; i < li.size(); i ++){
      template.update(sql_lineitem, li.get(i).getProductId(), order.getOrderId(), li.get(i).getName(), li.get(i).getQuantity(), li.get(i).getPrice());
    }
  }
  
}
