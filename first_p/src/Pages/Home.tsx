import React from 'react'
import "../style/Home.css"
import NavBar from '../Components/NavBar';


const Home: React.FC = () => {
  return (
    <div className='container m-2'>
      <div className='homepage'>
        {/* <NavBar /> */}
        <input type='file' className='m-2' placeholder='' />
      </div>
    </div>
  )
}

export default Home;
