import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", "#order-summary");
checkout.init();
checkout.calculateOrderTotal();

// Listen for form submission
document
  .querySelector("#checkout-form")
  .addEventListener("submit", (e) => {
    e.preventDefault(); // stop default form submission
    checkout.checkout(e.target);
  });