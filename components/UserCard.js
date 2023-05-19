import { Box, Button, Text } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext';
import moment from 'moment';

function UserCard ({post, name}) {
  let k=null,d=null;
  if(post.schedule) {
    k = post.schedule;
    d = k.split('T')[0].split('-');
  }
    let {jobs, spezs} = useContext(AuthContext);
    let arr = [
      { id: 1, dep: "Computer Science and Engineering" },
      { id: 3, dep: "Electronics and Communication Engineering" },
      { id: 4, dep: "Mechatronics and Mechanical Engineering" },
      { id: 2, dep: "Communication and Computer Engineering" },
    ];

    jobs = jobs.filter(item => item.id === post.job);
    console.log(jobs);
    spezs = spezs.filter(item => item.id === jobs[0].spez_Req);
    console.log(spezs);
    let randi = arr.filter(item => item.id === jobs[0].dept);
      return (
        <Box padding="20px" width="450px" minHeight="375px" display="flex"  borderRadius="20px"
        boxShadow={"5px 5px 10px "}
        bg = '#ffffe5'
        margin="20px"
        border="2px solid black">
            <Box width="100%" height="100%" borderRadius="20px" padding="30px 10px">
                <Text fontWeight="600" fontSize="22" margin="0.625rem">Department: {randi[0].dep} </Text>
                <Text fontWeight="600" fontSize="22" margin="0.625rem">Specialization: {spezs[0].name}  </Text>
                <Text fontWeight="600" fontSize="22" margin="0.625rem">Post: {jobs[0].post} </Text>
                <Text fontWeight="600" fontSize="22" margin="0.625rem">Citations: {post.citations} </Text>
                <Text fontWeight="600" fontSize="22" margin="0.625rem">Experience: {post.experiance} </Text>
                <Text fontWeight="600" fontSize="22" margin="0.625rem">Meet Link: {post.meet} </Text>
                <Text fontWeight="600" fontSize="22" margin="0.625rem">Round No: {post.roundNum}  </Text>
                {k != null && <Box m="10px"><Text fontWeight="600" fontSize="22">Schedule: Date: {d[2]+'/'+d[1]+'/'+d[0]} </Text> 
                <Text fontWeight="600" fontSize="22" ml="6.5rem">Time: {k.split('T')[1].split('Z')[0]} </Text></Box>}
            </Box>
        </Box>
      )
}

export default UserCard