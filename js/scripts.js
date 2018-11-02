// Business Logic for Pizza Website

function Order (customerName, pizzas, orderTotal) {
  this.customerName = customerName;
  this.pizzas = [];
  this.orderTotal = orderTotal
}

Order.prototype.addPizzaPrototype = function(pizza) {
  this.pizzas.push(pizza);
}

function Pizza (size, toppings) {
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.costPrototype = function() {
  var cost = 0;
  if (this.size === "small") {
    cost += 7.5;
  } else if (this.size === "medium") {
    cost += 10.5;
  } else if (this.size === "large") {
    cost += 14;
  } else if (this.size === "extra large") {
    cost += 17
  } this.toppings.forEach(function() {
    cost += 1.75;
  }); 
  return cost;
}


// User Interface Logic for Pizza Website

var orderTotalCost = 0;
var newOrder = new Order();

function orderFunction() {
  var orderSize = $("input:radio[name=orderSize]:checked").val();
  var toppingsArray = [];
  $("input:checkbox[name=orderToppings]:checked").each(function() {
    toppingsArray.push($(this).val());
  }); 
  var newPizza = new Pizza (orderSize, toppingsArray);
  newOrder.addPizzaPrototype(newPizza);
  newOrder.customerName = $("#orderName").val();
  console.log(newOrder);
  var cost = newPizza.costPrototype();
  $("input:checkbox[name=orderToppings]:checked").prop('checked',false);
  showOrderDetails(newPizza, cost);
}

function showOrderDetails(pizza, cost) {
  orderTotalCost += cost;
  $("#showOrder").show();
  $("#orderDetails").append("<tr><td>1 " + pizza.size + " pizza with " + pizza.toppings.join(", ") +"</td> <td> $ " + cost.toFixed(2) + "</td></tr>");
  $("#orderCost").html("$ " + orderTotalCost.toFixed(2));
  console.log(orderTotalCost);
}

function submitOrder() {
  $("#showFinalConfirmation").show();
  var taxCost = (Math.round(orderTotalCost*.10*100)/100);
  var grandTotal = taxCost + orderTotalCost;
  var inputName = newOrder.customerName;
  newOrder.orderTotal = grandTotal;
  console.log(newOrder);
  $("#confirmSubtotal").html(orderTotalCost.toFixed(2));
  $("#confirmTax").html(taxCost);
  $("#confirmGrandTotal").html(grandTotal);
  $("#orderConfirmName").text(inputName);
}

$(document).ready(function() {
  $("form#orderForm").submit(function(event) {
    event.preventDefault(); 
    orderFunction();
  })
  $("#submitOrderButton").click(function() {
    submitOrder();
  });
  $("#cancelOrderButton").click(function() {
    if(confirm("This will clear your current order. Are you sure you want to proceed?") === true) {
      location.reload();
    }
  });
  $("#returnToOrderButton").click(function() {
      $("#showFinalConfirmation").hide();
  });
  $("#confirmOrderButton").click(function() {
      alert("Thank you " + newOrder.customerName + "! Your order has been successfully placed. Expect delivery in about 20 minutes.");
      location.reload();
  });
});