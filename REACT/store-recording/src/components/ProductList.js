import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../context';

class ProductList extends Component {

    render() {
        return (
            /* Fragment */
            <React.Fragment>                
                <div className="py-5">
                    {/* Conteneur */}
                    <div className="container">

                        {/* Titre du corpus */}
                        <Title name="All" title="Products" />

                        {/* Grille */}
                        <div className="row">
                            <ProductConsumer>
                                {(value)=>{
                                    return value.products.map((product) =>{
                                        return <Product key={product.id} product={product} handleDetail={value.handleDetail} />
                                    });
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            
        );
    }
}

export default ProductList