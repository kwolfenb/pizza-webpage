// Business Logic for Pizza Website

function Pizza (size, toppings) {
  this.size = size;
  this.toppings = toppings
}



Pizza.prototype.costPrototype = function() {
  var cost = 0;
  if (this.size === "small") {
    cost += 7.5;
  } else if (this.size === "medium") {
    cost += 10.5;
  } else if (this.size === "large") {
    cost += 14;
  } else if (this.size === "xlarge") {
    cost += 17
  } this.toppings.forEach(function() {
    cost += 1.75;
  }); 
  return cost;
}



// User Interface Logic for Pizza Website

var orderTotalCost = 0;

function orderFunction() {
  var orderSize = $("input:radio[name=orderSize]:checked").val();
  var toppingsArray = [];
  $("input:checkbox[name=orderToppings]:checked").each(function() {
    toppingsArray.push($(this).val());
  }); 
  var newPizza = new Pizza (orderSize, toppingsArray);
  var cost = newPizza.costPrototype();
  $("input:checkbox[name=orderToppings]:checked").prop('checked',false);
  showOrderDetails(newPizza, cost);

}

function showOrderDetails(pizza, cost) {
  orderTotalCost += cost;
  $("#showOrder").show();
  $("#orderDetails").append("<li>1 " + pizza.size + "pizza with " + pizza.toppings +"</li>");
  $("#orderItemCost").append("<li>" + cost + "</li>");
  $("#orderCost").html(orderTotalCost);
  console.log(orderTotalCost);
}


$(document).ready(function() {
  $("form#orderForm").submit(function(event) {
    event.preventDefault(); 
    orderFunction();


    
  })
})