import React, { useState } from 'react';
import { FaComments, FaPaperPlane, FaImage } from 'react-icons/fa';

const ChatWidget = ({ phone = '916200594193', preset = 'aviraj', cloudName = 'dckhsoprr' }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const toggleWidget = () => setOpen(!open);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSend = async () => {
    let imgUrl = '';

    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', preset); // Your Cloudinary unsigned preset

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        imgUrl = data.secure_url;
      } catch (error) {
        console.error('❌ Image upload failed:', error);
        alert('Image upload failed. Try again.');
        return;
      }
    }

    const finalMessage = `🛒 Grocery List:\n${message}${imgUrl ? `\n\n📷 Image: ${imgUrl}` : ''}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {open && (
        <div className="bg-white w-80 rounded-xl shadow-lg p-4 border">
          <div className="text-lg font-semibold mb-2 text-green-700">Chat with Us</div>
          <textarea
            placeholder="List your grocery items..."
            className="w-full h-24 p-2 border rounded resize-none focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
          )}

          <div className="flex justify-between items-center mt-3">
            <label className="flex items-center gap-2 text-green-700 cursor-pointer">
              <FaImage />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-1"
              onClick={handleSend}
            >
              <FaPaperPlane /> Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={toggleWidget}
        className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition"
      >
        <FaComments size={20} />
      </button>
    </div>
  );
};

export default ChatWidget;
