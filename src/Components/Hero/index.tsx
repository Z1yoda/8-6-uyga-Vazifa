import './index.css'
import Card from '../Card'
import { useState } from 'react'
import { CountryType } from '../../types/type'

const Hero = () => {
 const [from, setFrom] = useState<CountryType | null>(null);
  const [to, setTo] = useState<CountryType | null>(null);

 const handleDataChange = (data: CountryType | null, type: string) => {
    if (type === 'from') {
      setFrom(data);
      
    } else if (type === 'to') {
      setTo(data);
    }
  };

  return (
      <div className="hero-wrapper">
      <div className="container">
       {
          from && to ? (
            <h1>{from.code} to {to.code} - Convert {from.name} to {to.name}</h1>
          ) : (
            <h1>Xe Currency Converter</h1>
          )
        }
              <h4>Check live foreign currency exchange rates</h4>
             
                  <Card sendDataToParent={handleDataChange} ></Card>
              
          </div>

    </div>
  )
}

export default Hero