import { useState, useCallback } from 'react'

const USER_QUERY = /* GraphQL */ `
  query GET_DATA($message: String) {
    records(message: $message) {
      mentions
      emoticons
      links {
        url
        title
      }
    }
  }
`

export default function Index() {
  const [message, setMessage] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/graphql', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          query: USER_QUERY,
          variables: {
            message,
          },
        }),
      })
      const json = await res.json()
      setData(json.data)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }, [message])

  return (
    <div className="w-full mx-auto mt-20 flex flex-col items-center ">
      <h1 className="text-3xl text-center font-semibold uppercase">
        String parser
      </h1>
      <textarea
        className="w-10/12 mt-5 p-5 bg-gray-100 border-gray-800 rounded-sm"
        placeholder="Type your message here"
        onChange={(e) => setMessage(e.currentTarget.value)}
        value={message}
      />
      <button
        className="bg-blue-400 text-color font-medium rounded-lg mr-8 text-white p-2 w-40 hover:bg-opacity-80 m-10"
        onClick={handleClick}
        disabled={loading}
      >
        {!loading ? 'Submit' : 'loading...'}
      </button>
      {!!data && <p>{JSON.stringify(data)}</p>}
    </div>
  )
}
