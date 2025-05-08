import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";

const PRODUCTS_PER_PAGE = 7;

const GraburFirstOrder = () => {
  const products = [
    // Kurkure & Chips
    {
      id: 1,
      category: "Kurkure & Chips",
      name: "Kurkure Masala Munch",
      price: "₹10",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40075566_5-kurkure-masala-munch.jpg",
    },
    {
      id: 2,
      category: "Kurkure & Chips",
      name: "Kurkure Green Chutney Rajasthani Style",
      price: "₹10",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40023601_2-kurkure-green-chutney-rajasthani-style.jpg",
    },
    {
      id: 3,
      category: "Kurkure & Chips",
      name: "Lay's Classic Salted Chips",
      price: "₹20",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40028279_5-lays-potato-chips-classic-salted.jpg",
    },
    {
      id: 4,
      category: "Kurkure & Chips",
      name: "Lay's Magic Masala Chips",
      price: "₹20",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40027903_5-lays-potato-chips-indias-magic-masala.jpg",
    },
    {
      id: 5,
      category: "Kurkure & Chips",
      name: "Bingo Mad Angles Masala",
      price: "₹10",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40001929_4-bingo-mad-angles-achari-masti.jpg",
    },
    {
      id: 6,
      category: "Kurkure & Chips",
      name: "Haldiram’s Aloo Bhujia",
      price: "₹25",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1200394_3-haldirams-namkeen-aloo-bhujia.jpg",
    },

    // Breads
    {
      id: 7,
      category: "Breads",
      name: "Harvest Gold White Bread",
      price: "₹30",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40004433_5-harvest-gold-bread-white.jpg",
    },
    {
      id: 8,
      category: "Breads",
      name: "Britannia Brown Bread",
      price: "₹40",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1203473_2-britannia-bread-brown.jpg",
    },
    {
      id: 9,
      category: "Breads",
      name: "Modern Milk Bread",
      price: "₹35",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1223597_1-modern-milk-bread.jpg",
    },
    {
      id: 10,
      category: "Breads",
      name: "English Oven Multigrain Bread",
      price: "₹45",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40017582_4-english-oven-bread-multigrain.jpg",
    },
    {
      id: 11,
      category: "Breads",
      name: "Amul Garlic Bread Spread",
      price: "₹20",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1203484_1-amul-garlic-butter-spread.jpg",
    },
    {
      id: 12,
      category: "Breads",
      name: "Harvest Gold Sandwich Bread",
      price: "₹35",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40093277_1-harvest-gold-sandwich-bread.jpg",
    },

    // Sauces
    {
      id: 13,
      category: "Sauces",
      name: "Kissan Tomato Ketchup",
      price: "₹55",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1201032_4-kissan-fresh-tomato-ketchup.jpg",
    },
    {
      id: 14,
      category: "Sauces",
      name: "Maggi Hot & Sweet Sauce",
      price: "₹65",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/264875_9-maggi-hot-sweet-tomato-chilli-sauce.jpg",
    },
    {
      id: 15,
      category: "Sauces",
      name: "Funfoods Veg Mayonnaise",
      price: "₹89",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/272038_8-dr-oetker-fun-foods-veg-mayonnaise.jpg",
    },
    {
      id: 16,
      category: "Sauces",
      name: "Del Monte Green Chilli Sauce",
      price: "₹45",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/263925_4-del-monte-green-chilli-sauce.jpg",
    },
    {
      id: 17,
      category: "Sauces",
      name: "Ching's Red Chilli Sauce",
      price: "₹60",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/264074_7-chings-secret-sauce-red-chilli.jpg",
    },
    {
      id: 18,
      category: "Sauces",
      name: "Veeba Burger Mayo",
      price: "₹75",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40121363_4-veeba-sauce-burger-mayo.jpg",
    },

    // Noodles
    {
      id: 19,
      category: "Noodles",
      name: "Maggi 2-Minute Noodles",
      price: "₹14",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/241600_11-maggi-2-minute-instant-noodles.jpg",
    },
    {
      id: 20,
      category: "Noodles",
      name: "Yippee Noodles Magic Masala",
      price: "₹15",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/263624_6-sunfeast-yippee-noodles-magic-masala.jpg",
    },
    {
      id: 21,
      category: "Noodles",
      name: "Top Ramen Curry Noodles",
      price: "₹12",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/274056_6-nissin-top-ramen-noodles-curry.jpg",
    },
    {
      id: 22,
      category: "Noodles",
      name: "Ching’s Schezwan Noodles",
      price: "₹20",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40061940_3-chings-secret-schezwan-instant-noodles.jpg",
    },
    {
      id: 23,
      category: "Noodles",
      name: "Knorr Soupy Noodles",
      price: "₹18",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1203442_2-knorr-soupy-noodles-masala.jpg",
    },
    {
      id: 24,
      category: "Noodles",
      name: "Maggi Nutri-Licious Noodles",
      price: "₹25",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40025960_4-maggi-nutrilicious-noodles.jpg",
    },

    // Popcorn
    {
      id: 25,
      category: "Popcorn",
      name: "ACT II Classic Salted",
      price: "₹10",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1220772_2-act-ii-instant-popcorn-classic-salted.jpg",
    },
    {
      id: 26,
      category: "Popcorn",
      name: "ACT II Golden Sizzle Butter",
      price: "₹15",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1220771_2-act-ii-instant-popcorn-golden-sizzle-butter.jpg",
    },
    {
      id: 27,
      category: "Popcorn",
      name: "ACT II Tomato Chili",
      price: "₹15",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40101639_3-act-ii-instant-popcorn-tomato-chili.jpg",
    },
    {
      id: 28,
      category: "Popcorn",
      name: "ACT II Butter Lovers",
      price: "₹20",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40124904_2-act-ii-popcorn-butter-lovers.jpg",
    },
    {
      id: 29,
      category: "Popcorn",
      name: "ACT II Peri Peri",
      price: "₹20",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40109104_3-act-ii-instant-popcorn-peri-peri.jpg",
    },
    {
      id: 30,
      category: "Popcorn",
      name: "ACT II Butter Delite",
      price: "₹20",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40125094_2-act-ii-instant-popcorn-butter-delite.jpg",
    },

    // Pasta
    {
      id: 31,
      category: "Pasta",
      name: "Maggi Masala Penne Pasta",
      price: "₹25",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40075468_2-maggi-pasta-masala-penne.jpg",
    },
    {
      id: 32,
      category: "Pasta",
      name: "Yippee Pasta Treat Tomato Cheese",
      price: "₹25",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/263625_4-sunfeast-yippee-pasta-treat-tomato-cheese.jpg",
    },
    {
      id: 33,
      category: "Pasta",
      name: "Del Monte Spiral Pasta",
      price: "₹70",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/263935_7-del-monte-pasta-spirali.jpg",
    },
    {
      id: 34,
      category: "Pasta",
      name: "Weikfield Penne Pasta",
      price: "₹65",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/263980_4-weikfield-penne-pasta.jpg",
    },
    {
      id: 35,
      category: "Pasta",
      name: "Barilla Fusilli Pasta",
      price: "₹120",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40048415_6-barilla-durum-wheat-pasta-fusilli.jpg",
    },
    {
      id: 36,
      category: "Pasta",
      name: "Disano Elbow Macaroni",
      price: "₹60",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40157882_1-disano-macaroni-elbow.jpg",
    },

    // Chocolates
    {
      id: 37,
      category: "Chocolates",
      name: "Cadbury Dairy Milk",
      price: "₹20",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/241016_10-cadbury-dairy-milk-chocolate.jpg",
    },
    {
      id: 38,
      category: "Chocolates",
      name: "5 Star Chocolate Bar",
      price: "₹10",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/264470_8-cadbury-5-star-chocolate-bar.jpg",
    },
    {
      id: 39,
      category: "Chocolates",
      name: "KitKat Wafer Chocolate",
      price: "₹10",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/263710_12-nestle-kitkat-chocolate.jpg",
    },
    {
      id: 40,
      category: "Chocolates",
      name: "Munch Chocolate",
      price: "₹5",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/266597_6-nestle-munch-crispy-chocolate-bar.jpg",
    },
    {
      id: 41,
      category: "Chocolates",
      name: "Perk Chocolate",
      price: "₹5",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40130994_2-cadbury-perk-chocolate.jpg",
    },
    {
      id: 42,
      category: "Chocolates",
      name: "Ferrero Rocher Pack",
      price: "₹250",
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1203496_2-ferrero-rocher-premium-chocolates.jpg",
    },
  ];
  const categories = [...new Set(products.map((p) => p.category))];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(1);
      setLoading(false);
    }, 300);
  };

  const handlePageChange = (direction) => {
    const nextPage = Math.max(1, Math.min(currentPage + direction, totalPages));
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(nextPage);
      setLoading(false);
    }, 300);
  };

  return (
    <>
      <marquee className="text-sm text-white bg-orange-500 py-2 font-semibold tracking-wide">
        🎉 Grab your first order from shanu-mart and get <strong>50%</strong>{" "}
        off! Limited time only 🎉
      </marquee>

      <div className="p-4 bg-orange-50 min-h-screen">
        <Link to={"/"}>
          <ImCancelCircle className="absolute top-2 right-2 text-xl text-red-500 cursor-pointer hover:text-red-600 transition" />
          <h2 className="text-2xl font-bold text-orange-800 mb-4">
            Grab Your First Order
          </h2>
        </Link>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-3 py-1 rounded-full border ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500 border-orange-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-pulse">
            {[...Array(PRODUCTS_PER_PAGE)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow">
                <div className="w-full h-32 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-1" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-contain mb-2"
                />
                <h4 className="text-md font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.price}</p>
                <button className="mt-2 w-full bg-orange-500 text-white py-1 px-2 rounded hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && !loading && (
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-orange-400 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-orange-700 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === totalPages}
              className="px-4 py-1 bg-orange-400 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default GraburFirstOrder;
