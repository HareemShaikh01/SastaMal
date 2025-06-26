import React, { useEffect, useState } from 'react'
import BasicProductInfo from './BasicProductInfo'
import ProductClassification from './ProductClassification'
import PricingAndInventory from './PricingAndInventory'
import Media from './Media'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FormProduct = () => {
    const [images, setImages] = useState([]);
    const [isUploaded, setIsUploaded] = useState(false);


    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        productType: '',
        brand: '',
        category: '',
        parent: '',
        children: '',
        price: '',
        previousPrice: 0,
        quantity: 0,
        status: 'in-stock',
        img: null,
        imageURL: [],
        videoId: '',
        tags: [],
        featured: false,
        trending: false,
        active: true,
        variants: [],
        colorCode: '',
        colorName: '',
        variantImage: null,
        variantSizes: [],
        additionalInfo: [],
        key: '',
        value: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/all`);
                const data = await res.json();

                if (data.result) {
                    setCategories(data.result);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);


    const resetForm = () => {

        setFormData({
            title: '',
            slug: '',
            sku: "",
            description: '',
            productType: '',
            brand: '',
            category: '',
            parent: '',
            children: '',
            price: '',
            previousPrice: 0,
            quantity: 0,
            status: 'in-stock',
            img: null,
            videoId: '',
            tags: [],
            featured: false,
            variants: [],
            colorCode: '',
            colorName: '',
            variantImage: null,
            variantSizes: [],
            additionalInfo: [],
            key: '',
            value: ''
        });
        setImages([]);
    };


    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (!validateForm()) return;
        if (!isUploaded) {
            toast.error('Please click the Upload Images button first!');
            return;
        }
        if (!formData.productType || !formData.parent || !formData.children) {
            toast.error('Please fill out all classification fields!');
            return;
          }
        setIsSubmitting(true);

        try {



            console.log("Form data before submission:", formData);

            const formDataToSend = {
                ...formData,
                img: formData.imageURL[0], // Use the first image for the main image
            };
            // console.log("Form data before submission:", formDataToSend);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSend),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create product');
            }

            toast.success("Product created successfully!");
            resetForm();

        } catch (error) {
            console.error('Submission error:', error);
            toast.error(`${error.message || "An error occurred. Check console."}`);
        } finally {
            setIsSubmitting(false);
        }
    };




    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Product title is required';
        if (!formData.price || isNaN(formData.price)) newErrors.price = 'Valid price is required';
        if (!formData.img) newErrors.img = 'Main product image is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const generateSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        // First determine the new value
        let newValue;
        if (type === "checkbox") {
            newValue = checked;
        } else if (type === "file") {
            newValue = files[0];
        } else if (name === "tags") {
            newValue = value.split(",").map(tag => tag.trim());
        } else {
            newValue = value;
        }

        // Then update the form data
        setFormData(prev => {
            const updatedData = {
                ...prev,
                [name]: newValue
            };

            // Conditionally update slug if title changed
            if (name === "title" && (!prev.slug || prev.slug === generateSlug(prev.title))) {
                updatedData.slug = generateSlug(value);
            }

            return updatedData;
        });

        // Clear error if exists
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };


    return (
        <>
            {/* main-content-div in the first div */}
            <div className='bg-white d-flex justify-content-center p-md-5 px-3 overflow-scroll'>
                <div className="w-100" style={{ maxWidth: '1300px' }}>
                    <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light w-100">
                        <h1 className='text-center py-3'>Add Product</h1>
                        {/*  title slug nd description */}
                        <BasicProductInfo formData={formData} handleChange={handleChange} errors={errors} />

                        <hr className="my-4" />


                        <ProductClassification
                            formData={formData}
                            setFormData={setFormData}
                            categories={categories}
                        />

                        <hr className="my-4" />

                        <PricingAndInventory
                            formData={formData}
                            handleChange={handleChange}
                            errors={errors}
                        />

                        <hr className="my-4" />

                        <Media formData={formData} handleChange={handleChange} errors={errors} images={images} setImages={setImages} isUploaded={isUploaded} setIsUploaded={setIsUploaded} />
                        <hr className="my-4" />

                        <div className="row mb-4">
                            <div className="col-md-4 d-flex align-items-center gap-2">
                                <label className="form-check-label fw-bold" htmlFor="activeSwitch">Active</label>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="activeSwitch"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4 d-flex align-items-center gap-2">
                                <label className="form-check-label fw-bold" htmlFor="trendingSwitch">Trending</label>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="trendingSwitch"
                                        name="trending"
                                        checked={formData.trending}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-4 d-flex align-items-center gap-2">
                                <label className="form-check-label fw-bold" htmlFor="featuredSwitch">Featured</label>
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="featuredSwitch"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>



                        {/* Form Submission */}
                        <div className="d-flex justify-content-end mt-5">
                            {images.length > 0 && (<button
                                type="submit"
                                className="btn btn-primary px-4 py-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Processing...
                                    </>
                                ) : (
                                    'Create Product'
                                )}
                            </button>)}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormProduct