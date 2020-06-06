/* Global Variables */
const myAPI = "&appid=799e56cf0be5e30fbfd7891d2e05ae27&units=metric";
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="


const button = document.getElementById("generate");
button.addEventListener("click" , perfromAction)

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '.'+ d.getDate()+'.'+ d.getFullYear();


function perfromAction(){

    const zipcode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    console.log(`zipcode: ${zipcode} , feelings : ${feelings}`);
    let url = `${baseURL}${zipcode},${myAPI}` 
    retrieveData(url)
    .then(function(data){
      console.log(data.name , data.main.temp);
      postData("/addData" , {temperature : data.main.temp, date: newDate , userResponse: feelings});
      updateUI()
    })
};


// Async GET from API
const retrieveData = async (url='') =>{ 
  const request = await fetch(url);
  try {
  const allData = await request.json();
  console.log(allData);
  return allData;
  }
  catch(error) {
    console.log("error", error);
    
  }
};


// update User interface

const updateUI = async ()=>{
  const response = await fetch("/get");
  // console.log(response);
  try {
    const allData = await response.json()
    console.log("alldata" , allData)
    const temp = document.getElementById("temp").innerHTML = `${allData.temperature} Celcius`;
    const date = document.getElementById("date").innerHTML = allData.date;
    const content = document.getElementById("content").innerHTML = allData.userResponse;

  } catch(error){
    console.log("Error" , error)

  }

};

const postData = async ( url = '', data = {})=>{
    // console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

// postData("/addData" , {temperature : "Cat" , date: "meow" , userResponse: ""})