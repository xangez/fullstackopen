import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(null)

  useEffect(() => {
    try {
      axios.get(`https://restcountries.eu/rest/v2/name/${name.country}?fullText=true`).then((response) => {
        setCountry(response.data[0])
        setFound(true)
        console.log(response.data[0].capital)
      })
    } catch (err) {
      console.log(err)
    }
  }, [name.country])

  return {
    country,
    found,
  }
}

const Country = (name) => {
  const country = useCountry(name)

  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.country.name} </h3>
      <div>capital {country.country.capital} </div>
      <div>population {country.country.population}</div>
      <img src={country.country.flag} height="100" alt={`flag of ${country.country.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      {name === '' ? <div></div> : <Country country={name} />}
    </div>
  )
}

export default App
