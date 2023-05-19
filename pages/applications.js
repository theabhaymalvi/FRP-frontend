import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';
import SmallCard from '../components/SmallCard';
import { useRouter } from 'next/router';
import { Box, Grid, Select, Text } from '@chakra-ui/react';

const Applications = () => {

    const router = useRouter();
    const [apps, setApps] = useState(null);
    const [id, setId] = useState(router.query.id);
    useEffect(() => {
        if(localStorage && localStorage.getItem('jobId')){
            setId(JSON.parse(localStorage.getItem('jobId')))
        }
      }, []);
    const Sort = (e) => {
      let choice = e.target.value;
      if(choice === '1')
      setApps([...apps].sort((a, b) => b.hireScore - a.hireScore));
      else if(choice === '2')
      setApps([...apps].sort((a, b) => b.cgpa - a.cgpa));
      else if(choice === '3')
      setApps([...apps].sort((a, b) => b.citations - a.citations));
      else
      setApps([...apps].sort((a, b) => b.experiance - a.experiance));
    }
    let {User, Jwt} = useContext(AuthContext);
    if(User && Jwt) {
        if(apps) {
            return (
              <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            width="100%"
            height="100%"
            padding="50px"
            justifyContent="center"
          >
            <Box display="flex" justifyContent="center">
            <Text fontWeight="bold" fontSize="26" ml="40.625rem" textAlign="center"> Applications </Text>
            <Text m='0.4375rem' ml="21.875rem" fontSize="18" textAlign="center"> Sort by: </Text>
            <Box m='0.3125rem'><Select placeholder="Please Select" size="sm" onChange={Sort}>
            <option value="1" key="1" >Hireability Score</option>
            <option value="2" key="2" >CGPA</option>
            <option value="3" key="3" >No. of Citations</option>
            <option value="4" key="4" >Yrs of Experience</option>
            </Select> </Box>
            </Box>
            <Box
              display="flex"
              height="55%"
              minHeight="200px"
              width="100%"
              justifyContent="space-evenly"
              bg="#70717220"
              borderRadius="20px"
              marginBottom="50px"
            >
            <Grid templateColumns='repeat(3, 1fr)' spacing="10px">
              {apps.map((app) => {
                {
                  return <SmallCard key={app.id} name={User.name} app={app}/>;
                }
              })}
            </Grid>
            {
              apps.length === 0 &&  <Text fontWeight="bold" fontSize="26" margin="10px" textAlign="center"> No Applicants  </Text>
            }
            </Box>
            </Box>
            );
        } else {
          (async () => {
            const resp1 = await fetch(
              "https://recruitsys.herokuapp.com/fetchApp?" +
                new URLSearchParams({ jwt: Jwt, id: id }),
              {
                method: "GET",
              }
            );
            let data1 = await resp1.json();
            console.log(data1);
            setApps(data1);
          })();
            return (
                <div>Loading...</div>
            );
        }
    } else {
        return (
            <div>Not Authenticated!</div>
          )
    }
}

export default Applications