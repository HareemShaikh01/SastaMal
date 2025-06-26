import React from 'react';
import { ArrowRightLong, TextShape } from "@/svg";
import Image from "next/image";
import Link from "next/link";
import shape_1 from "@assets/img/slider/shape/slider-shape-1.png";
import shape_2 from "@assets/img/slider/shape/slider-shape-2.png";
import shape_3 from "@assets/img/slider/shape/slider-shape-3.png";
import shape_4 from "@assets/img/slider/shape/slider-shape-4.png";
import { toast } from 'react-toastify';

function BannerCard({ banner, getBannerById, fetchBanners }) {
  const handleEditClick = (id) => {
    getBannerById(id);
  };

  
  const handleDeleteClick = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this banner?"); 
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/deleteBanner/${id}`, {
        method: 'DELETE',
      });
      
      

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete banner');
      }

      toast.success('Banner deleted successfully!');
      fetchBanners(); // Refetch banners to update list

    } catch (error) {
      toast.error('Error deleting banner: ' + error.message);
    }
  };



  const { pre_title, title, subtitle, img, green_bg, is_light, btn_link } = banner;

  const darkTheme = {
    backgroundColor: '#0a4551',
    textColor: 'text-white',
    accentColor: '#f7d24c',
    buttonBg: '#ffffff',
    buttonText: '#10293b',
    underlineColor: '#f7d24c',
  };

  const lightTheme = {
    backgroundColor: '#e6eef5',
    textColor: 'text-dark',
    accentColor: '#ff5a5f',
    buttonBg: '#10293b',
    buttonText: '#ffffff',
    underlineColor: '#ff5a5f',
  };

  const theme = green_bg ? darkTheme : is_light ? lightTheme : darkTheme;

  return (
    <div className="container px-5 py-2 position-relative" style={{ backgroundColor: theme.backgroundColor }}>
      <Image className="tp-slider-shape-1" style={{ zIndex: 0 }} src={shape_1} alt="slider-shape" priority />
      <Image className="tp-slider-shape-2" style={{ zIndex: 0 }} src={shape_2} alt="slider-shape" priority />
      <Image className="tp-slider-shape-3" style={{ zIndex: 0 }} src={shape_3} alt="slider-shape" priority />
      <Image className="tp-slider-shape-4" style={{ zIndex: 0 }} src={shape_4} alt="slider-shape" priority />

      {/* Icon Wrapper (Edit + Delete) */}
      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2 z-10">

        {/* Edit Icon */}
        <div
          className="bg-white bg-opacity-75 rounded-circle p-2 d-flex align-items-center justify-content-center text-dark text-decoration-none"
          role="button"
          title="Edit"
          style={{ transition: 'color 0.2s ease-in-out' }}
          onMouseEnter={(e) => e.currentTarget.classList.replace('text-dark', 'text-primary')}
          onMouseLeave={(e) => e.currentTarget.classList.replace('text-primary', 'text-dark')}
          onClick={() => handleEditClick(banner._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-edit"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>

        {/* Delete Icon */}
        <div
          className="bg-white bg-opacity-75 rounded-circle p-2 d-flex align-items-center justify-content-center text-dark text-decoration-none"
          role="button"
          title="Delete"
          style={{ transition: 'color 0.2s ease-in-out' }}
          onMouseEnter={(e) => e.currentTarget.classList.replace('text-dark', 'text-danger')}
          onMouseLeave={(e) => e.currentTarget.classList.replace('text-danger', 'text-dark')}
          onClick={() => handleDeleteClick(banner._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-trash"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-2 14H7L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4h6v2" />
          </svg>

        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-xl-5 col-lg-6 col-md-6">
          <div className="tp-slider-content p-relative z-index-1">
            <span className={`${theme === darkTheme ? "text-white" : "text-dark"}`}>
              {pre_title.text} <b>Rs.{pre_title.price}</b>
            </span>
            <h3 className={`tp-slider-title ${theme === darkTheme ? "text-white" : "text-dark"}`}>{title}</h3>
            <p className={`${theme === darkTheme ? "text-white" : "text-dark"}`}>
              {subtitle.text_1}
              <span>
                {subtitle.percent}%
                <TextShape />
              </span>{" "}
              {subtitle.text_2}
            </p>

            {btn_link && (
              <div className="tp-slider-btn">
                <Link href={btn_link} className={`tp-btn tp-btn-2 tp-btn-white ${theme === darkTheme ? "bg-white text-dark" : "bg-dark text-white"}`}>
                  Shop Now <ArrowRightLong />
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="col-xl-7 col-lg-6 col-md-6">
          <div className="tp-slider-thumb text-end">
            <Image
              src={img}
              alt="slider-img"
              height={500}
              width={500}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerCard;
