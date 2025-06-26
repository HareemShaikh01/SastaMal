import { Truck, PackageOpen, RotateCcw } from 'lucide-react';

const ShippingInfo = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="border p-4 bg-white rounded shadow" style={{ maxWidth: '400px' }}>
        {/* Item 1 */}
        <div className="d-flex align-items-center gap-3 pb-3 border-bottom">
          <Truck size={28} className="text-dark flex-shrink-0" />
          <p className="mb-0 fs-5 text-dark">
            <strong>Delivery Time:</strong> Orders deliver within 3 working days.
          </p>
        </div>

        {/* Item 2 */}
        <div className="d-flex align-items-center gap-3 pb-3 border-bottom mt-3">
          <PackageOpen size={28} className="text-dark flex-shrink-0" />
          <p className="mb-0 fs-5 text-dark">
            <strong>Return Allow:</strong> You can return your parcel in 7 days.
          </p>
        </div>

        {/* Item 3 */}
        {/* <div className="d-flex align-items-center gap-3 pb-3 mt-3">
          <RotateCcw size={28} className="text-dark flex-shrink-0" />
          <p className="mb-0 fs-5 text-dark">
            <strong>Hassle-Free Returns:</strong> 30-day easy returns & exchanges.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default ShippingInfo;
