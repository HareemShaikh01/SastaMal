import React from 'react';
import { Truck, RotateCcw, Headset } from 'lucide-react'; // Lucide icons

const QuestionAns = () => {
  return (
    <div 
      className="accordion custom-accordion mx-auto my-5 px-2" 
      id="accordionPanelsStayOpenExample"
      style={{ maxWidth: '780px' }} // Center and small width
    >
      <h2 className="text-center mb-4">What We Offer?</h2>
      {/* Heading */}

      {/* Free Shipping */}
      <div className="accordion-item bg-black text-white border-0 mb-2 rounded">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button 
            className="accordion-button bg-black text-white custom-accordion-btn" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#panelsStayOpen-collapseOne" 
            aria-expanded="true" 
            aria-controls="panelsStayOpen-collapseOne"
          >
            <Truck className="me-2" size={20} />
            Free Shipping
          </button>
        </h2>
        <div 
          id="panelsStayOpen-collapseOne" 
          className="accordion-collapse collapse show" 
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            We provide <strong>Free Shipping</strong> - tracked & insured, across Pakistan.
          </div>
        </div>
      </div>

      {/* Easy Returns */}
      <div className="accordion-item bg-black text-white border-0 mb-2 rounded">
        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
          <button 
            className="accordion-button collapsed bg-black text-white custom-accordion-btn" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#panelsStayOpen-collapseTwo" 
            aria-expanded="false" 
            aria-controls="panelsStayOpen-collapseTwo"
          >
            <RotateCcw className="me-2" size={20} />
            Easy Returns
          </button>
        </h2>
        <div 
          id="panelsStayOpen-collapseTwo" 
          className="accordion-collapse collapse" 
          aria-labelledby="panelsStayOpen-headingTwo"
        >
          <div className="accordion-body">
            Our <strong>7-day</strong> free return policy ensures your satisfaction & peace of mind.
          </div>
        </div>
      </div>

      {/* 24/7 Customer Service */}
      <div className="accordion-item bg-black text-white border-0 rounded">
        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
          <button 
            className="accordion-button collapsed bg-black text-white custom-accordion-btn" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#panelsStayOpen-collapseThree" 
            aria-expanded="false" 
            aria-controls="panelsStayOpen-collapseThree"
          >
            <Headset className="me-2" size={20} />
            24/7 Customer Service
          </button>
        </h2>
        <div 
          id="panelsStayOpen-collapseThree" 
          className="accordion-collapse collapse" 
          aria-labelledby="panelsStayOpen-headingThree"
        >
          <div className="accordion-body">
            Our team is available <strong>24/7</strong> via live chat for your convenience.
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAns;
