import React from 'react'
import { HashLoader } from 'react-spinners'

const Loading = () => {
   return (
      <HashLoader
         className='top[-50%] left-[50%]'
         color='#2e73dc'
         //loading={true}
         size={50}
         aria-label="Loading Spinner"
         data-testid="loader"
      />
   )
}

export default Loading