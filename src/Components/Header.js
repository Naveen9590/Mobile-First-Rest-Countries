import React from 'react'
import './Header.css'

const Header=(props)=>{

    const changeBackground=()=>{
        document.querySelector('.App').classList.toggle('App-Day')
        document.querySelector('.App').classList.toggle('App-Dark')
        document.querySelector('.app-header').classList.toggle('header-style-dark')
        document.querySelector('.app-header').classList.toggle('header-style-day')
        // document.querySelector('.filter-countries')&&document.querySelector('.filter-countries').classList.toggle('in-dark')
        // document.querySelector('.filter-countries')&&document.querySelector('.filter-countries').classList.toggle('in-day')
        // document.querySelector('.input-container')&&document.querySelector('.input-container').classList.toggle('in-dark')
        // document.querySelector('.input-container')&&document.querySelector('.input-container').classList.toggle('in-day')
        // document.querySelectorAll('.cntry-card')&&document.querySelectorAll('.cntry-card').classList.toggle('card-dark')
        // document.querySelectorAll('.cntry-card')&&document.querySelectorAll('.cntry-card').classList.toggle('card-day')
        // let el=document.querySelectorAll('.cntry-card')
        // for(let i=0;i<el.length;i++){
        //     el[i].classList.toggle('card-dark')
        //     el[i].classList.toggle('card-day')
        // }
        props.check()
    }

    return(
        <div className='app-header header-style-dark'>
            <p className='head-text'>Where in the World?</p>
            <div className='moon-btn' onClick={changeBackground}>
                <span><i className="fas fa-moon"></i></span>{' '}
                <span>Dark Mode</span>
            </div>
        </div>
    )
}

export default Header