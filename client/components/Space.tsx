import { useEffect, useState } from 'react'
import getData from '../apiClient.ts'
import { Apod } from '../../models/welcome.ts'

export default function Space() {
  const [data, setData] = useState<Apod[] | null>([])

  useEffect(() => {
    async function fetchData() {
      const result = await getData()
      setData(result)
    }

    try {
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="main-box">
      {data?.map((list) => {
        return (
          <div key={list.title} className="list-box">
            <img src={list.url} alt={list.title} />
            <div className="text-container">
              <h3>{list.title}</h3>
              <p>
                {list.explanation
                  .split('. ')
                  .slice(0, 2)
                  .map((sentence) => {
                    return sentence + '.'
                  })}
                ..
              </p>
              <p className="date">
                Date : <span>{list.date.toString()}</span>
              </p>
              <p className="copyright">Copyright © {list.copyright}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
