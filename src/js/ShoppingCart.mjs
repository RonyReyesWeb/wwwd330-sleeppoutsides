import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <span class="remove-item" data-id="${item.Id}">X</span>
</li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartFooter = document.querySelector(".cart-footer"); 
  }

  init() {
    const cartItems = getLocalStorage("so-cart") || [];
    // ✅ handle empty cart
    if (cartItems.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty!</p>";
      return;
    }
    this.renderCart(cartItems);
    this.renderTotal(cartItems); // ✅ calculate and show total
    this.attachRemoveListeners();
  }

  renderCart(cartItems) {
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems);
  }

  renderTotal(cartItems) {
    // ✅ calculate total
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    // ✅ show the footer and insert total
    this.cartFooter.classList.remove("hide");
    this.cartFooter.querySelector(".cart-total").innerHTML = `Total: $${total.toFixed(2)}`;
  }

  attachRemoveListeners() {
    // ✅ one listener on the parent ul
    this.listElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        this.removeFromCart(e.target.dataset.id);
      }
    });
  }

  removeFromCart(id) {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems = cartItems.filter((item) => item.Id != id);
    setLocalStorage("so-cart", cartItems);
    this.listElement.innerHTML = "";
    // ✅ handle empty cart after removal
    if (cartItems.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty!</p>";
      this.cartFooter.classList.add("hide"); // ✅ hide total when cart is empty
      return;
    }
    this.renderCart(cartItems);
    this.renderTotal(cartItems); // ✅ update total after removal
  }
}