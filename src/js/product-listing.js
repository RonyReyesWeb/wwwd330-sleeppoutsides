import ExternalServices from "./ExternalServices.mjs"; 
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs"; 

const category = getParam("category"); 
const dataSource = new ExternalServices();
const listElement = document.querySelector(".product-list");
const productList = new ProductList(category, dataSource, listElement);

document.querySelector("h2").textContent = 
  `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

productList.init();
loadHeaderFooter();