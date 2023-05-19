import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const qual = [
  { id: "1", name: "B.A."},
  { id: "2", name: "B.Arch."},
  { id: "3", name: "BSc"},
  { id: "4", name: "MSc"},
  { id: "5", name: "B.Tech"},
  { id: "6", name: "M.Tech"},
  { id: "7", name: "PhD"}
]

function SmallCard ({app}) {
  const router = useRouter();
  const handleSubmit = () => {
    localStorage.setItem('app',JSON.stringify(app));
    router.push('application')
  }

  if(app) {
    const q = qual.filter(k => k.id === app.qualifications);
    if(app.roundNum > 4) {
      return (
        <Box padding="20px" width="350px" height="325px" display="flex"  borderRadius="20px"
            boxShadow={"5px 5px 10px green"}
            margin="30px" bg="#89CFF0"  
            >
                <Box width="100%" height="100%"  borderRadius="20px" padding="30px 10px"  >
                    <Text fontWeight="600" fontSize="16" margin="10px"> Name: {app.name} </Text>
                    <Text fontWeight="600" fontSize="16" margin="10px"> Qualifications: {q[0].name} </Text>
                    <Text fontWeight="600" fontSize="16" margin="10px"> CPI: {app.cgpa} </Text>
                    <Text fontWeight="600" fontSize="16" margin="10px"> No. of Citations: {app.citations} </Text>
                    <Text fontWeight="bold" color="red" border= "dotted black 2px" borderRadius="5px" fontSize="16" margin="10px"> Hireability Score: {app.hireScore} </Text>
                    <Text fontWeight="600" fontSize="16" margin="10px"> Years of Experience: {app.experiance} </Text>
                    <Button height="25px" m="0px 105px" border="1px solid black"  width="20%"  bg={"#fff"} onClick={handleSubmit}> Open 
                    </Button>
                </Box>
            </Box>
      )
    } else {
      return (
        <Box padding="20px" width="350px" height="325px" display="flex"  borderRadius="20px"
        boxShadow={"5px 5px 10px"}
        margin="30px" bg="#89CFF0">
                <Box width="100%" height="100%"  borderRadius="20px" padding="30px 10px">
                    <Text fontWeight="600" fontSize="16" margin="10px"> Name: {app.name} </Text>
                    <Text fontWeight="600" fontSize="16" margin="10px"> Qualifications: {q[0].name} </Text>
                    <Text fontWeight="600" fontSize="16" margin="10px"> CPI: {app.cgpa} </Text>
                    <Text fontWeight="600" fontSize="16" margin="10px"> No. of Citations: {app.citations} </Text>
                    <Text fontWeight="bold" color='red' border= "dotted black 2px" borderRadius="5px" fontSize="16" margin="10px"> Hireability Score: {app.hireScore} </Text>
                    <Text fontWeight="600" fontSize="16" margin="10px"> Years of Experience: {app.experiance} </Text>
                    <Button height="25px" m="0px 105px" border="1px solid black"  width="20%"  bg={"#fff"} onClick={handleSubmit}> Open 
                    </Button>
                </Box>
            </Box>
      )
    }
  }
}

export default SmallCard