import React, { useContext, useState } from 'react'
import AuthContext from "../context/AuthContext";
import UserCard from '../components/UserCard';
import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

function Dashboard() {
  const router = useRouter();
    const { User, Jwt} = useContext(AuthContext);
    const [posts,setPosts] = useState(null);
    if(User && Jwt) {
        if(posts) {
          console.log(posts);
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
             <Text fontWeight="600" fontSize="22" margin="10px"> Name: {User.name}  </Text>
            <Box
              display="flex"
              height="55%"
              minHeight="200px"
              width="100%"
              justifyContent="space-evenly"
              bg="rgba(11, 127, 171, 0.2)"
              borderRadius="20px"
              marginBottom="50px"
            >
              <Grid templateColumns='repeat(3, 1fr)' spacing="10px">
              {posts.map((post) => {
                {
                  return <UserCard key={post.id} name={User.name} post={post}/>;
                }
              })}</Grid>
            </Box>
            </Box>
            );
        } else {
          (async () => {
            const resp1 = await fetch(
              "https://frp-964d.onrender.com/getDetails?" +
                new URLSearchParams({ jwt: Jwt }),
              {
                method: "GET",
              }
            );
            let data1 = await resp1.json();
            setPosts(data1);
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

export default Dashboard;