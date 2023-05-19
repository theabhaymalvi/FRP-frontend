import { Box, Button, Input, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';

const qual = [
  { id: "1", name: "B.A."},
  { id: "2", name: "B.Arch."},
  { id: "3", name: "BSc"},
  { id: "4", name: "MSc"},
  { id: "5", name: "B.Tech"},
  { id: "6", name: "M.Tech"},
  { id: "7", name: "PhD"}
]

const Application = () => {
  const {spezs, Jwt} = useContext(AuthContext);
  let [app,setApp] = useState(null);
  const [cnt, setCnt] = useState(null);
  const [sch, setSch] = useState(null);
  const [meet,setMeet] = useState(null);
  const [flag,setFlag] = useState(false);
  async function nextRound(jwt,id) {
    const response = await fetch(
        "https://recruitsys.herokuapp.com/nextRound?" +
          new URLSearchParams({
            jwt: jwt
          }),
        {
          method: "POST",
          headers:{
            'Content-Type' : 'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({'id': id})
        }
      );
      console.log(response);
      if(response.status === 200) {
        console.log('Next Round');
        setCnt(cnt+1);
      } else {
        console.log('Something went wrong');
      }
  }

  async function Schedule(jwt,id, datetime) {
    
    console.log(datetime);

    const response = await fetch(
        "https://recruitsys.herokuapp.com/schedule?" +
          new URLSearchParams({
            jwt: jwt
          }),
        {
          method: "POST",
          headers:{
            'Content-Type' : 'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({'id': id, 'datetime': datetime})
        }
      );
      console.log(response);
      if(response.status === 200) {
        setSch(datetime);
        alert('Scheduled');
        console.log('Scheduled');
      } else {
        console.log('Something went wrong');
      }
  } 

  async function sendMail(jwt,id, meet) {
    const response = await fetch(
        "https://recruitsys.herokuapp.com/sendMail?" +
          new URLSearchParams({
            jwt: jwt
          }),
        {
          method: "POST",
          headers:{
            'Content-Type' : 'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({'id': id, 'meet': meet})
        }
      );
      console.log(response);
      if(response.status === 200) {
        setMeet(meet);
        alert('Sent Mail!');
      } else {
        alert('Authentication Failed!');
      }
  }

    useEffect(() => {
        if(localStorage && localStorage.getItem('app')){
            setApp(JSON.parse(localStorage.getItem('app')))
        }
      }, []);
      useEffect(() => {
        if(app) {
          setCnt(app.roundNum);
          setSch(app.schedule);
          setMeet(app.meet);
        }
      }, [app]);
  if(app) {
    console.log(app);
    let d = null;
    if(sch) {
      d = sch.split('T')[0].split('-');
    }
    console.log(new Date().toISOString().split('T')[0]+'T' + new Date().toISOString().split('T')[1].slice(0,5));

    const spez = spezs.filter(item => item.id === parseInt(app.spez));
    const q = qual.filter(k => k.id === app.qualifications);
    return (
      <Box width="80%" height="90%" display="flex" borderRadius="20px" m='1rem 10rem' padding="30px">
        <Box width="50%" bg='  #a9d7e8'  borderRadius="20px" mr="25px" p="10px" boxShadow={"5px 5px 10px"}>
                    <Text fontWeight="600" fontSize="22" margin="10px"> Name: {app.name} </Text>
                    <Text fontWeight="600" fontSize="22" margin="10px"> Qualifications: {q[0].name} </Text>
                    <Text fontWeight="600" fontSize="22" margin="10px"> Specialization: {spez[0].name} </Text>
                    <Text fontWeight="600" fontSize="22" margin="10px"> CPI: {app.cgpa} </Text>
                    <Text fontWeight="bold" color='red' border= "dotted black 2px" borderRadius="5px" fontSize="22" margin="10px"> Hireability Score: {app.hireScore} </Text>
                    <Text fontWeight="600" fontSize="22" margin="10px"> No. of Publications: {app.publications} </Text>
                    <Text fontWeight="600" fontSize="22" margin="10px"> No. of Citations: {app.citations} </Text>
                    <Text fontWeight="600" fontSize="22" margin="10px"> Years of Experience: {app.experiance} </Text>
                    {cnt <= 4 && <Box>
                    <Text fontWeight="600" fontSize="22" margin="10px"> Round Num: {cnt} </Text>
                    {sch && <Text fontWeight="600" fontSize="22" margin="10px"> Schedule: Date: {d[2]+'/'+d[1]+'/'+d[0]} Time: {sch.split('T')[1].split('Z')[0]} </Text>}
                    <Text fontWeight="600" fontSize="22" margin="10px"> Meet Link: {meet} </Text>
                    <Button  width="60%" margin="50px 100px" bg={"#3A8891"} onClick={() => nextRound(Jwt,app.id)}> Next Round 
                    </Button>
                    </Box>}
                    {cnt > 4 && <Box>
                    <Text fontWeight="600" fontSize="22" margin="10px"> Approved! </Text>
                    </Box>}
                </Box>
          <Box>
          <Box bg='  #a9d7e8' boxShadow={"5px 5px 10px"} borderRadius="20px" m="10px" h="45%" w='100%' p="20px">
          <form>
          <Text fontWeight="600" fontSize="22" margin="10px"> Schedule Date/Time</Text>
          <Input type="datetime-local" name='datetime' 
          min = {new Date().toISOString().split('T')[0]+'T' + new Date().toISOString().split('T')[1].slice(0,5)} 
          id='epic' />
          <Button  width="70%" margin="50px 50px" bg={"#3A8891"} onClick={() => Schedule(Jwt,app.id,document.getElementById('epic').value)}> Schedule </Button>
          </form>
          </Box>
          <Box bg='  #a9d7e8' boxShadow={"5px 5px 10px"} borderRadius="20px" m="30px 10px 0px 10px" h="45%" w="100%" p="20px">
          <form>
          <Box display="flex" flexDirection="column" justifyContent="center">
          <Text fontWeight="600" fontSize="22" margin="10px" > Meet Link </Text>
          <Input type="text" m="10px" w="80%" id="meet" borderColor="black" required/>
          {/* <Button border="2px solid black"  width="30%" margin="10px 40px" bg={"#2cc0f5"} onClick={() => setFlag(false)}> Edit </Button> */}
          {sch && <Button  width="70%" margin="40px 50px" bg={"#3A8891"} onClick={() => sendMail(Jwt,app.id,document.getElementById('meet').value)}> Send Email </Button>}
          </Box>
          </form>
          </Box>
          </Box>
        </Box>
      )
  } else {
    <div>Loading...</div>
  }
}

export default Application