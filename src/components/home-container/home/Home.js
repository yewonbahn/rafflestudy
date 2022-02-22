import React, { useState, useEffect } from 'react'
import { TextField ,StylesProvider, Chip, Container } from '@material-ui/core'
import './Home.css'
import axios from 'axios';
import * as Web3 from 'web3'
import { OpenSeaPort, Network } from 'opensea-js'

function Home() {
  const [address, Setaddress] = useState('')
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [trlength, setTrlength] = useState(0);
  const Transaction = Array.from(Array(trlength), () => new Array(2));
  async function searchApi() {

    const url = 'https://api.etherscan.io/api?module=account&action=tokennfttx&address='+address+'&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=YourApiKeyToken';
    await axios.get(url)
    .then(function(response) {
      // setData(parseInt(response.data.result)*0.000000000000000001);
        console.log(response.data);
        console.log(response.data.result.length);
     setTrlength(response.data.result.length);
          
        for (var i = 0; i < response.data.result.length; i++) { // 배열 arr의 모든 요소의 인덱스(index)를 출력함.
          if(Transaction.includes(response.data.result[i].contractAddress))
          {
            
          }
          Transaction[i][0]=response.data.result[i].contractAddress;
    
      
          // console.log(response.data.result[i].contractAddress);
          var timestamp = parseInt(response.data.result[i].timeStamp);
      
          const date = new Date(timestamp*1000);
          // console.log(date.toLocaleDateString("en-US").slice(0,9));
          Transaction[i][1]=date.toLocaleDateString("en-US").slice(0,9);
        }

   
       
       } )
    .catch(function(error) {
        console.log("실패");
    })
    for (var i = 0; i < trlength; i++) { // 배열 arr의 모든 요소의 인덱스(index)를 출력함.
      console.log(Transaction[i][0]);
      console.log(Transaction[i][1]);
   

  }
}

// async function searchApi2() { //페이퍼핸드

//   const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io')

//   const seaport = new OpenSeaPort(provider, {
//     networkName: Network.Main,
//     apiKey: YOUR_API_KEY
//   })

//   const asset: OpenSeaAsset = await seaport.api.getAsset({
//     tokenAddress, // string
//     tokenId, // string | number | null
//   })

// }
  const handleSubmit = async (event) => {event.preventDefault()
    searchApi();
  }

  return (
    <Container>
      
   <TextField 
    label="Address"
    style={{height:300, width:500,position:'relative',top:100,left:200, 
   textAlign:"center"}}
   defaultValue={address}
   onChange={(e) => Setaddress(e.target.value)}>gi</TextField>
   <button
   style={{height:50,width:150,position:'relative',top:100,left:250, 
   textAlign:"center"}}
   size="large"
   variant="contained"
   color="primary"
   onClick={handleSubmit}
 >
   Check your hands!
 </button>
 
    {data && <textarea  style={{height:300, width:500,position:'relative',top: -100,left:200, 
   textAlign:"center"}} rows={7} value={JSON.stringify(data, null, 2)} readOnly={true} />
    }

    {score>0 ? 
    <h2>Diahands</h2>: 
    (  <h2>paper hands</h2>
    )
    }
   

   
   </Container>
   )
}

export default Home
