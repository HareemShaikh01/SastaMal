import { useState } from 'react';
import Image from 'next/image';
import { AnimatedLine } from '@/svg';
import React from 'react';
// internal
import shape_1 from '@assets/img/subscribe/subscribe-shape-1.png';
import shape_2 from '@assets/img/subscribe/subscribe-shape-2.png';
import shape_3 from '@assets/img/subscribe/subscribe-shape-3.png';
import shape_4 from '@assets/img/subscribe/subscribe-shape-4.png';
import plane from '@assets/img/subscribe/plane.png';
// import your shapes and svg...

function Shape({ img, num }) {
  return <Image className={`tp-subscribe-shape-${num}`} src={img} alt="shape" />;
}

const CtaArea = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/subscribe/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      console.log("data is",data);
      setMessage(data.message || data.error);
      setEmail('');
    } catch (err) {
      setMessage('Something went wrong!');
    }
  };

  return (
    <section className="tp-subscribe-area pt-70 pb-65 p-relative z-index-1" style={{backgroundColor: "rgb(34 32 32)"}}>
      <div className="tp-subscribe-shape">
        <Shape img={shape_1} num="1" />
        <Shape img={shape_2} num="2" />
        <Shape img={shape_3} num="3" />
        <Shape img={shape_4} num="4" />
        <div className="tp-subscribe-plane">
          <Image className="tp-subscribe-plane-shape" src={plane} alt="img" />
          <AnimatedLine />
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-7">
            <div className="tp-subscribe-content">
              <span>Sale 10% off all store</span>
              <h3 className="tp-subscribe-title">Subscribe our Newsletter</h3>
            </div>
          </div>
          <div className="col-xl-5 col-lg-5">
            <div className="tp-subscribe-form">
              <form onSubmit={handleSubscribe}>
                <div className="tp-subscribe-input">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit">Subscribe</button>
                </div>
              </form>
              {message && <p className="mt-2">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaArea;
