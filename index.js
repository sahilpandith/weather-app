import './style.css';

async function getWeatherForLocation(location){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c7fcb80c19044d5fab044728230407&q=${location}`)
    const json = await response.json();
    const modifiedJson = processJson(json);
    console.log(modifiedJson);
    return modifiedJson;
}

function processJson(jsonData){
    const {current : {temp_f,temp_c , condition : {text ,icon}}, location : { country , name , localtime  }} = jsonData
    return {
        country,
        name,
        localtime,
        celcius : temp_c,
        farenhiet : temp_f,
        summary : text,
        icon
    }
}

const module = (function(){
    const infoNode = document.querySelector('.info');
    const formNode =  document.querySelector('form');
    formNode.addEventListener('submit', async function(event){
        event.preventDefault();
        const inputValue = event.target.querySelector('#location').value
        try{
            const response = await getWeatherForLocation(inputValue);
            infoNode.innerHTML = getInfoNodeInnerHtml();
            for(let [key,value] of Object.entries(response)){
                if(key==='icon'){
                    document.querySelector(`#${key}`).src =value;
                    continue;
                }
                document.querySelector(`#${key}-value`).setHTML(value);
                document.querySelector(`#${key}-label`).setHTML(key.toLocaleUpperCase());
            }
        }catch(err){
            infoNode.innerHTML= "location Not found";
        }
        
    })
})()

function getInfoNodeInnerHtml(){
    return `
    <img id='icon' src=''>
    <div id="country-label"></div>
    <div id="country-value"></div>
    <div id="name-label"></div>
    <div id="name-value"></div>    
    <div id="celcius-label"></div>
    <div id="celcius-value"></div> 
    <div id="farenhiet-label"></div>
    <div id="farenhiet-value"></div> 
    <div id="localtime-label"></div>
    <div id="localtime-value"></div> 
    <div id="summary-label"></div>
    <div id="summary-value"></div>       
    `
}


