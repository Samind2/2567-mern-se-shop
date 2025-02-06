import { useState, useEffect } from "react";
import ProductService from "../../services/product.service";
import Card from "../../components/Card";
import { useSearchParams } from "react-router"

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortOption, setSortOption] = useState(["default"]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryQuery = searchParams.get("category") || "all";
  const itemsPerpageQuery = searchParams.get("itemsPerPage") || 4;
  useEffect(() => {
    setSelectedCategory(categoryQuery);
    setItemsPerPage(itemsPerpageQuery)
  }, [categoryQuery, itemsPerpageQuery])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.getAllProducts();
        console.log("Product Data:", response.data); // ตรวจสอบข้อมูล
        setProducts(response.data);
        setFilteredItems(response.data); {/* ค่านี้จะต้องใช้งานได้ */ }
        setCategories([
          "all",
          ...new Set(response.data.map((item) => item.category)),
        ]);
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า:', error); {/* เพิ่มการตรวจจับข้อผิดพลาด */ }
      }
    };
    fetchData();
  }, []);

  const filterItem = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    setFilteredItems(filtered);
    handleSortChange(sortOption, filtered);
    setSearchParams({ category });
    setSelectedCategory(category);
  };

  const handleSortChange = (option, products) => {
    setSortOption(option);
    let sortedItem = [...products];
    switch (option) {
      case "a-z":
        sortedItem.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedItem.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItem.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItem.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedItem.sort((a, b) => a.price - b.price);
        break;
    }
    setFilteredItems(sortedItem);
  };

  //Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOFFirstItem = indexOfLastItem - itemsPerPage;
  const currentItem = filteredItems.slice(indexOFFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="section-container ">
      <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
        {/* Filter */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          {categories.map((category, index) => {
            return (
              <button
                className={` ${selectedCategory === category ? "active " : ""
                  }px-4 py-2 rounded-full`}
                key={index}
                onClick={() => filterItem(category)}
              >
                <p className=" capitalize">{category}</p>
              </button>
            );
          })}
        </div>
        {/**Sort Options */}
        <div className="flex justify-end mb:4 rounded-sm">
          <div className="bg-black p-2">
            <select
              name="sortOption"
              id="sortOption"
              className="bg-black text-white px-2 rounded-sm"
              onChange={(e) => handleSortChange(e.target.value, filteredItems)}
            >
              <option value="default">default</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
        {/**ProductsList */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
          {currentItem.length > 0 &&
            currentItem.map((item, index) => {
              return <Card key={index} item={item} />;
            })}
        </div>
      </div>
      {/**Pagination */}
      <div className="section-container flex justify-center my-8 flex-wrap gap-2">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-red text-white" : "bg-gray"
              }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;


