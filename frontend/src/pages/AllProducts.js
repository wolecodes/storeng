import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import apiSummary from "../common";
import AdminProductCard from "../components/AdminProductCard";

/**
 * Functional component to display all products and allow uploading new products.
 */
const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  /**
   * Fetches all products from the API and updates the state with the response data.
   */
  const fetchAllProduct = async () => {
    //! method isn't included here because "fetch" is get by default

    const fetchData = await fetch(apiSummary.allProduct.url);

    const response = await fetchData.json();

    setAllProduct(response?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Product</h2>
        <button
          className="border-2 border-[#f8991e] py-1 px-3 rounded-full color hover:bg-[#f8991e] hover:text-white transition-all"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* all product */}

      <div className="flex items-center flex-wrap h-[calc(100vh-190px)] overflow-y-scroll gap-5 py-4">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {/* upload product component */}

      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
