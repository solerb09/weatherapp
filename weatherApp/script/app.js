
// api key from open weather
let key = "d7ea88facc4e028abcb4f745d9a57299"; 

function requestData()
{
    let userLocation = document.getElementById("city").value;
    let unitChoice = document.getElementById("units").value;

    let xhr = new XMLHttpRequest();
    document.getElementById("location").innerHTML = "Loading...";
    
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let obj = JSON.parse(this.responseText);
            console.log(obj);   
            let temp = Math.round(obj.main.temp);
            if (unitChoice == 'Imperial')
            {
                document.getElementById("location").innerHTML=obj.name+'<br>';
                document.getElementById("temp").innerHTML=`${temp}&degF<br>`;
                document.getElementById("feelsLike").innerHTML="Feels Like <br>"+Math.round(obj.main.feels_like)+"&degF<br>";
                document.getElementById("outside").innerHTML = obj.weather[0].description+"<br><br>";
                document.getElementById("wind").innerHTML = "Wind <br>"+Math.round(obj.wind.speed)+" mph";
            }
            else
            {
                document.getElementById("location").innerHTML=obj.name+'<br>';
                document.getElementById("temp").innerHTML=`${temp}&degC<br>`;
                document.getElementById("feelsLike").innerHTML="Feels Like <br>"+Math.round(obj.main.feels_like)+"&degC<br>";
                document.getElementById("outside").innerHTML = obj.weather[0].description+"<br><br>";
                document.getElementById("wind").innerHTML = "Wind <br>"+Math.round(obj.wind.speed)+" mph";
            }  
            
        }
    };

    xhr.onloadend = function()
    {
        if(xhr.status == 404)
        {
            alert("Unknown location..Try again");
            document.getElementById("location").innerHTML = "";
            document.getElementById("temp").innerHTML = "";
            document.getElementById("feelsLike").innerHTML = "";
            document.getElementById("outside").innerHTML = "";
        }
        else if(xhr.status == 400)
        {
            alert("Enter your location in the field");
            document.getElementById("location").innerHTML = "";
            document.getElementById("temp").innerHTML = "";
            document.getElementById("feelsLike").innerHTML = "";
            document.getElementById("outside").innerHTML = "";

        }
        else if(xhr.status == 429)
        {
            alert("Too many requests");
            document.getElementById("location").innerHTML = "";
            document.getElementById("temp").innerHTML = "";
            document.getElementById("feelsLike").innerHTML = "";
            document.getElementById("outside").innerHTML = "";

        }
    };
    

    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${userLocation},us&units=${unitChoice}&appid=${key}`, true);
    xhr.send();
}


