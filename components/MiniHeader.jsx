import React from 'react'

const MiniHeader = (props) => {
  return (
    <div className="w-full max-w-[90%] mx-auto bg-gray-100 text-center text-lg font-semibold py-3 rounded-md shadow-md my-6">
            {props.title}
    </div>
  )
}

export default MiniHeader
