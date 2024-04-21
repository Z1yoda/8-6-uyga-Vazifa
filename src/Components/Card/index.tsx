import React, {  useEffect, useState } from "react"; // Import React and useState
import "./index.css"; // Import CSS file


// Import images
import convert from "../../assets/images/currency.svg";
import convertFocus from "../../assets/images/currencyFocus.svg";
import convertHover from "../../assets/images/currencyHover.svg";
import send from "../../assets/images/send.svg";
import sendHover from "../../assets/images/sendHover.svg";
import sendFocus from "../../assets/images/sendFocus.svg";
import charts from "../../assets/images/charts.svg";
import chartsHover from "../../assets/images/chartsHover.svg";
import chartsFocus from "../../assets/images/chartsFocus.svg";
import alert from "../../assets/images/alert.svg";
import alertHover from "../../assets/images/alertHover.svg";
import alertFocus from "../../assets/images/alertFocus.svg";
import arrow from "../../assets/images/arrow.svg";
import infoCircle from "../../assets/images/infoCircle.svg";
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';


// Import Components
import CountrySelect from "../AutoComplate"; 
import { useFetch } from "../../useFetch";

// Type
import { CountryType } from "../../types/type";

const Card: React.FC<{ sendDataToParent: (data: CountryType | null, type: string) => void }> = ({ sendDataToParent }) => {
  const [hovered, setHovered] = useState<string>("");
  const [clicked, setClicked] = useState<string>("");
  const [isConverted, setIsConverted] = useState<Boolean>(false)
  const [isActive, setIsActive] = useState<Boolean>(false)
  const [amountError, setAmountError] = useState<string>("")
    const [countryError, setCountryError]= useState<string>("")
  const [amount, setAmount] = useState<string>()
  const [from, setFrom] = useState<CountryType | null>(null)
  const [to, setTo] = useState<CountryType | null>(null)
  
  const { data, error, isLoading } = useFetch<any>(`https://api.fastforex.io/convert?from=${from?.code}&to=${to?.code}&amount=${amount}&api_key=b36d699f59-57daf5d3ed-sc8wij`);
 
  console.log(error);
  

  function handleArrow() {
    setFrom(to);
    setTo(from);
    
  }

  function validate(amount: string | undefined, from: CountryType | null) {
      if (amount == undefined || amount == "0" || !amount) {
     setIsConverted(false)
        setAmountError("Please enter a valid amount")
        return false
   }
   
   if (from == null || !from) {
      setIsConverted(false)
        setCountryError("Please choose a country")
        return false
   }

   return true
}

useEffect(() => {
    sendDataToParent(from, 'from');
  }, [from]);

  useEffect(() => {
    sendDataToParent(to, 'to');
  }, [to]);

  const handleConvert = () => {
 
    setIsActive(true)
    if (validate(amount, from)) {
      setIsConverted(true)
      setAmountError("")
      
       setCountryError("")
    } 
   
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.value == undefined || e.target.value == "0") {
   setAmountError("Please enter a valid amount")
    } else {
      setAmount(e.target.value)
    
    }
    

  }

  const handleDataFromAutocomplete = (data:CountryType | null) => {
    setFrom(data)
    
  }

   const handleDataToAutocomplete = (data: CountryType | null) => {
    setTo(data)
    
  }
  

  return (
    <div className="card-wrapper shadow mb-5 bg-body-tertiary rounded">
      <ul className="d-flex list-wrapper">
        {/* Convert */}
        <li
          className="convert"
          onMouseEnter={() => setHovered("convert")}
          onMouseLeave={() => setHovered("")}
          onClick={() => setClicked("convert")}
          style={clicked === "convert"
            ? { backgroundColor: "white", color:"#7eb6f3" } : { backgroundColor: "#f0f5fa" }}
        >
          <img
            src={
              hovered === "convert"
                ? convertHover
                : clicked === "convert"
                ? convertFocus
                : convert
            }
            alt="Convert"
          />
          Convert
        </li>

        {/* Send */}
        <li
          onMouseEnter={() => setHovered("send")}
          onMouseLeave={() => setHovered("")}
          onClick={() => setClicked("send")}
          style={clicked === "send"
            ? {backgroundColor:"white", color:"#7eb6f3"} : {backgroundColor:"#f0f5fa"}}
        >
          <img
            src={
              hovered === "send"
                ? sendHover
                : clicked === "send"
                ? sendFocus
                : send
            }
            alt="Send"
          />
          Send
        </li>

        {/* Charts */}
        <li
          onMouseEnter={() => setHovered("charts")}
          onMouseLeave={() => setHovered("")}
          onClick={() => setClicked("charts")}
          style={clicked === "charts"
            ? {backgroundColor:"white", color:"#7eb6f3"} : {backgroundColor:"#f0f5fa"}}
        >
          <img
            src={
              hovered === "charts"
                ? chartsHover
                : clicked === "charts"
                ? chartsFocus
                : charts
            }
            alt="Charts"
          />
          Charts
        </li>

        {/* Alert */}
        <li
          className="alert"
          onMouseEnter={() => setHovered("alert")}
          onMouseLeave={() => setHovered("")}
          onClick={() => setClicked("alert")}
          style={clicked === "alert"
            ? {backgroundColor:"white", color:"#7eb6f3"} : {backgroundColor:"#f0f5fa"}}
        >
          <img
            src={
              hovered === "alert"
                ? alertHover
                : clicked === "alert"
                ? alertFocus
                : alert
            }
            alt="Alert"
          />
          Alert
        </li>
      </ul>
      <div className="container main-wrapper d-flex flex-column">
        <div className="d-flex amount-wrapper">
          <div className="d-flex flex-column ">
            <label htmlFor="amount">Amount</label>
            <Box  sx={{ display: 'flex', flexWrap: 'wrap', marginTop:"-8px" , position:"relative"}}  >
      <div>
        <FormControl  fullWidth sx={{ m: 1 }}>
          <OutlinedInput onChange={handleAmount}
            id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">{from?.symbol}</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </div>
             </Box>

            {
              amountError && (
                <span  className="text-danger">{ amountError}</span>
              )
            }
              {
                isLoading && (
                <div style={{position:"absolute", left:"250px", top:"139px", color:"#b5b9c0"}} className="spinner-border " role="status">
  <span className="visually-hidden">Loading...</span>
</div>
                )
              }
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="from">From</label>
            <CountrySelect selectFrom={from} selectTo={to} sendDataToParent={handleDataFromAutocomplete}></CountrySelect>
            {
              countryError && (
                <span  className="text-danger">{ countryError}</span>
              )
            }
          </div>
          <div>
            <div style={{ width: "49.6px", height: "24px" }}></div>
            <div onClick={handleArrow} className="arrow-wrapper">
              <img src={arrow} alt="" />
            </div>
          </div>
          <div className="d-flex flex-column ">
            <label htmlFor="to">To</label>
            <CountrySelect  selectFrom={from} selectTo={to} sendDataToParent={handleDataToAutocomplete}></CountrySelect>
            {
              countryError && (
                <span  className="text-danger">{ countryError}</span>
              )
            }
          </div>
        </div>
        {
  (isConverted || isActive && data.result) && (
    <div style={{marginTop: "24px"}} className="converted">
      <h3 style={{color:"rgb(92, 102, 123)", fontSize: "16px", padding: "0", fontWeight: "600"}}>
        {data.amount} {from?.name} =
      </h3>
      <h2 style={{ color: "rgb(46, 60, 87)", fontWeight: "600" }} > {(data.result.rate).toString().split('.')[1].substring(0, 3) == 0 ?( (data.result.rate) *  data.amount) : (data.result.rate* data.amount).toFixed(2) } {to?.name}</h2>
      <div style={{color:"rgb(92, 102, 123)"}}>
        <p style={{margin:"0"}}>1 {from?.code} = {data.result.rate} {to?.code}</p>
        <p style={{ margin: "0" }}>1 {to?.code} = {(1 / data.result.rate).toFixed(6)} {from?.code}</p>
      </div>
    </div>
  )
}

{
  (isActive && !isConverted) && (
    <div style={{marginTop: "24px"}} className="converted">
      <h3 style={{color:"rgb(92, 102, 123)", fontSize: "16px", padding: "0" , fontWeight: "600"}}>
        0 {from?.name} =
      </h3>
      <h2 style={{color:"rgb(46, 60, 87)" , fontWeight: "600"}}>0 {to?.name}</h2>
      <div style={{color:"rgb(92, 102, 123)"}}>
        <p style={{margin:"0"}}>1 {from?.code} = {data.result.rate} {to?.code}</p>
        <p style={{margin:"0"}}>1 {to?.code} = 0.000310918 {from?.code}</p>
      </div>
    </div>
  )
}

        <div className="infoBtn">
          <div className="infoWrapp">
            <img src={infoCircle} alt="" />
            <p style={{color:"#5c667b"}}>
              We use the mid-market rate for our Converter. This is for informational purposes only. You won’t receive this rate when sending money.
              <span style={{color:"#2f93e8"}}>Login to view send rates</span>
            </p>
          </div>
          <button disabled={amount == undefined || !amount}  style={{ backgroundColor: amount == undefined || !amount ? "rgba(107, 183, 250, 0.9)" : "rgb(47, 147, 232)" }} onClick={handleConvert} className="convertBtn">Convert</button>
        </div>
      </div>
    </div>
  );
};

export default Card