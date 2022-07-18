import './NavBar.css';
import logoImg from '../../assets/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { useEffect } from 'react';


// linksArr = [{id: 111, path:"/", context:"LINK!"}]
function NavBar({ children, linksArr = [] }) {
    const [sideBarOpen, setSideBarOpen] = useState(false);

    // useEffect(() => {
    //     document.addEventListener('scroll', (e) => {
    //         console.log(e);
    //         setSideBarOpen(false);
    //     })
    // },[])

    return (
        <nav>
            <ul className='ul-nav-bar-links'>
                <li className='li-nav-bar-links'>
                    <Link className='hover-opacity nav-link' id='welcome-link' to="/"><img id='welcome-link-img' src={logoImg} alt="CollaClip" /></Link>
                </li>
                {linksArr.map(link => {
                    return (
                        <li className='li-nav-bar-links desktop' key={link.id} >
                            <Link className='hover-opacity nav-link' to={link.path}>{link.context}</Link>
                        </li>
                    )
                })}
            </ul>
            <div className='nav-bar-options desktop'>
                {children}
            </div>
            <div className='mobile'>
                <div className='open-close-menu' onClick={() => setSideBarOpen(pre => !pre)}>

                </div>
                {
                    sideBarOpen
                    &&
                    <div className='open-menu'>
                        <ul className='ul-nav-bar-links'>
                            {linksArr.map(link => {
                                return (
                                    <li className='li-nav-bar-links' key={link.id} >
                                        <Link className='nav-link open-menu__link' to={link.path}>{link.context}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className='open-menu__btn'>
                            {children}
                        </div>
                    </div>
                }
            </div>
        </nav>
    )
}

export default NavBar