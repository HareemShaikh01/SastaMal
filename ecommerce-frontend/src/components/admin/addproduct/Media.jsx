import React, { useState } from 'react';
import Image from 'next/image';

const Media = ({ formData, handleChange, errors, images, setImages, isUploaded, setIsUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null); // New state for handling errors

  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImages = [...images];

    for (let i = 0; i < files.length; i++) {
      updatedImages.push({
        img: files[i],
        preview: URL.createObjectURL(files[i]),
      });
    }

    setImages(updatedImages);
    handleChange(e);
    setIsUploaded(false);
    setUploadError(null); // Reset the error if the user adds new images
  };

  const handleImageDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const uploadImages = async () => {
    try {
      setIsUploading(true);
      setUploadError(null);

      const cloudinaryResponse = await Promise.all(
        images.map((image) => {
          const cloudinaryFormData = new FormData();
          cloudinaryFormData.append('file', image.img);
          cloudinaryFormData.append('upload_preset', 'ecommerce');

          return fetch('https://api.cloudinary.com/v1_1/dyfhi3avq/image/upload', {
            method: 'POST',
            body: cloudinaryFormData,
          })
            .then((response) => response.json())
            .then((data) => data.secure_url);
        })
      );

      handleChange({
        target: {
          name: 'imageURL',
          value: cloudinaryResponse,
        },
      });

      setIsUploaded(true);
      return cloudinaryResponse;
    } catch (error) {
      setUploadError('There was an error uploading your images. Please try again.');
      setIsUploading(false);
      return [];
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section>
      <h2 className="mb-4 fs-4 fs-md-3 border-bottom pb-2">Media</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Main Product Image(s)*</label>
          <input
            type="file"
            className={`form-control ${errors.img ? 'is-invalid' : ''}`}
            name="img"
            onChange={handleImageChange}
            accept="image/*"
            multiple
          />
          {errors.img && <div className="invalid-feedback">{errors.img}</div>}
          {uploadError && <div className="text-danger">{uploadError}</div>}

          <div className="mt-3">
            {images.map((image, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <div className="me-2">
                  <Image
                    src={image.preview}
                    alt={`Image ${index + 1}`}
                    className="img-thumbnail"
                    style={{ maxHeight: '150px' }}
                    width={150}
                    height={150}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={() => handleImageDelete(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={uploadImages}
            disabled={isUploading || images.length === 0 || isUploaded}
          >
            {isUploading ? 'Uploading...' : isUploaded ? 'Uploaded' : 'Upload Images'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Media;
