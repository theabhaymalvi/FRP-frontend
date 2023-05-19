import React, { useContext, useEffect, useState } from "react";
import { Select, Box, Flex, Input, Button, Text, Radio, RadioGroup } from "@chakra-ui/react";
import regStyles from "../styles/Form.module.css";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

const Reg = () => {
  const {sendForm, jobs, spezs} = useContext(AuthContext);
  const [pass,setPass] = useState(null);
  const [phdReq, setphdReq] = useState(false);
  const [cgpa,setCgpa] = useState(0.00);
  const [isError, SetIsError] = useState(true)
  const [isAge, SetIsAge] = useState(true);
  const router = useRouter();
  
  const arr ={
    1: "Computer Science and Engineering",
    3: "Electronics and Communication Engineering",
    4: "Mechatronics and Mechanical Engineering",
    2: "Communication and Computer Engineering" }

  const qual = [
    { id: "1", name: "B.A."},
    { id: "2", name: "B.Arch."},
    { id: "3", name: "BSc"},
    { id: "4", name: "MSc"},
    { id: "5", name: "B.Tech"},
    { id: "6", name: "M.Tech"}
  ]

  var curr_date=new Date().toLocaleDateString();
  let curr_year=parseInt(curr_date.slice(-4));

  const checkPass = (e) => {
    if(e.target.value === pass) {
      SetIsError(false);
    } else SetIsError(true);
  }

  const checkAge = (e) => {
    const age = parseInt(document.getElementById('age').value);
    const dob = parseInt(document.getElementById('dob').value.split('-')[0]);
    console.log(dob);
    const error = document.getElementById('error');
    if(age === curr_year-dob || age === curr_year-dob-1)
    {
      error.textContent = '';
      SetIsAge(false);
    } else {
      error.textContent = 'Enter Correct Age';
      SetIsAge(true);
    }
  }
  
  if(jobs) {
    const nhp = (e) => {
      const d = jobs.filter(k => (k.dept === parseInt(router.query.dep) && k.post === router.query.post && k.spez_Req=== parseInt(e.target.value)))
      if(d.length) {
        if(d[0].phd_Req === true) setphdReq(true);
        else setphdReq(false);
        localStorage.setItem('jobid',d[0].id);
        setCgpa("Required CPI: "+d[0].cgpa_Req);
      }
    }
    const v = [...new Set(jobs.filter(k => (k.dept === parseInt(router.query.dep) && k.post === router.query.post)))];
    return (
      <Box display="flex" justifyContent="center">
        <Box w='60%' h='80%'  bg="#ffffe5" m="20px"
            boxShadow="15px  10px 10px #555555"
            borderRadius="20px" border="2px solid black">
        <Box p="10px 20px">
        <Text fontWeight="bold" fontSize="20" margin="0.5rem"> Name of the Post : {router.query.post} </Text>
        <Text fontWeight="bold" fontSize="20" margin="0.5rem"> Department: {arr[router.query.dep]} </Text>
        </Box>
        <form onSubmit={sendForm} id="form"  className={regStyles.form}>
          <Box bg="#89CFF0" p='10px 20px'>
          <Text fontSize={25}>Personal Details</Text> 
          </Box>
          <Box p='2rem'>
          <Flex m='5px'>Specialization
          <Box w='60%' ml='5.3125rem'>
          <Select placeholder="Please Select" borderColor="black" name="spez" size="sm" onChange={(e) => nhp(e)} required>
            {v
              .map(p => (
                spezs.filter(item => item.id === p.spez_Req).map(val => <option key={val.id} value={val.id}>{val.name}</option>)
              ))}
          </Select> </Box> </Flex>
          <Flex m='5px'>Title
          <Box w='60%' ml='9.6875rem'><Select borderColor="black" placeholder="Please Select" size="sm"  name="title" required>
            <option value="2" key="title1" name="mr">Mr.</option>
            <option value="1" key="title2" name="mrs">Mrs.</option>
            <option value="4" key="title3" name="ms">Ms.</option>
            <option value="3" key="title4" name="dr">Dr.</option>
          </Select> </Box>
          </Flex>
          <Flex m='5px'>Name
          <Box w='60%' ml='8.9375rem'><Input type="text" borderColor="black" placeholder="Enter Name" size="sm" id="name" name="name" required></Input></Box>
          </Flex>
          <Flex m='5px'> Date of Birth 
          <Box w='60%' ml='5.9375rem'><Input type="date" min='1960-01-01' max = {new Date().toISOString().split("T")[0]} id='dob' borderColor="black" size="sm" name="dob" required></Input></Box>
          </Flex>
          <Flex m='5px'>Age
          <Box w='60%' ml='9.6875rem'><Input type="text" id="age" onChange={checkAge} borderColor="black" placeholder="Enter Age" size="sm" name="age" required></Input><span color="red" id="error"></span></Box>
          </Flex>
          <Flex m='5px'>Gender
          <Box w='60%' ml='8.125rem'><Select placeholder="Please Select" borderColor="black" size="sm" name="gender" required>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Select></Box>
          </Flex>
          <Flex m='5px'>Father&#39;s Name
          <Box w='60%' ml='5rem'><Input type="text" borderColor="black" placeholder="Father's Name" size="sm" name="father" required></Input></Box>
          </Flex>
          <Flex m='5px'>Mother&#39;s Name
          <Box w='60%' ml='4.8125rem'><Input type="text" borderColor="black" placeholder="Mother's Name" size="sm" name="mother" required></Input></Box>
          </Flex>
          <Flex m='5px'>Category
          <RadioGroup colorScheme="green" m='0px 6.875rem' >
          <Radio id="st" value="3" name="category" m='0px 10px'>ST</Radio> 
          <Radio id="sc" value="2" name="category" m='0px 10px'>SC</Radio>
          <Radio id="obc" value="4" name="category" m='0px 10px'>OBC</Radio>
          <Radio id="gen" value="1" name="category" m='0px 10px'>GEN</Radio>
          </RadioGroup>
          </Flex>
          <Flex m='5px'>Nationality
          <Box w='60%' ml='6.875rem'><Input type="text" borderColor="black" placeholder="Nationality" size="sm" name="Nationality" required></Input></Box>
          </Flex>
          </Box>
          <Box bg="#89CFF0" p='10px 20px'>
          <Text fontSize={25}>QUALIFICATION AS PER ELIGIBILITY CRITERIA</Text>
          </Box>
          <Box p='2rem'>
          <Flex m='5px'>Educational Qualifications
          <Box w='60%' ml='3.125rem'><Select size="sm" borderColor="black" placeholder="Please Select" name="qualifications" required>
            {phdReq===false && qual.map(k => <option key={k.id} value={k.id}>{k.name}</option>)}
            <option key={7} value={7}>PhD</option>
          </Select></Box>
          </Flex>
          <Flex m='5px'> CGPA
          <Box w='60%' ml='11.875rem'><Input type="number" borderColor="black" placeholder={cgpa} min='0' max='10' size="sm" step='0.01' name="cgpa" required /></Box>
          </Flex>
          <Flex m='5px'> No. of Citations
          <Box w='60%' ml='7.8125rem'><Input type="number" min='0'  max='200' borderColor="black" placeholder="No. of Citations, Max: 200" size="sm" name="citations" required/></Box>
          </Flex>
          <Flex m='5px'> No. of Publications
          <Box w='60%' ml='6.25rem'><Input type="number" min='0' max='50' borderColor="black" placeholder="No. of Publications, Max: 50" size="sm" name="publications" required/></Box>
          </Flex>
          <Flex m='5px'> Experience
          <Box w='60%' ml='9.6875rem'><Input type="number" min='0' max='30' borderColor="black" placeholder="Enter Experience, Max: 30" size="sm" name="experiance" required /></Box>
          </Flex>
          </Box>
          <Box bg="#89CFF0" p='10px 20px'>
          <Text fontSize={25}>COMMUNICATION</Text>
          </Box>
          <Box p='2rem'>
          <Flex m='5px'>Postal Address 
          <Box w='60%' ml='5.625rem'><Input type="textarea" borderColor="black" placeholder="Enter Postal Address" size="sm" name="postal" required /></Box>
          </Flex>
          <Flex m='5px'>Country
          <Box w='60%' ml='8.75rem'><Input type="text" borderColor="black" placeholder="Enter Country" size="sm" name="country" required /></Box>
          </Flex>
          <Flex m='5px'>State 
          <Box w='60%' ml='9.875rem'><Input type="text" borderColor="black" placeholder="Enter State" size="sm" name="state" required /></Box>
          </Flex>
          <Flex m='5px'>City
          <Box w='60%' ml='10.5rem'><Input type="text" borderColor="black" placeholder="Enter City" size="sm" name="city" required /></Box>
          </Flex>
          <Flex m='5px'>District
          <Box w='60%' ml='9.0625rem'><Input type="text" borderColor="black" placeholder="Enter District" size="sm" name="district" required /></Box>
          </Flex>
          <Flex m='5px'>Pincode
          <Box w='60%' ml='8.4375rem'><Input type="text" borderColor="black" pattern="[1-9]{1}[0-9]{5}" placeholder="Enter Pincode" size="sm" name="pincode" maxlength="6" required /></Box>
          </Flex>
          <Flex m='5px'>Email
          <Box w='60%' ml='153px'><Input type="email" borderColor="black" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="Enter Email" size="sm" name="email" required /> </Box>
          </Flex>
          <Flex m='5px'>Mobile No
          <Box w='60%' ml='120px'><Input type="text" borderColor="black" placeholder="Enter Mobile.No" size="sm" name="mob_num" pattern="[1-9]{1}[0-9]{9}" maxlength="10" required /> </Box>
          </Flex>
          <Flex m='5px'>Password
          <Box w='60%' ml='7.625rem'><Input type="password" borderColor="black" placeholder="Enter Password" maxlength="20" id='pass' size="sm" name="password" required onChange={() => setPass(document.getElementById('pass').value)} /></Box>
          </Flex>
          <Flex m='5px'>Re-type Password
          <Box w='60%' ml='3.875rem'><Input type="password" borderColor="black" id='retype' placeholder="Re-type Password" size="sm" name="password" required onChange={(e) => checkPass(e)} />
          {isError && <Text color='red'>Password doesnot match!</Text>}
          </Box>
          </Flex>
          {!isError && !isAge && <Button border="2px solid black"  width="60%" mt="40px" ml='150px' bg={"#89CFF0"} type="submit"> Submit 
          </Button>}
          </Box>
        </form>
        </Box>
      </Box>
    );
  }
};

export default Reg;
