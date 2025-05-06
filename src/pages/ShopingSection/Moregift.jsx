import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const giftItems = [
  { id: 1, name: "Cadbury Celebration Pack", image: "/images/gift1.jpg", price: "₹299" },
  { id: 2, name: "Bikaji Kaju Katli", image: "/images/gift2.jpg", price: "₹399" },
  { id: 3, name: "Haldiram's Soan Papdi", image: "/images/gift3.jpg", price: "₹149" },
  { id: 4, name: "Assorted Dry Fruits Box", image: "/images/gift4.jpg", price: "₹499" },
  { id: 5, name: "Nestlé Chocolate Hamper", image: "/images/gift5.jpg", price: "₹349" },
  { id: 6, name: "Rasgulla Tin Pack", image: "/images/gift6.jpg", price: "₹199" },
  { id: 7, name: "Gulab Jamun Gift Box", image: "/images/gift7.jpg", price: "₹249" },
  { id: 8, name: "Premium Dry Fruit Sweets", image: "/images/gift8.jpg", price: "₹599" },
  { id: 9, name: "Ferrero Rocher Pack", image: "/images/gift9.jpg", price: "₹699" },
  { id: 10, name: "Mini Sweets Combo", image: "/images/gift10.jpg", price: "₹199" },
  { id: 11, name: "Dry Fruit Laddu Box", image: "/images/gift11.jpg", price: "₹449" },
  { id: 12, name: "Tasty Bite Mithai", image: "/images/gift12.jpg", price: "₹299" },
  { id: 13, name: "Bournville Chocolate Duo", image: "/images/gift13.jpg", price: "₹259" },
  { id: 14, name: "Royal Gift Basket", image: "/images/gift14.jpg", price: "₹999" },
  { id: 15, name: "Almond & Cashew Mix", image: "/images/gift15.jpg", price: "₹389" },
  { id: 16, name: "Premium Sweets Hamper", image: "/images/gift16.jpg", price: "₹799" },
]

const ITEMS_PER_PAGE = 8

const Moregift = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`)
  }

  const handlePageChange = (page) => {
    setLoading(true)
    setTimeout(() => {
      setCurrentPage(page)
      setLoading(false)
    }, 300)
  }


  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedItems = giftItems.slice(startIdx, startIdx + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(giftItems.length / ITEMS_PER_PAGE)

  return (
    <div className="bg-[#fdf4f5] py-10 px-4">
      <Link to={"/raksha"}>
      <h2 className="text-3xl font-bold text-center mb-8 text-[#800000]">Cholects & Sweets</h2>
      </Link>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-maroon-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {paginatedItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-[#b22222] hover:shadow-xl transform transition-transform duration-300 hover:scale-105 flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-xl mb-3"
              />
              <h3 className="text-[#800000] font-semibold text-sm mb-1">{item.name}</h3>
              <p className="text-gray-700 text-sm mb-2">{item.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-[#800000] text-white px-4 py-1 rounded-full text-sm hover:bg-[#a52a2a] transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 rounded-full border ${
              currentPage === idx + 1
                ? 'bg-[#800000] text-white'
                : 'bg-white text-[#800000] border-[#800000]'
            } hover:bg-[#a52a2a] hover:text-white transition-colors duration-300`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <ToastContainer position="top-right" />
      <button className="fixed bottom-6 right-6 bg-white text-[#800000] border border-pink-[#800000] px-4 py-2 rounded-full shadow-md hover:bg-[#800000] hover:text-white hover:shadow-lg transition-all duration-300 z-50">
        Explore More
      </button>
    </div>
  )
}

export default Moregift
