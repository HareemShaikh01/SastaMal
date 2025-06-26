import React, { useEffect, useState } from 'react';
import BannerCard from './BannerCard';
import EditBanner from './EditBanner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const ShowBanner = () => {
  const [banners, setBanners] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({
    pre_title: { text: "", price: "" },
    title: "",
    subtitle: { text_1: "", percent: "", text_2: "" },
    img: null,
    green_bg: true,
    is_light: false,
    btn_link: "",
  });

  const fetchBanners = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/fetchBanners`);
      if (!response.ok) {
        throw new Error('Error fetching banners: ' + response.statusText);
      }
      const data = await response.json();
      setBanners(data.data); // Set the banners data to the state
      // toast.success('Banners fetched successfully!'); // Success toast
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error('Failed to fetch banners!'); // Error toast
    }
  };
  useEffect(() => {

    fetchBanners();
  }, []);

  const getBannerById = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/getBanner/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching banner: ' + response.statusText);
      }
      const data = await response.json();
      console.log("getBannerById: ", data.data);
      setEditForm(data.data);
      setShowEdit(true);
      // toast.success('Banner loaded for editing!'); // Success toast
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      toast.error('Failed to load banner details!'); // Error toast
    }
  };

  return (
    <div className="container-fluid p-0 position-relative">
      {/* Toast container for displaying toast messages */}
      <ToastContainer />

      {showEdit && <EditBanner banner={editForm} setEditForm={setEditForm} setShowEdit={setShowEdit} />}

      {banners.length === 0 ? (
        <p>No Banners Added Yet</p>
      ) : (
        <div className="d-flex flex-column gap-4">
          {banners.map((banner, index) => (
            <BannerCard
              key={index}
              banner={banner}
              getBannerById={getBannerById} // Pass the getBannerById function
              fetchBanners={fetchBanners}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowBanner;
