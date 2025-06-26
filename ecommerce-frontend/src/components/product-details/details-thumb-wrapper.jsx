import Image from "next/image";
import { useState, useEffect } from "react";
import PopupVideo from "../common/popup-video";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";


// Custom CSS class
const thumbImageStyle = {
  borderRadius: "5px",
  width: "100%",
  height: "auto",
  maxWidth: "100px", // Allow the image to have a maximum width for larger screens
};

const mobileThumbImageStyle = {
  ...thumbImageStyle,
  maxWidth: "90px", // Use a smaller max-width for mobile
};

const DetailsThumbWrapper = ({
  imageURL,
  handleImageActive,
  activeImg,
  imgWidth = 200,
  imgHeight = 500,
  videoId = false,
  status,
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom arrow components
  const NextArrow = ({ onClick }) => (
    <div
      className="slick-arrow slick-next"
      style={{
        position: "absolute",
        right: "-1px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <ChevronRight size={24} />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="slick-arrow slick-prev"
      style={{
        position: "absolute",
        left: "-22px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <ChevronLeft size={24} />
    </div>
  );

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default to 3 for larger screens
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    spaceBetween: 0.1, // Adjust the spacing between slides (reduce this value as needed)
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 3, // Show 2 images on tablets
          spaceBetween: 0.1, // Adjust spacing for tablets
        },
      },
      {
        breakpoint: 768, // Mobile Landscape
        settings: {
          slidesToShow: 3, // Show 1 image on smaller devices
          spaceBetween: 1, // Adjust spacing for mobile
        },
      },
      {
        breakpoint: 480, // Mobile Portrait
        settings: {
          slidesToShow: 3, // Show 1 image on mobile
          spaceBetween: 1, // Adjust spacing for mobile
        },
      },
    ],
  };

  return (
    <>
      <div
        className="tp-product-details-thumb-wrapper tp-tab d-sm-flex mx-3"
        style={{
          justifyContent: "center",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <div
          className="tab-content m-img"
          style={{
            width: "100%",
            maxWidth: "450px",
            margin: "0 auto",
          }}
        >
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              {/* Main Image */}
              <div style={{ position: "relative", width: "100%", height: "auto" }}>
                <Image
                  src={activeImg}
                  alt="product img"
                  layout="responsive"
                  width={imgWidth}
                  height={imgHeight}
                  sizes="(max-width: 900px) 100vw, 450px"
                />
              </div>

              {/* Stock Badge */}
              <div className="tp-product-badge">
                {status === "out-of-stock" && <span className="product-hot">out-stock</span>}
              </div>

              {/* Video Popup */}
              {videoId && (
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="tp-product-details-thumb-video"
                >
                  <a className="tp-product-details-thumb-video-btn cursor-pointer popup-video">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              )}
            </div>

            {/* Thumbnails Slider */}
            <div
              className="mt-4 position-relative"
              style={{
                width: "calc(100% + 50px)", // Extend the slider width beyond the image
                marginLeft: "-25px", // Center the extended slider
              }}
            >
              <Slider {...settings}>
                {imageURL?.map((item, i) => (
                  <div key={i} style={{ padding: "0 1px", cursor: "pointer" }}>
                    <Image
                      src={item}
                      alt="thumb"
                      width={90}
                      height={90}
                      className={`img-fluid ${item === activeImg ? "border border-primary" : ""}`}
                      style={{
                        ...(
                          isMobile ? mobileThumbImageStyle : thumbImageStyle
                        ),
                        width: "90px",  // Force width
                        height: "90px", // Force height
                        objectFit: "cover", // Crop to fit box
                        borderRadius: "5px",
                      }}
                      onClick={() => handleImageActive(item)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      {/* Modal popup */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}
    </>
  );
};

export default DetailsThumbWrapper;
