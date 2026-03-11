import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

//Week 3 teams 3
import { loadHeaderFooter } from "./utils.mjs"; 

const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, listElement);

productList.init();
loadHeaderFooter();