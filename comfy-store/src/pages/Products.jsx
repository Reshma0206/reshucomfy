import { ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";

export const loader = async () => {
  const response = await customFetch(url);
  //console.log("pages/Products.jsx", response);

  const products = response.data.data;
  const meta = response.data.meta;

  return { products, meta };
  
};

const Products = () => {
  return (
    <>
      <ProductsContainer />
    </>
  );
};
export default Products;

