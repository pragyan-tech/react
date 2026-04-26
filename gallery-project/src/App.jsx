import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './components/Card'

const App = () => {
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)

  const totalPages = 50 // example

  const getData = async () => {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=10`
    )
    setUserData(response.data)
  }

  useEffect(() => {
    getData()
  }, [index])

  // Pagination Logic
  const getPagination = () => {
    const pages = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (index <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (index >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        )
      } else {
        pages.push(
          1,
          '...',
          index - 1,
          index,
          index + 1,
          '...',
          totalPages
        )
      }
    }

    return pages
  }

  let printUserData = (
    <h3 className="text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold">
      Loading...
    </h3>
  )

  if (userData.length > 0) {
    printUserData = userData.map((elem, idx) => (
      <div key={idx}>
        <Card elem={elem} />
      </div>
    ))
  }

  return (
    <div className="bg-black overflow-auto h-screen p-4 text-white">
      <div className="flex h-[82%] flex-wrap gap-6 p-2 m-7">
        {printUserData}
      </div>

      <div className="flex justify-center items-center gap-1 flex-wrap p-4">
        {/* Prev */}
        <button
          disabled={index === 1}
          onClick={() => {
            if (index > 1) {
              setUserData([])
              setIndex(index - 1)
            }
          }}
          className="px-4 py-2 bg-amber-400 text-black rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* Pages */}
        {getPagination().map((page, idx) =>
          page === '...' ? (
            <span key={idx} className="px-3">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => {
                setUserData([])
                setIndex(page)
              }}
              className={`px-4 py-2 rounded ${
                index === page
                  ? 'bg-white text-black'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={index === totalPages}
          onClick={() => {
            if (index < totalPages) {
              setUserData([])
              setIndex(index + 1)
            }
          }}
          className="px-4 py-2 bg-amber-400 text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App