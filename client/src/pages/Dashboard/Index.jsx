import React from 'react';

const Index = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* การ์ด Add a new Product */}
      <div className="bg-gray-800 text-white p-4 rounded-md bg-cover bg-center"
        style={{ backgroundImage: "url('/BG-Card.png')" }}>
        <h2 className="font-semibold mb-2">Add a new Product</h2>
        <p className="text-sm mb-4">
          Add a new product to the store to be displayed on the shop...
        </p>
        <a href="/dashboard/add-product" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md inline-block">
          Add Product
        </a>
      </div>

      {/* การ์ด Manage Items */}
      <div className="bg-gray-800 text-white p-4 rounded-md bg-cover bg-center"
        style={{ backgroundImage: "url('/BG-Card.png')" }}>
        <h2 className="font-semibold mb-2">Manage Items</h2>
        <p className="text-sm mb-4">View, edit, and delete products that are currently in the store</p>
        <a href="/dashboard/manageItems" className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">Manage Items</a>
      </div>

      {/* การ์ด Manage Users */}
      <div className="bg-gray-800 text-white p-4 rounded-md bg-cover bg-center"
        style={{ backgroundImage: "url('/BG-Card.png')" }}>
        <h2 className="font-semibold mb-2">Manage Users</h2>
        <p className="text-sm mb-4">View and manage users that have signed up to the store</p>
        <a href="/dashboard/manageUser" className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-md">Manage Users</a>
      </div>

      {/* การ์ด Manage Orders */}
      <div className="bg-gray-800 text-white p-4 rounded-md bg-cover bg-center"
        style={{ backgroundImage: "url('/BG-Card.png')" }}>
        <h2 className="font-semibold mb-2">Manage Orders</h2>
        <p className="text-sm mb-4">View and manage orders that have been placed by customers</p>
        <a href="/dashboard/manage-orders" className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-md">Manage Orders</a>
      </div>
    </div>
  );
};

export default Index;