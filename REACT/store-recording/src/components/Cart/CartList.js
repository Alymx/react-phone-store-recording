import React from 'react';
import CartItem from './CartItem';



export default function CartList({value}) {

    const {cart} = value;
    console.log(value);
    
    return (
        <div className="container-fluid">
            {cart.map((item)=>{
                //On passe l'element item pour ne plus fouiller et value pour avoir acces aux fonctions du contexte
                return <CartItem key={item.id} item={item} value={value} />;
            })}
            
        </div>
    )
}
