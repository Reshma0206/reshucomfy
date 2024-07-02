import { FeaturedProducts, Hero } from "../components";
import { useLoaderData } from "react-router-dom";

import { customFetch } from "../utils";

const url = "/products?featured=true";

export const loader = async () => {
  const response = await customFetch(url);
  const products = response.data.data;
  //console.log("landing.jsx", response.data.data);
  return { products };
};

const Landing = () => {
  const { products } = useLoaderData(loader);
  return (
    <>
      <Hero />
      <FeaturedProducts products={products} />
    </>
  );
};
export default Landing;

