import { Box, Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import JobCard from "../components/JobCard";
import AuthContext from "../context/AuthContext";

const Admin = () => {
  const [dep, setDep] = useState(null);
  const [posts,setPosts] = useState(null);
  const [postid, setPostid] = useState(null);
  const {User, Jwt, jobs, spezs, createJob } = useContext(AuthContext);
  let options = null;

  let addPost = async(e) => {
    e.preventDefault();
    let resp = await fetch("https://frp-964d.onrender.com/addPost?"+new URLSearchParams({ jwt: Jwt }), {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({'name':e.target.post.value})
        });
    let data = await resp.json();
    console.log(data);
    if(resp.status === 200) {
      const resp = await fetch(
        "https://frp-964d.onrender.com/getPosts?"+new URLSearchParams({ jwt: Jwt }),
        {
          method: "GET",
        }
      );
      let data = await resp.json();
      setPosts(data);
      alert('Post Added!');
    } else {
      alert('Something went wrong!');
    }
  }

  let delPost = async(e) => {
    e.preventDefault();
    let resp = await fetch("https://frp-964d.onrender.com/deletePost?"+new URLSearchParams({ jwt: Jwt }), {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({'name': postid})
        });
    let data = await resp.json();
    console.log(data);
    if(resp.status === 200) {
      const resp = await fetch(
        "https://frp-964d.onrender.com/getPosts?"+new URLSearchParams({ jwt: Jwt }),
        {
          method: "GET",
        }
      );
      let data = await resp.json();
      setPosts(data);
      alert('Post Deleted!');
    } else {
      alert('Something went wrong!');
    }
  }

  if(dep) {
    options = spezs.filter(p => p.dept === parseInt(dep))
            .map((p) => <option key={p.id} value={p.id}>{p.name}</option>)
            console.log(options);
  }
  
  if(User && Jwt) {
    if(posts) {
      console.log(posts);
    return (
      <Box display="flex" padding="10px" justifyContent="center">
        <Box
          bg="#fff"
          width="50%"
          minHeight="600px"
          borderRadius="20px"
          margin="10px"
          boxShadow={"5px 5px 10px"}
        >
          <Box width="100%" height="60px" bg="#71C9CE" display="flex" justifyContent="center" textAlign="center" w="100%" borderRadius="20px 20px 0px 0px" p='15px'>
        <Text fontWeight="600" fontSize="22" textAlign="center" w="100%">Job Openings</Text>
    </Box>
    {User.isCse===true && <Box padding="10px">
    <Text fontWeight="600" fontSize="20" margin="0px 20px">CSE Department</Text>
    {jobs
            .filter(item => item.dept === 1)
            .map(job => (
              <JobCard key={job.id} job={job} />
            ))}
    </Box>}
    {User.isCce===true && <Box padding="10px">
    <Text fontWeight="600" fontSize="20" margin="0px 20px">CCE Department</Text>
    {jobs
            .filter(item => item.dept === 2)
            .map(job => (
              <JobCard key={job.id} job={job} />
            ))}
    </Box>}
    {User.isEse===true && <Box padding="10px">
    <Text fontWeight="600" fontSize="20" margin="0px 20px">ECE Department</Text>
    {jobs
            .filter(item => item.dept === 3)
            .map(job => (
              <JobCard key={job.id} job={job} />
            ))}
    </Box>}
    {User.isMec===true && <Box padding="10px">
    <Text fontWeight="600" fontSize="20" margin="0px 20px">MEC Department</Text>
    {jobs
            .filter(item => item.dept === 4)
            .map(job => (
              <JobCard key={job.id} job={job} />
            ))}
    </Box>}
        </Box>
        <Box
          bg="#fff"
          width="50%"
          minHeight="600px"
          borderRadius="20px"
          margin="10px"
          boxShadow={"5px 5px 10px"}
          display="flex"
          flexDirection="column"
        >
          <Box width="100%" height="60px" bg="#71C9CE" borderRadius="20px 20px 0px 0px" display="flex" justifyContent="center" textAlign="center" w="100%" p='15px'>
          <Text fontWeight="600" fontSize="22" textAlign="center" w="100%">
            Create Job{" "}
          </Text>
          </Box>
          <form onSubmit={createJob}>
          <Flex m="20px"> <Text fontWeight="600" fontSize="20">Department</Text>
          <Box w="300px" margin="0px 105px"><Select borderColor="black"  placeholder="Please Select" name="dept" onChange={(e) => setDep(e.target.value)} required>
            {User.isCse === true && <option value="1" key="title1" name="cse">Computer Science and Engineering</option>}
            {User.isEse === true && <option value="3" key="title2" name="ece">Electronics and Communication Engineering</option>}
            {User.isMec === true && <option value="4" key="title3" name="me">Mechatronics and Mechanical Engineering</option>}
            {User.isCce === true && <option value="2" key="title4" name="cce">Communication and Computer Engineering</option>}
          </Select> </Box>
          </Flex>
          <Flex m="20px"> <Text fontWeight="600" fontSize="20">Post</Text>
          <Box w="440px" m="0px 0px 0px 170px" display="flex" justifyContent="space-between"><Select borderColor="black" placeholder="Please Select" onChange={(e) => setPostid(e.target.value)} name="post" required>
            {
              posts.map(item => <option key={item.id} id='opt'>{item.name}</option>)
            }
          </Select><Button ml="10px" width="40%" onClick={(e) => delPost(e)} bg={"rgba(244, 67, 54,0.9)"}> Delete</Button></Box>
          </Flex>
          <Flex m="20px"><Text fontWeight="600" fontSize="20">Specialization</Text>
          <Box w="300px" margin="0px 85px"><Select borderColor="black"  placeholder="Please Select" name="spez_Req" required>
            {options}
          </Select></Box>
          </Flex>
          <Flex m="20px"> <Text fontWeight="600" fontSize="20">Is PhD Required?</Text>
          <Box w="300px" margin="0px 50px"><Select borderColor="black"  placeholder="Please Select" name="phd_Req" required>
          <option value="true" name="true">Yes</option>
            <option value="false" name="no">No</option>
          </Select></Box>
          </Flex>
          <Flex m="20px"><Text fontWeight="600" fontSize="20">Min. CGPA Required</Text>
          <Box w="300px" margin="0px 25px"><Input type="number" borderColor="black" min="0" max="10" step="any" name="cgpa_Req" required></Input></Box>
          </Flex>
          <Button  width="60%" margin="20px 160px" bg={"#87CDF6"} type="submit"> Create 
          </Button>
          </form>
          {User.isCse === true && User.isCce===true && User.isEse===true && User.isMec===true && <form onSubmit={addPost}>
          <Flex m='20px'><Text fontWeight="600" fontSize="20">Add Post</Text>
          <Box w="200px" ml='130px' mr='40px'><Input type="text" borderColor="black" name="post"></Input></Box>
          <Button  width="20%" bg={"#87CDF6"} type='submit'> Add</Button>
          </Flex>
          </form>}
        </Box>
      </Box>
    );
    } else {
      (async() => {
        const resp = await fetch(
          "https://frp-964d.onrender.com/getPosts?"+new URLSearchParams({ jwt: Jwt }),
          {
            method: "GET",
          }
        );
        let data = await resp.json();
        console.log(data);
        setPosts(data);
      })();
    }
  } else {
    return <div> Not Authenticated! </div>
  }
};

export default Admin;
