import React, { useEffect, useState } from "react";
import ProductService from "../../services/product.service";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(""); // Add this state
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await ProductService.deleteProduct(id);
        fetchProducts();
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the product.", "error");
      }
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setImagePreview(product.image); // Set image preview for editing
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", editProduct.name);
    formData.append("description", editProduct.description);
    formData.append("category", editProduct.category);
    formData.append("price", editProduct.price);

    if (editProduct.imageFile) {
      formData.append("file", editProduct.imageFile);
    }

    try {
      await ProductService.updateProduct(editProduct._id, formData);
      setEditProduct(null);
      setImagePreview(""); // Clear the image preview
      fetchProducts();
      Swal.fire("Updated!", "Product updated successfully.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update the product.", "error");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditProduct({ ...editProduct, imageFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Products</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Price (THB)</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="text-center">
                    <td className="p-3 border">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover mx-auto rounded-md"
                      />
                    </td>
                    <td className="p-3 border">{product.name}</td>
                    <td className="p-3 border">{product.category}</td>
                    <td className="p-3 border">{formatPrice(product.price)}</td>

                    <td className="p-3 border">
                      <div className="flex justify-center space-x-3">
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors"
                          onClick={() => handleEdit(product)}
                        >
                          <CiEdit className="text-xl" />
                          <span>Edit</span>
                        </button>
                        <button
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
                          onClick={() => handleDelete(product._id)}
                        >
                          <MdDelete className="text-xl" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {editProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <label className="block">Product Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />

            <label className="block">Price (THB)</label>
            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
            />

            <label className="block text-lg font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              className="w-full border border-gray-300 p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mb-3">
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 shadow-md mx-auto"
                />
              </div>
            )}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setEditProduct(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
