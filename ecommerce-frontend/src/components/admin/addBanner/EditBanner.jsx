import React from 'react';

function EditBanner({ banner, setEditForm, setShowEdit }) {

  const handleChange = (e) => {
    const { name, value, type, checked, files, dataset } = e.target;

    if (type === 'file') {
      setEditForm({ ...banner, [name]: files[0] });
    } else if (dataset.parent === 'pre_title') {
      setEditForm({
        ...banner,
        pre_title: { ...banner.pre_title, [name]: value },
      });
    } else if (dataset.parent === 'subtitle') {
      setEditForm({
        ...banner,
        subtitle: { ...banner.subtitle, [name]: value },
      });
    } else if (name === 'green_bg' || name === 'is_light') {
      setEditForm({ ...banner, [name]: value === 'true' });
    } else {
      setEditForm({ ...banner, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imgUrl = banner.img;

      if (banner.img && typeof banner.img !== 'string') {
        const imgFormData = new FormData();
        imgFormData.append('file', banner.img);
        imgFormData.append('upload_preset', 'ecommerce');

        const imgResponse = await fetch('https://api.cloudinary.com/v1_1/dkwz3oo3t/image/upload', {
          method: 'POST',
          body: imgFormData,
        });

        const imgData = await imgResponse.json();

        if (imgResponse.ok) {
          imgUrl = imgData.secure_url;
        } else {
          throw new Error(imgData.error?.message || 'Failed to upload image');
        }
      }

      const updatedBanner = {
        ...banner,
        img: imgUrl,
      };


      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/updateBanner/${banner._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBanner),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to update banner: ' + data.message || response.statusText);
      }

      if (data.status) {
        alert("Banner updated successfully!");
        setShowEdit(false);
        window.location.reload(); // Reload the page to see the changes
      } else {
        throw new Error('Failed to update the banner: ' + response.statusText);
      }

    } catch (error) {
      console.error('Failed to update the Banner:', error);
      alert(error.message || "An error occurred. Please check console for details.");
    }
  };

  return (
    <div className="container-fluid w-75 w-lg-50 position-fixed start-50 translate-middle-x" style={{ zIndex: 1050, top: '10vh', maxHeight: '80vh', overflowY: 'auto' }}>
      <div className="card p-4 shadow-lg bg-white rounded">
        <h3 className="text-center mb-4">Edit Banner</h3>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Pre Heading */}
          <h6 className="mb-3">Starting Price</h6>
          <div className="row mb-4">
            <div className="col-12 col-md-6">
              <label htmlFor="pre_title_text" className="form-label">Text</label>
              <input
                type="text"
                id="pre_title_text"
                className="form-control"
                placeholder="Starting At"
                value={banner?.pre_title?.text || ""}
                onChange={handleChange}
                name="text"
                data-parent="pre_title"
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="pre_title_price" className="form-label">Price</label>
              <input
                type="text"
                id="pre_title_price"
                className="form-control"
                placeholder="120"
                value={banner?.pre_title?.price || ""}
                onChange={handleChange}
                name="price"
                data-parent="pre_title"
              />
            </div>
          </div>


          {/* Section 2: Main Title & Banner Image */}
          <h6 className="mb-3">Heading & Product Image</h6>
          <div className="row mb-4">
            <div className="col-12 col-md-6">
              <label htmlFor="title" className="form-label">Main Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="The Best Laptop Collection 2023"
                value={banner?.title}
                onChange={handleChange}
                name="title"
              />
            </div>
            <div className="col-12 col-md-6">
              <label htmlFor="img" className="form-label">Product Image</label>
              <input
                type="file"
                id="img"
                className="form-control"
                onChange={handleChange}
                name="img"
              />
            </div>
          </div>


          {/* Section 3: Exclusive Offer */}
          <h6 className="mb-3">Exclusive Offer</h6>
          <div className="row mb-4">
            <div className="col-12 col-md-4">
              <label htmlFor="subtitle_text_1" className="form-label">Pre Text</label>
              <input
                type="text"
                id="subtitle_text_1"
                className="form-control"
                placeholder="Exclusive offer"
                value={banner?.subtitle?.text_1 || ""}
                onChange={handleChange}
                name="text_1"
                data-parent="subtitle"
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="subtitle_percent" className="form-label">Offer Percentage</label>
              <input
                type="text"
                id="subtitle_percent"
                className="form-control"
                placeholder="90"
                value={banner?.subtitle?.percent || ""}
                onChange={handleChange}
                name="percent"
                data-parent="subtitle"
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="subtitle_text_2" className="form-label">Post Text</label>
              <input
                type="text"
                id="subtitle_text_2"
                className="form-control"
                placeholder="Off This Week"
                value={banner?.subtitle?.text_2 || ""}
                onChange={handleChange}
                name="Enter text 2"
                data-parent="subtitle"
              />
            </div>
          </div>


          {/* Section 4: Theme */}
          <h6 className="mb-3">Theme</h6>
          <div className="mb-4">
            <div className="form-check d-flex align-items-center gap-2">
              <input
                type="radio"
                className="form-check-input"
                id="green_bg"
                name="theme"
                checked={banner.green_bg}
                onChange={() => setEditForm({ ...banner, green_bg: true, is_light: false })}
              />
              <label className="form-check-label" htmlFor="green_bg">Dark Theme (green background)</label>
            </div>
            <div className="form-check d-flex align-items-center gap-2">
              <input
                type="radio"
                className="form-check-input"
                id="is_light"
                name="theme"
                checked={banner.is_light}
                onChange={() => setEditForm({ ...banner, green_bg: false, is_light: true })}
              />
              <label className="form-check-label" htmlFor="is_light">Light Theme (bluish white background)</label>
            </div>
          </div>


          {/* Section 5: Button Link */}
          <div className="mb-4">
            <h6>Button Link URL</h6>
            <input
              type="text"
              id="btn_link"
              className="form-control"
              placeholder="Enter button link"
              value={banner?.btn_link || ""}
              onChange={handleChange}
              name="btn_link"
            />
          </div>


          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBanner;
