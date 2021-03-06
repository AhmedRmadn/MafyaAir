import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Component, useState,useEffect } from 'react';
import axios from 'axios'
import  IconButton  from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import DateAdapter from '@mui/lab/AdapterDateFns';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";



export default function BasicTable({history}) {
  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;



  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);
  const deleteconf = (id) => {
    confirmAlert({
      title: 'Confirm to cancel',
      message: 'Are you sure to cancel this ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteFlight(id)
        },
        {
          label: 'No',
        }
      ]
    });
  };


  const[flights,setFlight]=useState([]);

  
  
  const deleteFlight=(id)=>{
    setLoading(true);
    const config = {
      headers:{
        "Content-type":"application/json",
        Authorization: `Bearer ${userInfo.token}`

      }
    }

   
    axios.delete(`http://localhost:8000/flights/cancelBooking/${id}`,config).then(()=>{
      setLoading(false);
      window.location.reload(false);
    })
  }
  
  

  useEffect(() => {
    if(!userInfo ){
      history.push('/homepage')
    }
    else{
      const config = {
      headers:{
        "Content-type":"application/json",
        Authorization: `Bearer ${userInfo.token}`

      }
    }
    
    axios.get(`http://localhost:8000/flights/getBookings/${userInfo._id}`,config).then((res)=>{
      //setLoadingEffect(false);
      setFlight(res.data)
    })

  }
  },[]);
  const comb=(arr)=>{
      var s ="";
      for(let i = 0 ; i <arr.length ;i++){
        s+=arr[i]+" , ";
      }
      return s;
  }



  return (
      <>
          
      {loadingEffect && <Loading />}

      <MainScreen title="My Flights">
    <div style={{position:'absolute',top:'150px'}}>
    <TableContainer  component={Paper} sx={{width:1300}}>
      <Table aria-label="simple table" sx={{width:1300}} >
      <TableHead>
      
          <TableRow style={{ backgroundColor:'black',color:'white'}}>
            <TableCell style={{color:'white'}} align="right" >Flight_No</TableCell>

            <TableCell style={{color:'white'}} align="right" >From</TableCell>
            <TableCell style={{color:'white'}} align="right">To</TableCell>

            <TableCell style={{color:'white'}} align="right">Departure Date</TableCell>
            <TableCell style={{color:'white'}} align="right">Arrival Date</TableCell>

            <TableCell style={{color:'white'}} sx={{width:200}}align="right">First Seats Numbers </TableCell>
            <TableCell style={{color:'white'}} sx={{width:200}}align="right">Business Seats Numbers</TableCell>
            <TableCell style={{color:'white'}} sx={{width:200}} align="right">Economy Seats Numbers</TableCell>

            <TableCell style={{color:'white'}} align="right">Number of children</TableCell>
            <TableCell style={{color:'white'}} align="right">Total Price</TableCell>
            <TableCell style={{color:'white'}} align="right">Total baggage alowance</TableCell>

            <TableCell style={{color:'white'}} align="right">Cancel</TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight,key) => (
            <TableRow
              key={flight._id}
              
            >
              <TableCell align="right">{flight.Flight_No}</TableCell>

              <TableCell align="right">{flight.From}</TableCell>
              <TableCell align="right">{flight.To}</TableCell>

              <TableCell align="right">{formatDate(flight.DateD)}</TableCell>
              <TableCell align="right">{formatDate(flight.DateA)}</TableCell>

              <TableCell align="right">{comb(flight.FirstSeatsNumbers)}</TableCell>


              <TableCell align="right">{comb(flight.BusinessSeatsNumbers)}</TableCell>


              <TableCell align="right">{comb(flight.EconomySeatsNumbers)}</TableCell>

              <TableCell align="right">{flight.NumberOfChildren}</TableCell>
              <TableCell align="right">{flight.TotalPrice}</TableCell>
              <TableCell align="right">{flight.TotalBaggageAlowance}</TableCell>

              <TableCell align="right">
              <Button aria-label="delete" size="small"  onClick={()=> deleteconf(flight._id)}>
                    <DeleteIcon fontSize="small" />
                  </Button>
                  
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </MainScreen>
  
    {loading && <Loading />}
    </>
  );
}
function formatDate(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  var sAMPM = "AM";

  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
      sAMPM = "PM";
      sHour = iHourCheck - 12;
  }
  else if (iHourCheck === 0) {
      sHour = "12";
  }

  sHour = padValue(sHour);

  return sMonth + "/" + sDay + "/" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
}

function padValue(value) {
  return (value < 10) ? "0" + value : value;
}