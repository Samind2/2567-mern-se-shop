import React from "react";

const Ordetail = ({ order, onClose }) => {
  if (!order) return null;
  console.log("Order Data:", order);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl relative">
      {/* ปุ่ม X ที่มุมขวาบน */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
      >
        &times;
      </button>
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <h3 className="font-bold">Products</h3>
        <table className="w-full border-collapse border border-gray-300 mt-2">
          <thead>
            <tr className="bg-red text-white rounded-sm text-center">
              <th className="border p-2">#</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Unit Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products && order.products.length > 0 ? (
              order.products.map((product, index) => (
                <tr key={index}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">
                    <img
                      src={product.productId?.image || "/placeholder.png"}
                      alt="Product"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td className="border p-2">{product.productId?.name || "No Name"}</td>
                  <td className="border p-2">฿{product.productId?.price?.toLocaleString() || "0.00"}</td>
                  <td className="border p-2">{product.quantity || "0"}</td>
                  <td className="border p-2">฿{(product.quantity * (product.productId?.price || 0)).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-2">No Products Found</td>
              </tr>
            )}
          </tbody>
        </table>

        <h3 className="font-bold mt-4">
    Total: ฿{(order.total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })}
</h3>


        <div className="mt-4">
          <h3 className="font-bold">Shipping Details</h3>
          <div className="flex justify-between">
            <div>
              <p><strong>Name:</strong> {order.shipping?.name || "N/A"}</p>
              <p><strong>Phone:</strong> {order.shipping?.phone || "N/A"}</p>
              <p><strong>Address:</strong> {order.shipping?.address?.line1 || "N/A"}</p>
            </div>
            <div>
              <p><strong>City:</strong> {order.shipping?.address?.city || "N/A"}</p>
              <p><strong>Country:</strong> {order.shipping?.address?.country || "N/A"}</p>
              <p><strong>Postal Code:</strong> {order.shipping?.address?.postal_code || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* ปุ่ม Close ตรงกลางด้านล่าง */}
        <div className="mt-4 flex justify-center">
          <button onClick={onClose} className="bg-red text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Ordetail;