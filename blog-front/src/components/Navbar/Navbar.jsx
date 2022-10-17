import React from 'react'
import styles from "./Navbar.module.css"
import logo from "./Image/OIP.jpg"
import {Button, HStack, Image, useMediaQuery, VStack} from "@chakra-ui/react"

const Navbar = () => {
    const [Displayfull] = useMediaQuery('(min-width: 1000px)')
    const [Displaymid] = useMediaQuery('(min-width: 700px)')
    const [Displaysmall] = useMediaQuery('(min-width: 00px)')
  return (
   <div>
     {(() => {
        if (Displayfull) {
          return  <FullScreen/>  ;
        } else if (Displaymid) {
          return <MidScreen/> ;
        } else if(Displaysmall) {
          return  <SmallScreen/>;
        }
      })()}
   
    {/* {Displayfull?<FullScreen/>:<SmallScreen/>} */}
    {/* {Displaymid?<MidScreen/>:""} */}
    {/* {Displaysmall?</>:""} */}
   </div>
  )
}

const FullScreen=()=>{
    const Google=()=>{
        window.open("http://localhost:8080/auth/google","_self")
    }
    return(
        <VStack>
<HStack className={styles.container}>
    <HStack>
        <Image src={logo} width="200px" alt="medium"/>
    </HStack>
    <HStack className={styles.text}>
        <h5>Our story</h5>
        <h5>Membership</h5>
        <h5>Write</h5>
        <h5 onClick={Google}>Sign In</h5>
        <Button className={styles.button}>Get started</Button>
    </HStack>
    </HStack>
    <HStack>
<hr 
className={styles.hr}

></hr>

   </HStack>
</VStack>
    )
}

const MidScreen=()=>{
    return(
        <VStack>
<HStack className={styles.container}>
    <HStack>
        <Image src={logo} width="200px" alt="medium"/>
    </HStack>
    <HStack className={styles.text}>
        <h5>Write</h5>
        <h5>Sign In</h5>
        <Button className={styles.button}>Get started</Button>
    </HStack>
    </HStack>
    <HStack>
<hr 
className={styles.hr}

></hr>

   </HStack>
</VStack>
    )
}


const SmallScreen=()=>{
    return(
        <VStack>
<HStack className={styles.container}>
    <HStack>
        <Image src={logo} width="200px" alt="medium"/>
    </HStack>
    <HStack className={styles.text}>      
        <h5>Sign In</h5>
        <Button className={styles.button}>Get started</Button>
    </HStack>
    </HStack>
    <HStack>
<hr 
className={styles.hr}

></hr>

   </HStack>
</VStack>
    )
}

export default Navbar