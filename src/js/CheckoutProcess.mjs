import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// Converts cart items to simplified order format
function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}

// Converts form element to JSON object
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    // Calculate total price of all items
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
    // Display subtotal
    document.querySelector(`${this.outputSelector} #subtotal`).innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // 6% tax on subtotal
    this.tax = this.itemTotal * 0.06;
    // $10 first item + $2 each additional
    this.shipping = this.list.length > 0 ? 10 + (this.list.length - 1) * 2 : 0;
    // order total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(`${this.outputSelector} #tax`).innerText =
      `$${this.tax.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #shipping`).innerText =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${this.outputSelector} #order-total`).innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    // Get form data as JSON
    const formData = formDataToJSON(form);
    // Add order details
    formData.orderDate = new Date().toISOString();
    formData.orderTotal = this.orderTotal.toFixed(2);
    formData.tax = this.tax.toFixed(2);
    formData.shipping = this.shipping;
    formData.items = packageItems(this.list);

    console.log("Sending to server:", formData);

    try {
      const response = await services.checkout(formData);
      console.log("Order submitted successfully!", response);
      alert("Order placed successfully! 🎉");
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("There was a problem placing your order. Please try again.");
    }
  }
}