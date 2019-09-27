import React, { Component } from 'react';
import {storeProducts, detailProduct} from './data';
import { parse } from 'url';

/* Un contexte contient 02 element: consumer et provider */
const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
    };

    //Au montage
    componentDidMount(){
        this.setProducts();
    }

    //Definition des produits (listage)
    setProducts = ()=> {
        let tempProducts = [];
        //Boucling
        storeProducts.forEach(item =>{
            const singleItem =  {...item};
            tempProducts= [...tempProducts, singleItem];
            
        })
        //MaJ de l'etat
        this.setState(()=>{
            return {products:tempProducts};
        })
    };

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    };

    //prise des details
    handleDetail = (id)=> {
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct: product};
        });
    };

    //ajouter au panier
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(()=>{
            return {products: tempProducts, cart: [...this.state.cart, product] };
        }, ()=>{
            /* CallBack Fonction */
            this.addTotals();
        });


    };

    openModal = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {modalProduct: product, modalOpen: true};
        })
    };

    closeModal = () =>{
        this.setState(()=>{
            return {modalOpen: false};
        })
    };

    increment = (id)=>{
        /* Creation d'un panier temporaire */
        let tempCart = [...this.state.cart];
        /** selection d'un produit via la fouille d'un element correspondant a un id donne */
        const selectedProduct = tempCart.find((item)=>item.id === id)
        
        /** recuperation de l'indice du composant  */
        const index = tempCart.indexOf(selectedProduct);

        /** recuperation du produit depuis le panier temporaire */
        const product = tempCart[index];

        //incrementation de la quantite
        product.count = product.count + 1;
        console.log(`${product.count} product.count`);
        //MaJ du prix total
        product.total = product.count * product.price; 

        //MaJ de l'etat
        this.setState(()=>{ 
            return{ cart:[...tempCart] }

        }, function(){
            this.addTotals();
        });

    };

    decrement = (id)=>{
        /* Creation d'un panier temporaire */
        let tempCart = [...this.state.cart];
        /** selection d'un produit via la fouille d'un element correspondant a un id donne */
        const selectedProduct = tempCart.find((item)=>item.id === id)
        
        /** recuperation de l'indice du composant  */
        const index = tempCart.indexOf(selectedProduct);

        /** recuperation du produit depuis le panier temporaire */
        const product = tempCart[index];

        //decrementation de la quantite jusqu'a 0
        
        product.count = product.count - 1;

        if(product.count === 0)
        {
            this.removeItem(id);
        }else{
            console.log(`${product.count} product.count`);
            //MaJ du prix total
            product.total = product.count * product.price; 
            //MaJ de l'etat
            this.setState(()=>{ 
                return{ cart:[...tempCart] };

            }, function(){
                this.addTotals();
            });
        } 
    };

    removeItem = (id)=>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState(()=>{
            return{
                cart: [...tempCart],
                products: [...tempProducts],
            };
        }, function(){
            this.addTotals();
        })
    };

    clearCart = ()=>{
        this.setState(()=>{
            return{
                cart:[],

            };
        }, function (){
            this.setProducts();
            this.addTotals();
        });
    };

    addTotals = ()=>{
        let subTotal = 0;
        this.state.cart.map((item)=>(subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return {
                cartSubTotal: subTotal,
                cartTax: tax,
                cartTotal: total,
            }
        })
    }


    render() {
        return (
            /* Tag permettant de renvoyer le provider du contexte cree*/
            /* ...this.state pour tous les elements, defini comme * en SQL*/
            <ProductContext.Provider 
            value={{
                ...this.state, 
                handleDetail: this.handleDetail, 
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart,
            }}>
            {/* retourne toute la grappe */}
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
