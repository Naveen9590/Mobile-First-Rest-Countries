import React, { useEffect, useState } from 'react'
import { getCountries } from '../Services.js/CountriesService'
import './DetailPage.css'

const DetailPage=(props)=>{
    const [country,setCntryObj]=useState({})
    // loading details on page mount
    useEffect(()=>{
        (
            async ()=>{
                try{
                let pathName=window.location.pathname
                const url=`https://restcountries.eu/rest/v2/name${pathName}?fullText=true`
                let res=await getCountries(url)
                setCntryObj(res[0])
                }
                catch(err){
                    // props.handleError(err)
                }
            }
        )()
    },[])

    // concatenate Languages for DOM
    const getLanguages=(country)=>{
        let s=''
        country.languages.forEach(item=>{
            s+=`${item.name}, `
        })
        return s.substring(0,s.length-2)
    }

    // hardcoding to reuse in DOM
    const detLabels1=[{view:'Native Name',label:'nativeName'},{view:'Population',label:'population'},
    {view:'Region',label:'region'},{view:'Sub Region',label:'subregion'},{view:'Capital',label:'capital'}]

    // to update state and show border country details which is clicked
    const borderCountry=async (name)=>{
        const url=`https://restcountries.eu/rest/v2/alpha/${name}`
        try{
        let res=await getCountries(url)
        let pattern=/4[0-9][0-9]/
        if(pattern.test(res.status)){
            throw res
        }
        setCntryObj(res)
        }
        catch(err){
            props.handleError(err)
        }
    }

    
    return(
        <div className='Detail-container'>
            <div className='btn-container'>
                <button className={`back-btn ${props.theme===0?'theme-btn-dark':'theme-btn-day'}`} onClick={()=>props.routeprops.history.push('/')}>Back</button>
            </div>
            <div className='summary'>
                <div className='summary-flag'>
                    <img src={country.flag} alt={'flag'}/>
                </div>
                <div className='summary-det'>
                    <h3>{country.name}</h3>
                    <div className='details-cont'>
                        <div>
                            {detLabels1.map(item=><p key={item.label}>{item.view}:{country[item.label]}</p>)}
                        </div>
                        <div>
                            <p>Top Level Domain:{country.topLevelDomain}</p>
                            <p>Currencies:{country.currencies?country.currencies[0].name:''}</p>
                            <p>Languages:{country.languages?getLanguages(country):''}</p>
                        </div>
                    </div>
                    <div className='pills-neighbour'>
                        <div>Border Countries:</div>
                        <div className='border-country-container'>
                            {
                                country.borders?country.borders.map(item=><button className={`border-country ${props.theme===0?'theme-btn-dark':'theme-btn-day'}`} name={item} onClick={()=>borderCountry(item)}>{item}</button>):null
                            }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DetailPage