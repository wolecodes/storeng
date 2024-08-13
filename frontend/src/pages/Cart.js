import React, { useContext, useEffect, useState } from "react";
import apiSummary from "../common";
import Context from "../context";
import displayCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import PaystackPop from '@paystack/inline-js';
import { toast } from "react-toastify";
import axios from 'axios';

const Cart = () => {
  const [data, setData] = useState([]);
  
  const context = useContext(Context);
  const user = useSelector((state) => state?.user?.user)
  const [loading, setLoading] = useState(false);
  const loadingCart = new Array(4).fill(null);

  const fetchData = async () => {
    const response = await fetch(apiSummary.addToCartProductView.url, {
      method: apiSummary.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }

 
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    // fetchData();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(apiSummary.updateCartProduct.url, {
      method: apiSummary.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };
  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await axios(apiSummary.updateCartProduct.url, {
        method: apiSummary.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  //fetch delete add to cart
  const deleteCartProduct = async (id) => {
    const response = await fetch(apiSummary.deleteCartProduct.url, {
      method: apiSummary.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };
  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {

    const response = await fetch(apiSummary.processPayment.url,{
      method : apiSummary.processPayment.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        totalPrice,
        email: user.email 
      })
    })
    const responseData = await response.json();

    const popup = new PaystackPop();

    popup.resumeTransaction(responseData.access_code)
  }
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* Deleete */}
                      <div
                        className="absolute right-0  text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between ">
                        <p className="text-black font-medium text-lg">
                          {displayCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-[#949494] font-semibold text-lg">
                          {displayCurrency(product?.productId?.price)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-[#f8991e] text-[#f8991e] hover:bg-[#f8991e] hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-[#f8991e] text-[#f8991e] hover:bg-[#f8991e] hover:text-white w-6 h-6 flex justify-center items-center rounded "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* Total product */}
        {
          data[0] &&(
            <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-black px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>
  
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayCurrency(totalPrice)}</p>
                </div>
  
                <button className="bg-blue-600 p-2 text-white w-full mt-2" onClick={handlePayment}>
                  Payment
                  
                </button>
              </div>
            )}
          </div>
          )
        }


      </div>
    </div>
  );
};

export default Cart;
