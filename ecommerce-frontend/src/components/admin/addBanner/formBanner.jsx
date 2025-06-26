import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications

const FormBanner = ({ setView }) => {
  const [bannerData, setBannerData] = useState({
    pre_title: { text: "", price: "" },
    title: "",
    subtitle: { text_1: "", percent: "", text_2: "" },
    img: null,
    green_bg: true,
    is_light: false,
    btn_link: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files, dataset } = e.target;

    if (type === 'file') {
      setBannerData({ ...bannerData, [name]: files[0] });
    } else if (dataset.parent === 'pre_title') {
      setBannerData({
        ...bannerData,
        pre_title: { ...bannerData.pre_title, [name]: value },
      });
    } else if (dataset.parent === 'subtitle') {
      setBannerData({
        ...bannerData,
        subtitle: { ...bannerData.subtitle, [name]: value },
      });
    } else {
      setBannerData({ ...bannerData, [name]: value });
    }
  };

  const handleThemeChange = (theme) => {
    setBannerData({
      ...bannerData,
      green_bg: theme === 'dark',
      is_light: theme === 'light',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let productImgUrl = '';

      if (bannerData.img) {
        const formData = new FormData();
        formData.append('file', bannerData.img);
        formData.append('upload_preset', 'ecommerce');

        const res = await fetch('https://api.cloudinary.com/v1_1/dyfhi3avq/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok) productImgUrl = data.secure_url;
        else throw new Error(data.error?.message || 'Image upload failed');
      }

      const formDataToSend = {
        ...bannerData,
        img: productImgUrl || '',
        pre_title: {
          text: bannerData.pre_title.text,
          price: Number(bannerData.pre_title.price),
        },
        subtitle: {
          text_1: bannerData.subtitle.text_1,
          percent: Number(bannerData.subtitle.percent),
          text_2: bannerData.subtitle.text_2,
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/addBanner`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formDataToSend),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to create banner');

      // Show success toast
      toast.success('Banner created successfully!');

      resetForm();
      setView('showBanner');
    } catch (err) {
      console.error('Submission error:', err);
      // Show error toast
      toast.error(err.message || 'An error occurred.');
    }
  };

  const resetForm = () => {
    setBannerData({
      pre_title: { text: "", price: "" },
      title: "",
      subtitle: { text_1: "", percent: "", text_2: "" },
      img: null,
      green_bg: false,
      is_light: false,
      btn_link: "",
    });
  };

  return (
    <div className="container-fluid w-75 w-lg-50">
      <div className="card p-4 shadow-lg bg-white rounded">
        <h3 className="text-center mb-4">Create New Banner</h3>
        <form onSubmit={handleSubmit}>

          {/* Section 1: Pre Heading */}
          <h6 className="mb-3">Starting Price</h6>
          <div className="row mb-4">
            <div className="col-12 col-md-6">
              <label className="form-label">Text</label>
              <input
                type="text"
                className="form-control"
                placeholder="Starting At"
                value={bannerData.pre_title.text}
                onChange={handleChange}
                name="text"
                data-parent="pre_title"
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Price</label>
              <input
                type="text"
                className="form-control"
                placeholder="120"
                value={bannerData.pre_title.price}
                onChange={handleChange}
                name="price"
                data-parent="pre_title"
              />
            </div>
          </div>
          <hr />

          {/* Section 2: Main Title & Banner Image */}
          <h6 className="mb-3">Heading & Product Image</h6>
          <div className="row mb-4">
            <div className="col-12 col-md-6">
              <label className="form-label">Main Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="The Best Laptop Collection 2023"
                value={bannerData.title}
                onChange={handleChange}
                name="title"
                required
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label">Product Image *</label>
              <input
                type="file"
                className="form-control"
                onChange={handleChange}
                name="img"
                required
              />
            </div>
          </div>
          <hr />

          {/* Section 3: Exclusive Offer */}
          <h6 className="mb-3">Exclusive Offer</h6>
          <div className="row mb-4">
            <div className="col-12 col-md-4">
              <label className="form-label">Pre Text</label>
              <input
                type="text"
                className="form-control"
                placeholder="Exclusive offer"
                value={bannerData.subtitle.text_1}
                onChange={handleChange}
                name="text_1"
                data-parent="subtitle"
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">Offer Percentage</label>
              <input
                type="text"
                className="form-control"
                placeholder="90"
                value={bannerData.subtitle.percent}
                onChange={handleChange}
                name="percent"
                data-parent="subtitle"
              />
            </div>
            <div className="col-12 col-md-4">
              <label className="form-label">Post Text</label>
              <input
                type="text"
                className="form-control"
                placeholder="Off This Week"
                value={bannerData.subtitle.text_2}
                onChange={handleChange}
                name="text_2"
                data-parent="subtitle"
              />
            </div>
          </div>
          <hr />

          {/* Section 4: Theme */}
          <h6 className="mb-3">Theme</h6>
          <div className="mb-4">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                type="radio"
                className="form-check-input"
                id="green_bg"
                name="theme"
                checked={bannerData.green_bg}
                onChange={() => handleThemeChange('dark')}
              />
              <label className="form-check-label" htmlFor="green_bg">
                Dark Theme (green background)
              </label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <input
                type="radio"
                className="form-check-input"
                id="is_light"
                name="theme"
                checked={bannerData.is_light}
                onChange={() => handleThemeChange('light')}
              />
              <label className="form-check-label" htmlFor="is_light">
                Light Theme (bluish white background)
              </label>
            </div>
          </div>
          <hr />

          {/* Section 5: Button Link */}
          <h6 className="mb-3">Button Link URL</h6>
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Enter button link"
            value={bannerData.btn_link}
            onChange={handleChange}
            name="btn_link"
          />
          <hr />

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary">Create Banner</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setView('showBanner')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormBanner;
