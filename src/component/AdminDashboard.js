import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import "./adminDashboard.css"
import { BarChart } from '@mui/x-charts';

const AdminDashboard = ({ token }) => {
    const user = useSelector((state) => state.user);
    const authToken = localStorage.getItem("token")
    console.log(user, "user")
    const [data, setData] = useState({});
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://stg.dhunjam.in/account/admin/4`, {
                headers: { Authorization: `Bearer ${token || authToken}` },
            });

            if (response.data.status === 200) {
                setData(response.data.data, "user");
                console.log(response.data.data, "kk")
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    };
    useEffect(() => {
   

        fetchData();
        // eslint-disable-next-line
    }, [token]);
    const [amount, setAmount]=useState()
    const handleAmountChange = (e) => {
        let temp = { ...data }
        temp.amount[e.target.id] = e.target.value
        setData(temp)
        setAmount(temp)
    }

    const handleChange = (e) => {
        let temp = { ...data }
        temp.charge_customers = e.target.value === "true" ? true : false
        setData(temp)
       
    }
    const isSaveButtonDisabled =
        data?.amount?.category_6 < 99 ||
        data?.amount?.category_7 < 79 ||
        data?.amount?.category_8 < 59 ||
        data?.amount?.category_9 < 39 ||
        data?.amount?.category_10 < 19 ||
        data?.charge_customers===false;

    const handleSaveClick = async () => {
        const url = 'https://stg.dhunjam.in/account/admin/4';
    
        // Request body
        const data = {
          amount:amount
        };
    
        try {
          // Make the PUT request
          const result = await axios.put(url, data);
    
          // Handle the response
          console.log(result.data,"updated")
          fetchData()
        //   setData(result?.data?.amount)
          
        } catch (error) {
          // Handle errors
          console.error('Error updating price:', error);
        }
      };
      const isDisabled = !data?.charge_customers;
      const disablenone = !data?.charge_customers;

      // Define styles based on the disabled condition
      const inputStyle = {
        color: isDisabled ? 'gray' : 'inherit', // Text color
        backgroundColor: isDisabled ? 'lightgray' : 'inherit', // Background color
      };
    return (<>

        <div className='admin_main'>
            <h2 id='heading'>{`${data?.name}, ${data?.location} on Dhun Jam`}</h2>
            <div className='content-box'>
                <p className='text_style'>Do you want to change your customers for requesting songs</p>
                <RadioGroup style={{ display: "flex", flexDirection: "row" }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={data?.charge_customers ? true : false}
                    // defaultValue={data?.charge_customers}
                    name="radio-buttons-group"
                    onChange={handleChange}
                >
                    <FormControlLabel value={true} control={<Radio />} label="Yes" style={{ fontFamily: "popen", fontSize: "16px", }} />
                    <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>
            </div>
            <div className='content-box'>
                <p className='text_style'>Custom song request amount-</p>
                <TextField className={`songChange_box ${disablenone? 'disabled':""}`} id='category_6' disabled={disablenone} style={inputStyle} onChange={handleAmountChange} value={data?.amount?.category_6} />
            </div>
            <div className='content-box'>
                <p className='text_style'>Regular song request amounts, from high to low-   </p>
                <div>
                    <TextField className={`songChange_box_2 ${isDisabled ? 'disabledTextField' : ''}`} id='category_7' disabled={isDisabled} onChange={handleAmountChange} value={data?.amount?.category_7}
                     />
                    <TextField style={{ marginLeft: "5px" }} className={`songChange_box_2 ${isDisabled ? 'disabledTextField' : ''}`} id='category_8' disabled={data?.charge_customers ? false : true} onChange={handleAmountChange} value={data?.amount?.category_8} />
                    <TextField style={{ marginLeft: "5px" }} className={`songChange_box_2 ${isDisabled ? 'disabledTextField' : ''}`} id='category_9' disabled={data?.charge_customers ? false : true} onChange={handleAmountChange} value={data?.amount?.category_9} />
                    <TextField style={{ marginLeft: "5px" }} className={`songChange_box_2 ${isDisabled ? 'disabledTextField' : ''}`} id='category_10' disabled={data?.charge_customers ? false : true} onChange={handleAmountChange} value={data?.amount?.category_10} />
                </div>
            </div>
            <div className='main_grpah_content' style={{ display:"flex", flexDirection:"row"}}>
                <p style={{fontSize:"35px"}}>₹</p>
            {
                data?.charge_customers!==false?
          
            <div className='barchart'>
                <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Custom', 'Category 1', 'Category 2', 'Category 3', 'Category 4'] }]}
                    series={[{ data: [ data?.amount?.category_6,data?.amount?.category_7,data?.amount?.category_8,data?.amount?.category_9,data?.amount?.category_10] }]}
                    width={500}
                    height={300}
                />
            </div>
            :""}
            </div>
            <div><button className={`save ${isSaveButtonDisabled ? 'disabled' : ''}`}
                onClick={handleSaveClick}
                disabled={isSaveButtonDisabled}
                >Save</button></div>
        </div>
    </>
        // Implement the Admin Dashboard JSX
    );
};

export default AdminDashboard;
