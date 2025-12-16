import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import { deleteProduct } from "../../redux/actions/product";
import toast from "react-hot-toast";
import { backend_url } from "../../server";

const AllProducts = () => {
const { products, isLoading } = useSelector((state) => state.products);
  const { sellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

useEffect(() => {
    dispatch(getAllProductsShop(sellers._id));
  }, [dispatch]);


 const handleDelete = async (id) => {
     dispatch(deleteProduct(id));
    toast.success("Product deleted successfully!");
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
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 180,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
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
 products &&
  products.forEach((item) => {
    row.push({
      id: item._id,
      name: item.name,
      price: "US" + "$" + item.discountPrice,
      Stock: item.stock,
      sold: item.sold_out,
    });
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-1 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
             autoHeight
            disableRowSelectionOnClick
          />  
        </div>
      )}
    </>
  );
};

export default AllProducts;
