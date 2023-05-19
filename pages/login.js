import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Button,
  Select,
  Image
} from "@chakra-ui/react";
import Table from "../components/Table"
import AuthContext from "../context/AuthContext";

const arr =
  { 1: "Computer Science and Engineering",
  2: "Communication and Computer Engineering",
  3: "Electronics and Communication Engineering",
  4: "Mechatronics and Mechanical Engineering" }

const Login = () => {
  const { loginUser, preReq, jobs, logout} = useContext(AuthContext);
  const [value,setValue] = useState('default');
  const [unique, setUnique] = useState(null);
  useEffect(()=> {
    logout();
    preReq();
  },[]);
  useEffect(()=> {
    if(jobs) {setUnique([...new Set(jobs.map(item => item.dept))]);}
    console.log(unique);
  },[jobs]);
  if(unique) {
    return (
      <Box display="flex" p='3.125rem 5.625rem' justifyContent="space-evenly">
          <Box
          bg="#71C9CE"
          borderRadius={"20px"}
          boxShadow={"15px  10px 10px #555555"}
          border={"2px solid black"} 
          p='3.125rem' m='1.875rem'
          w="37.5rem" h='28.125rem'>
              <Text fontSize={"2.5rem"} as="b" align="center">
              Faculty Recruitment
            </Text>
              <p>Select Discipline / Broad area :</p>
              <Select borderColor="black"  value={value} onChange={(e) => {
            setValue(e.target.value);}}>
              <option value='default'>Select Option</option>
              {unique
            .map(item => (
              <option key={item} value={item}>{arr[item]}</option>
            ))}
              </Select>
              {value != 'default' && <Table value={value}/> }
          </Box>          
          {/* login box */}
          <Box
            display="flex"
            flexDirection={"column"}
            bg="#71C9CE"
            borderRadius={"20px"}
            boxShadow={"15px  10px 10px #555555"}
            border={"2px solid black"}
            w="37.5rem" h='28.125rem' m="1.875rem"
            padding="3.125rem"
          >   
  
            <form onSubmit={loginUser} width={"100%"}>
            <Text fontSize={"2.5rem"} as="b" align="center">
              Login
            </Text>
              <FormControl width={"100%"}>
                <FormLabel>Email address</FormLabel>
                <Input type="email" backgroundColor="white" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" name="email" />
                <FormLabel>Password</FormLabel>
                <Input type="password" backgroundColor="white" name="password" required/>
              </FormControl>
              <Button  width="100%" marginTop="50px" bg={"rgba(255, 152, 0,0.9)"} type="submit">
                  Submit
                </Button>
            </form>
          </Box>
      </Box>
    )
  }
}

export default Login