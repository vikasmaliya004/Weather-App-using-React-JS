import React, {useState, useEffect} from "react";
 import axios from 'axios'
const SearchWeather = () => {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;
  useEffect(() => {
    const fetchWeather = () => {
      // let temp=0;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f293878f6395a4d11d094395c659793b`).then ((response)=> {
        // console.log(response.data)
        if(componentMounted){
        setData({
          temp:(response.data.main.temp- 273.15).toFixed(2),
          temp_min:(response.data.main.temp_min- 273.15).toFixed(2),
           temp_max:(response.data.main.temp_max- 273.15).toFixed(2),
           description:response.data.weather[0].description,
           name:response.data.name

           
            
              })
              
      }
          return () => {
            componentMounted = true;
          }
      })
  //     if(componentMounted){
  //       setData(await responce.json());
  //      console.log(data);
  //     }
  //     return () => {
  //       componentMounted = false;
  //     }
    }
    fetchWeather();
  }, [search]);
  // let emoj
 
let d  =  new Date();
let date = d.getDate();
let year  = d.getFullYear();
let month = d.toLocaleString("default",{month:'long'});
let day = d.toLocaleString("default", {weekday:'long'});

//Time
let time  =  d.toLocaleString([],{
  hour: '2-digit',
  minute: '2-digit',
  second:'2-digit'
});

const handleSubmit = (event) =>{
  event.preventDefault();
  setSearch(input);
}

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 card text-white text-center border-0">
            <div className="card text-bg-dark">
              <img
                src="https://source.unsplash.com/random/600x900?nuture"
                className="card-img"
                alt="wether"
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w
                  -75 mx-auto">
                    <input
                      type="Search"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search-City"
                      aria-describedby="basic-addon2"
                      name="search"
                      value={input}
                      onChange={(e)=>setInput(e.target.value)}
                      required
                    />
                    <button type="submit" className="input-group-text" id="basic-addon2">
                     <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                <h2 className="card-title">{data.name}</h2>
                <p className="card-text lead">
                 {day} {month} {date}, {year}
                <br></br>
                {time}
                </p>
                <hr/>
                <i className="fas fa-cloud fa-4x"></i>
                <h1 className="fw-bolder mb-5">{data.temp}&deg;C</h1>
                <p className="lead fw-bolder mb-0">{data.description}</p>
                <p className="lead">{data.temp_min}&deg;C | {data.temp_max}&deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
