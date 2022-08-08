import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function SuperHeroesPage() {
    const [isloading,setIsLoading] = useState(true)
    const [data,setData] = useState([])
    const [error,setError] = useState('')
    useEffect(() => {
        axios.get('http://localhost:4000/superheroes').then((res) => {
            setData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            setError(err.message)
            setIsLoading(false)
        })
    },[])
    if (isloading) {
      return <h2>Loading...</h2>
    }
    if (error) {
        return <h2>{error}</h2>
      }
  return (
    <div>
        <h2>Super Hero Page</h2>
        {
            data.map((hero) => {
                return <div key={hero.id}>{hero.name}</div>
            })
        }
    </div>
  )
}
