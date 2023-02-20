/* Global Variables */
const apiKey = '5beb43e13dc3fa8be428191e6e50a00c&units=metric';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const getW = async (baseURL, zip, key)=>{
  const res = await fetch(`${baseURL}${zip}&APPID=${key}`)
  try {
    const nData = await res.json();
    console.log(nData);
    return nData;
  }catch(e) {
  console.log("ERROR", e);
  }

}

const postW = async ( url,data)=>{

    const res = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },        
      body: JSON.stringify(data), 
    });
        try {
            const nData = await res.json();
            return nData;
        }
        catch (e) {
           console.log("ERROR", e);
         
        }
    }

const updatainfo =async()=>{
    const req = await fetch('/all');
    try {
        const all_Data = await req.json();
        document.getElementById('date').innerHTML    = all_Data.date;
        document.getElementById('temp').innerHTML    = Math.round(all_Data.temp)+ 'degrees';
        document.getElementById('content').innerHTML = all_Data.content;
        
    } catch (e) {
        console.log('ERROR', e);
    }
}  

document.getElementById('generate').addEventListener('click',(e)=>{
    e.preventDefault()
   var zipCode = document.getElementById('zip')
   var content_text = document.getElementById('feelings')
   if (zipCode.value.length ===0 ||content_text.value.length===0 ){
    alert("Please enter data below!")
    return
   }
   var content_text = content_text.value
    getW(baseURL,zipCode.value,apiKey).then((nData)=>{
       postW('/add',{temp:nData.main.temp,date:newDate,content:content_text})
    }).then(function(nDate){
        updatainfo()
    })
    .catch(function(ERROR){
        console.log(ERROR)
    });
  
  document.querySelector('form').reset();  

});    