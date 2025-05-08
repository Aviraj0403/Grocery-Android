import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const powderItems = [
  { id: 1, name: "Cool Powder", image: "/images/powder1.jpg", description: "Keeps you cool and fresh during hot days.", price: "₹65" },
  { id: 2, name: "White Tone Powder", image: "/images/powder2.jpg", description: "Brightens skin tone and gives a soft matte look.", price: "₹80" },
  { id: 3, name: "Navratna Powder", image: "/images/powder3.jpg", description: "Herbal formulation for instant relief from heat.", price: "₹75" },
  { id: 4, name: "Pond’s Magic Freshness", image: "/images/powder4.jpg", description: "Long-lasting fragrance and freshness.", price: "₹90" },
  { id: 5, name: "Dermi Cool", image: "/images/powder5.jpg", description: "Fights prickly heat and sweat rashes.", price: "₹70" },
  { id: 6, name: "Nycil Cool Classic", image: "/images/powder6.jpg", description: "Antibacterial powder with a cooling effect.", price: "₹85" },
  { id: 7, name: "Cinthol Cool Talc", image: "/images/powder7.jpg", description: "Keeps you dry and fragrant all day.", price: "₹95" },
  { id: 8, name: "Himalaya Baby Powder", image: "/images/powder8.jpg", description: "Gentle and natural care for delicate skin.", price: "₹110" },
  { id: 9, name: "Johnson’s Baby Powder", image: "/images/powder9.jpg", description: "Mild and smooth for baby’s soft skin.", price: "₹105" },
  { id: 10, name: "Patanjali Body Ubtan", image: "/images/powder10.jpg", description: "Ayurvedic body powder for healthy skin.", price: "₹60" },
  { id: 11, name: "Boroplus Prickly Heat", image: "/images/powder11.jpg", description: "Heals heat rashes and soothes skin.", price: "₹72" },
  { id: 12, name: "Medimix Ayurvedic Powder", image: "/images/powder12.jpg", description: "Natural blend for healthy, fresh skin.", price: "₹68" },
  { id: 13, name: "Eva Perfumed Talc", image: "/images/powder13.jpg", description: "Luxury fragrance and soft skin feel.", price: "₹95" },
  { id: 14, name: "Gokul Santol Talc", image: "/images/powder14.jpg", description: "Traditional sandalwood-based powder.", price: "₹55" },
  { id: 15, name: "Shower to Shower Menthol", image: "/images/powder15.jpg", description: "Menthol-rich talc for freshness.", price: "₹98" }
]

const ITEMS_PER_PAGE = 8

const Exploremore = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    setLoading(true)
    setTimeout(() => navigate("/expmore"), 2000)
  }

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
  const paginatedItems = powderItems.slice(startIdx, startIdx + ITEMS_PER_PAGE)
  const totalPages = Math.ceil(powderItems.length / ITEMS_PER_PAGE)

  return (
    <div className="bg-[#f5f0e6] py-10 px-4">
      <Link to={"/"}>
        <h2 className="text-3xl font-bold text-center mb-8 text-[#5c3d1c]">Body Talc Powders</h2>
      </Link>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-10 h-10 border-4 border-[#5c3d1c] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {paginatedItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-4 border border-[#cdb79e] hover:shadow-xl transform transition-transform duration-300 hover:scale-105 flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-xl mb-3"
              />
              <h3 className="text-[#5c3d1c] font-semibold text-sm mb-1 text-center">{item.name}</h3>
              <p className="text-xs text-gray-600 text-center mb-1">{item.description}</p>
              <p className="text-[#5c3d1c] text-sm mb-2">{item.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-[#5c3d1c] text-white px-4 py-1 rounded-full text-sm hover:bg-[#4a2f14] transition-colors duration-300"
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
                ? 'bg-[#5c3d1c] text-white'
                : 'bg-white text-[#5c3d1c] border-[#5c3d1c]'
            } hover:bg-[#4a2f14] hover:text-white transition-colors duration-300`}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <ToastContainer position="top-right" />
      <button
        onClick={handleNavigate}
        className="fixed bottom-6 right-6 bg-white text-[#5c3d1c] border border-[#5c3d1c] px-4 py-2 rounded-full shadow-md hover:bg-[#5c3d1c] hover:text-white hover:shadow-lg transition-all duration-300 z-50"
      >
        Explore More
      </button>
    </div>
  )
}

export default Exploremore
