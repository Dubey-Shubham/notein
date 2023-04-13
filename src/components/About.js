import React, {useContext} from 'react'        // usecontext hook ko import kar liya
import noteContext from '../context/notes/noteContext'   //notecontext module jo banaya tha usko yahan import kar liya
import { useEffect } from 'react'

const About=()=> {
  const a = useContext(noteContext)

  useEffect(() => {
    a.update();             //a ko update kar diya jayega
    // eslint-disable-next-line
}, [])

  return (
    <div>
      This is About
            This is About {a.state.name} and he is in class {a.state.class}   
    </div>
  )
}

export default About

