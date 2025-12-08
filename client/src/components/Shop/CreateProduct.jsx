import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";
import toast from "react-hot-toast";

const CreateProduct = () => {
  const { sellers } = useSelector((state) => state.seller);
  const { isLoading, success, error } = useSelector((state) => state.products);
  const navigate = useNavigate("");
  const dispatch = useDispatch("");
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [OriginalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product Created Successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

   const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  // if (!sellers || !sellers._id) {
  //   toast.error("Shop not loaded. Please login again.");
  //   return;
  // }


  //   const newForm = new FormData();

  //   images.forEach((image) => {
  //     newForm.append("images", image);
  //   });
  //   newForm.append("name", name);
  //   newForm.append("description", description);
  //   newForm.append("category", category);
  //   newForm.append("tags", tags);
  //   newForm.append("OriginalPrice", OriginalPrice);
  //   newForm.append("discountPrice", discountPrice);
  //   newForm.append("stock", stock);
  //   newForm.append("shopId", sellers._id);
  //   dispatch(createProduct(
  //      {  name,
  //       description,
  //       category,
  //       tags,
  //       OriginalPrice,
  //       discountPrice,
  //       stock,
  //       shopId: sellers._id,
  //       images,}
  //   ));
  // };

const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("OriginalPrice", OriginalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", sellers._id);

    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        OriginalPrice,
        discountPrice,
        stock,
        shopId: sellers._id,
        images,
      })
    );
  };



console.log(sellers);
  return (
    <div className="w-[70%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll ">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/*create product form*/}
      <form onSubmit={handleSubmit}>
        <br />

        <div>
          <label className="pb-2">
            Name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          ></input>
        </div>
        <br />

        <div>
          <label className="pb-2">
            Description
            <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            rows="8"
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your  description name..."
            className="mt-2 appearance-none block w-full pt-2 px-3  border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <br />

        <div>
          <label className="pb-2">
            Category
            <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
            {/* {Array.isArray(categoriesData) &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))} */}

          </select>
        </div>
        <br />

        <div>
          <label className="pb-2">
            Tags
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your Product tags..."
          ></input>
        </div>
        <br />

        <div>
          <label className="pb-2">
            Original Price
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={OriginalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your Product price..."
          ></input>
        </div>
        <br />

        <div>
          <label className="pb-2">
            Price (With Discount)
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your Product price with discount..."
          ></input>
        </div>
        <br />

        <div>
          <label className="pb-2">
            Product Stock
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your Product Stock..."
          ></input>
        </div>
        <br />

        <div>
          <label className="pb-2">
            Upload Images
            <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="images"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {/* {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2 "
                />
              ))} */}
             {images.map((file, index) => (
              <img key={file.name + index} src={file} />
            ))}
          </div>
        </div>
        <br />
        <div>
          <input
            type="submit"
            value="Create"
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
