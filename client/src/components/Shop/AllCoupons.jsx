import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import { deleteProduct } from "../../redux/actions/product";
import styles from "../../styles/styles";
import { server } from "../../server";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";


const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const { sellers } = useSelector((state) => state.seller);
  const {products} = useSelector((state) => (state.products));
  const dispatch = useDispatch();

  useEffect(() => {
  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${server}/coupon/get-coupon/${sellers._id}`, {
        withCredentials: true,
      });
      setCoupons(data.couponCodes);
      setIsLoading(false);
    } catch (error) {
      toast.error("Failed to fetch coupons");
      setIsLoading(false);
    }
  };
  if (sellers && sellers._id) fetchCoupons();
}, [sellers]);

console.log(products);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      `${server}/coupon/create-coupon-code`,
      {
        name,
        value: Number(value),
        minAmount: Number(minAmount),
        maxAmount: Number(maxAmount),
        selectedProducts: selectedProducts || "", 
        shopId: sellers._id,
      },
      { withCredentials: true }
    );
    setCoupons([...coupons, data.couponCode]); 
    toast.success("Coupon code created successfully!");
    setOpen(false);
    setName(""); setValue(""); setMinAmount(""); setMaxAmount(""); setSelectedProducts("");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create coupon");
  }
};


const handleDelete = async (id) => {
  try {
    const { data } = await axios.delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true });
    setCoupons(coupons.filter((item) => item._id !== id));
    toast.success(data.message || "Coupon deleted successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete coupon");
  }
};



  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 180,
      flex: 0.6,
    },

    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end mr-3 mb-3">
            <div
              className={`${styles.button} !w-max !h-[46px] px-3 !rounded-[5px]`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center ">
              <div className="w-[50%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-scroll">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Create Coupon Code
                </h5>
                {/* create coupon code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">
                      Name
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your Coupon Code  name..."
                    ></input>
                  </div>

                  <br />
                  <div>
                    <label className="pb-2">
                      Discount Percentage
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="value"
                      value={value}
                      required
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your Coupon Code  value..."
                    ></input>
                  </div>

                  <br />
                  <div>
                    <label className="pb-2">Min Amount</label>
                    <input
                      type="number"
                      name="value"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Enter your Coupon Code  min amount..."
                    ></input>
                  </div>

                  <br />
                  <div>
                    <label className="pb-2">Max Amount</label>
                    <input
                      type="number"
                      name="value"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your Coupon Code  max amount..."
                    ></input>
                  </div>

                
                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProducts}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />


                  <div>
                    <input
                      type="submit"
                      name="Create"
                      className=" cursor-pointer mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;



