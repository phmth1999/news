import React from 'react';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-wrapper-1 py-2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-4 my-3">
                <div className="footer-top-data d-flex gap-30 align-items-center">
                  <h2 className='mb-0 text-white'>Sign Up for Newsletter</h2>
                </div>
              </div>
              <div className="col-lg-8 my-3">
                <div className="input-group">
                  <input 
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text py-2" id="basic-addon2">
                    Subscribe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-wrapper-2 py-2">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <p className="text-center mb-0 text-white">
                  &copy; Copyright <strong>{ new Date().getFullYear() }</strong> <strong>PMT</strong>.All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer