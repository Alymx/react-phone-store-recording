import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.svg';
import {ButtonContainer} from './Button';



export default class Navbar extends Component {
    render() {
        return (
            /* Barre de navigation du site */
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
                {/*
                    https://www.iconfinder.com/icons/1243689/call_phone_icon Create Commons (Attribution 3.0 Unported);
                    https://www.iconfinder.com/Makoto_msk
                */}
                {/* Tag de lien (pour le logo) */}
                <Link to='/'>
                    <img src={logo} width="50px" alt="Store" className="navbar-brand" />
                </Link>

                {/* Tag de liste pour la sitemap (liste de liens) */}
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link">
                            Our products
                        </Link>
                    </li>
                </ul>

                <Link to="/cart" className="ml-auto">

                    <ButtonContainer> 
                        <span className="mr-2">
                            <i className="fas fa-cart-plus" /> 
                        </span>
                        my cart
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        );
    }
}

const NavWrapper = styled.nav`
    background: var(--mainBlue);
.nav-Link{
    color: var(--mainWhite) !important;
    font-size: 1.3rem; //1rem = 16px
    text-transform: capitalize !important;
}
    `


