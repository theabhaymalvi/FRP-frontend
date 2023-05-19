import { createContext, useState, useEffect, useContext } from "react";
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'


const AuthContext = createContext();
export default AuthContext;
export const AuthProvider = ({children}) =>{
    
    const [authToken,setAuthToken] = useState(null)
    const [user,setUser] = useState(null)
    const [date,setDate] = useState(new Date())
    const [isAdmin,setIsAdmin] = useState(false);
    const [jobs, setJobs] = useState(null);
    const [spezs, setSpezs] = useState(null);
    const router = useRouter ();
    useEffect(() => {
        if(localStorage && (localStorage.getItem('authTokens'))){
            setAuthToken(JSON.parse(localStorage.getItem('authTokens')))
            setUser(jwt_decode(localStorage.getItem('authTokens')))
        }
      }, []);

      useEffect(() => {
        if(localStorage && localStorage.getItem('jobs') && localStorage.getItem('spezs')){
            setJobs(JSON.parse(localStorage.getItem('jobs')))
            setSpezs(JSON.parse(localStorage.getItem('spezs')))
        }
      }, []);

    let loginUser = async (e) => {
        console.log('Form Submitted')
        e.preventDefault()
        let response = await fetch("https://recruitsys.herokuapp.com/login", {
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json',
            },
            credentials: 'include',
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json();
        console.log(response.status)
        if(response.status === 200){
            setUser(jwt_decode(data.jwt))
            setAuthToken(data.jwt)
            localStorage.setItem('authTokens', JSON.stringify(data.jwt))
            let k = jwt_decode(data.jwt);
            if(k.isCse===true || k.isCce===true || k.isEse===true || k.isMec==true) {
                router.push('/admin')
            } else {
                router.push('/dashboard')
            }
         }else{
            alert("Check Email and Password!")
        }
    }
    let preReq = async() => {
      const resp2 = await fetch(
        "https://recruitsys.herokuapp.com/fetchAllJobs",
        {
          method: "GET",
        }
      );
      let data2 = await resp2.json();
      console.log(data2);
      setJobs(data2);

      const resp3 = await fetch(
        "https://recruitsys.herokuapp.com/fetchAllSpez",
        {
          method: "GET",
        }
      );
      let data3 = await resp3.json();
      console.log(data3);
      setSpezs(data3);

      if(resp2.status === 200 && resp3.status === 200) {
        localStorage.setItem('jobs',JSON.stringify(data2));
        localStorage.setItem('spezs',JSON.stringify(data3));
      }
    }

    let sendForm = async (e) => {
      console.log("Form Submitted");
      e.preventDefault();
      console.log(e.target);
      const jobid = localStorage.getItem('jobid');
      const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        Object.assign(data, {job: jobid, meet: 'https://meet.google.com/bos-etyf-oea'});
        console.log(data);
        let response = await fetch("https://recruitsys.herokuapp.com/registerApp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });
        let res = await response.json();
        if (response.status === 200) {
          alert('Registered Successfully');
          router.push("/login");
        } else {
          alert(res.error);
        }
    };

    


    let createJob = async (e) => {
        console.log("Form Submitted");
        e.preventDefault();
        const formData = new FormData(e.target);
          const data = Object.fromEntries(formData.entries());
          Object.assign(data,{createdby: "dofa"});
          console.log(data);
          let response = await fetch("https://recruitsys.herokuapp.com/createJob?"+new URLSearchParams({ jwt: authToken }), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          });
          let res = await response.json()
          console.log(response);
          if (response.status === 200) {
            console.log('Job Created');
            preReq();
            alert('Job Created!');
          } else {
            alert(res.error);
          }
      };

    const logout = async() => {
        setAuthToken(null);
        setUser(null);
        localStorage.clear();
        router.push("/login")
    }
    const updateDate = (e) => {
        setDate(e)
        console.log(e)
    }

    let contextData ={
        loginUser:loginUser,
        sendForm:sendForm,
        preReq:preReq,
        User:user,
        logout:logout,
        Jwt:authToken,  
        updateDate:updateDate,  
        date:date,
        jobs: jobs,
        spezs: spezs,
        createJob: createJob
    }
    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}