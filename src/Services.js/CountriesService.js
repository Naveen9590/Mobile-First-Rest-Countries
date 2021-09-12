
export async function getCountries(url){
    const jsonResponse=await fetch(url)
    const response=await jsonResponse.json()
    return response
}