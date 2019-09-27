import React from 'react';

export default function CartColumns() {
    return (
        /* container-fluid: avec marges; text-center: centrer texte; d-none: display none; d-lg-block: visible en mode PC */
        <div className="container-fluid text-center d-none d-lg-block">
            <div className="row">
                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">Product</p>
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">Name of Product</p>
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">Price</p>
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">Quantity</p>
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">Remove</p>
                </div>

                <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase">Total</p>
                </div>
            </div>
        </div>
    );
}

