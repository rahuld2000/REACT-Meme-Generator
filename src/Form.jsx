import React from "react";
import "./form.css"
const Form = () => {
    const [meme,setMeme]=React.useState({
        topText:"",
        bottomText:"",
        randomImage:""
    })
    const[allMeme,setAllMeme]=React.useState([])
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setAllMeme(data.data.memes))
    },[])
    function getImage(){
        const rand=Math.floor(Math.random()*allMeme.length)
        const url = allMeme[rand].url
        setMeme(prevMeme=>({
            ...prevMeme,
            randomImage:url
        }))
    }
   function handleChange(event){
    const {name,value}=event.target
    setMeme(prevMeme=>({
        ...prevMeme,[name]:value.toUpperCase()
    }))
    
   }
    return (
        <div className="main">
            <div className="input">
                <input className="boxes" type="text" placeholder="UPPER TEXT" name="topText" value={meme.topText} onChange={handleChange}/>
                <input className="boxes" type="text" placeholder="BOTTOM TEXT" name="bottomText" value={meme.bottomText} onChange={handleChange}/>
            </div>
            <button onClick={getImage}>Get a New Image</button>
            <div className="meme">
                <img src={meme.randomImage} width="400px" alt="" />
                <h1 className="top_text">{meme.topText}</h1>
                <h1 className="bottom_text">{meme.bottomText}</h1>
            </div>
        </div>
    )
}
export default Form;