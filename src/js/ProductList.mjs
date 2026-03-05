export default class ProductList {
  constructor(category, dataSource, listElement) {
    // store the information passed in
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // get product list from the data source
    const list = await this.dataSource.getData();

    // for now just log it to confirm it works
    console.log(list);
  }
}