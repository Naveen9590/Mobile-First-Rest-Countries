import React, { useEffect, useState } from 'react'
import {InputGroup,FormControl} from 'react-bootstrap'
import { getCountries } from '../Services.js/CountriesService'
import CountryCards from './CountryCards'
import './Filters.css'

const Filters=(props)=>{
    const [selectedRegion,setSelectedRegion]=useState('')
    const [country,setCountry]=useState('')
    const [countryarr,setArr]=useState([])

    // to populate search container
    const optArr=['Filter by Region','Africa','Americas','Asia','Europe','Oceania']

    // to load details on component mount
    useEffect(()=>{
        (async ()=>{
            try{
        const res=await getCountries('https://restcountries.eu/rest/v2/all')
        setArr(res)
            }
            catch(err){
                // props.handleError(err)
            }
        })()
    },[])

    // searching countries by name
    const handleSearch=async ()=>{
        try{
            let res
            if(country){
            res=await getCountries(`https://restcountries.eu/rest/v2/name/${country}`)
            }
            else{
                return
            }
            let pattern=/4[0-9][0-9]/
            if(pattern.test(res.status)){
                throw res
            }
            setArr(res)
        }
        catch(err){
            console.log(err,"handling error")
            props.handleError(err)
        }
    }

    // searching countries by region
    const handleSearchByRegion=async(val)=>{
        try{
        setSelectedRegion(val)
        const res=await getCountries(`https://restcountries.eu/rest/v2/region/${val}`)
        let pattern=/4[0-9][0-9]/
        if(pattern.test(res.status)){
            throw res
        }
        setArr(res)
        }
        catch(err){
            console.log(err,"handling error")
            props.handleError(err)
        }
    }

    return(
        <div>
            <div className='Filters-Container'>
                <div className='input-grp-cont1 mb-3'>
                <InputGroup >
                    <FormControl
                        placeholder="Search for a Country...."
                        aria-label="Search For a Country"
                        aria-describedby="basic-addon1"
                        className={`input-container ${props.theme===0?'in-dark':'in-day'}`}
                        onChange={(e)=>setCountry(e.target.value)}
                    />
                    <InputGroup.Text onClick={handleSearch}><i className="fas fa-search"></i></InputGroup.Text>
                </InputGroup>
                </div>
                <div className='select-cont-1 mb-3'>
                <select className={`filter-countries ${props.theme===0?'in-dark':'in-day'}`} value={selectedRegion} onChange={(e)=>handleSearchByRegion(e.target.value)}>
                    {
                        optArr.map(item=>item==='Filter by Region'?<option value='' key={item} disabled>{item}</option>:<option key={item} value={item}>{item}</option>)
                    }
                </select>
                </div>

            </div>
            <CountryCards countries={countryarr} theme={props.theme}/>
        </div>

    )
}

export default Filters