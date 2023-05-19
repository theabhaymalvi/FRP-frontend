import react, { useContext, useState } from "react";
import {
  Box,
  Input,
  Button,
  Text
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";

const EditDetails = () => {
  const { Jwt, User} = useContext(AuthContext);
  const [app,setApp] = useState(null);
  const router = useRouter();

  let editForm = async (e) => {
    console.log("Form Submitted");
    e.preventDefault();
    console.log(app);
    const k = e.target;
    if(k.experiance.value) app.experiance = k.experiance.value;
    if(k.citations.value) app.citations = k.citations.value;
    if(k.publications.value) app.publications = k.publications.value;
    if(k.country.value) app.country = k.country.value;
    if(k.city.value) app.city = k.city.value;
    if(k.state.value) app.state = k.state.value;
    if(k.district.value) app.district = k.district.value;
    if(k.postal.value) app.postal = k.postal.value;
    if(k.pincode.value) app.pincode = k.pincode.value;
    if(k.mob_num.value) app.mob_num = k.mob_num.value;
    console.log(app);
    let response = await fetch(
      "https://recruitsys.herokuapp.com/updateApp?" +
        new URLSearchParams({ jwt: Jwt }),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(app),
      }
    );
    // let data = await response.json()
    console.log(response);
    if (response.status === 200) {
      alert("Updated Application Successfully");
      router.push("/dashboard");
    } else {
      console.log("404");
      alert("Something went wrong !");
    }
  };

  if(User && Jwt) {
    if(app) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
          margin="auto"
          width="100%"
        >
            <form onSubmit={editForm}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            Experience
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter Years of Experience"
                size="sm"
                id="experiance"
                name="experiance"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            Citations
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter Number of Citations"
                size="sm"
                id="citations"
                name="citations"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            Publications
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter Number of Publications"
                size="sm"
                id="publications"
                name="publications"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            Country
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter Country"
                size="sm"
                id="country"
                name="country"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            City
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter City"
                size="sm"
                id="city"
                name="city"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            State
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter State"
                size="sm"
                id="state"
                name="state"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            District
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter District"
                size="sm"
                id="district"
                name="district"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            Postal Code
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter Postal Code"
                size="sm"
                id="postal"
                name="postal"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            Pincode
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter Postal Code"
                size="sm"
                id="pincode"
                name="pincode"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-around"
            margin="auto"
            marginTop="2vh"
          >
            Mobile
            <Box w="60%">
              <Input
                type="text"
                placeholder="Enter Mobile"
                size="sm"
                id="mob_num"
                name="mob_num"
                width="auto"
              ></Input>
            </Box>
          </Box>
          <Button colorScheme="teal" variant="solid" type='submit' sm>
            Submit
          </Button>
          </form>
        </Box>
      );
    } else {
      (async () => {
        const resp1 = await fetch(
          "https://recruitsys.herokuapp.com/getDetails?" +
            new URLSearchParams({ jwt: Jwt }),
          {
            method: "GET",
          }
        );
        let data1 = await resp1.json();
        setApp(data1[0]);
      })();
        return (
            <div>Loading...</div>
        );
    }
  }
};

export default EditDetails;
