import React from 'react'
import './CountryCard.css'
import { withRouter } from "react-router";
const getCard=(country,history,theme)=>{
    const otherDetails=['population','region','capital']
    return(
        <div className='col-12 col-md-4 col-lg-3 mb-3'>
            <div className={`cntry-card ${theme===0?'card-dark':'card-day'}`}>
                <div className='flag' onClick={()=>history.push(`/${country.name}`)}>
                    <img src={country.flag} alt={'flag'}/>
                </div>
                <div className='details'>
                    <h6>{country.name}</h6>
                    {
                    otherDetails.map(item=>
                        <div key={item}>
                        <p className='oDetails-p'>{item}:</p>
                        <span className='text text-muted'>{country[item]}</span>
                        </div>
                    )
                        }

                </div>
            </div>
        </div>
    )
}

const CountryCards=(props)=>{
    const {countries,theme}=props
    console.log('theme',theme)
    return(
        <div className='country-container container-fluid row'>
            {countries.map(item=>
                getCard(item,props.history,theme)
                )}
        </div>
    )
}

export default withRouter(CountryCards)