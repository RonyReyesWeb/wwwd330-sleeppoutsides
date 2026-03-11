import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs"; 

const category = getParam("category"); // ✅ reads category from URL
const dataSource = new ProductData(); // ✅ no more "tents" hardcoded
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);

document.querySelector("h2").textContent = 
  `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

productList.init();
loadHeaderFooter();