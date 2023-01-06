import React, {  useEffect, useState } from "react";

import { fetchProducts } from "../features/productsSlice"
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ProductList from "./ProductList";
import Pagination from "../components/Pagination";
import useDebounce from "redux/useDebounce";

const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector((state) => state.productsR);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const indexLast = currentPage * productsPerPage;
  const indexFirst = indexLast - productsPerPage;
  const currentProducts = products.slice(indexFirst, indexLast);
  const totalProducts: number = products.length;
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])
 //console.log(products)

  //pagination function
  const paginate = (pageN: number): void => {
    setCurrentPage(pageN);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  
  return (
    <div>
    <div className="products">
      {loading && <p>loading...</p>}
      {error && <p>Error!</p>}
      {currentProducts.map((product: any) => {
          return <ProductList key={product.productId} product={product} />;
        })}
     </div>
    <Pagination
          productsPerPage={productsPerPage}
          totalProducts={totalProducts}
          paginate={paginate}
        />
    </div>
  );
};
export default Products;