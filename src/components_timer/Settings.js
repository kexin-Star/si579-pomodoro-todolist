import React, { useContext, useState } from "react";
import { SetupPomodoroContext } from "../context/SetupPomodoroContext";
import PomodoroButton from "./PomodoroButton";
import "./PomodoroButton.css"

{/*Setup initial pomodoro timer */}
const Settings = () => {
    const [ newTimer, setNewTimer ] = useState({
        work: 25, //set initial time of work - 25min
        short: 5, //set initial time of short break - 5min
        long: 30, //set initial time of long break - 30min
        active: 'work' //set 
    })
    const { updateTimer } = useContext(SetupPomodoroContext)

    {/* handleChange: customize the duration of the pomodoro clock*/}    
    const handleChange = (newValue) => {
        const  {activeType, value } = newValue.target; //destrcuture the input value
        switch (activeType) {
            case 'work':
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value) //override the value of "work", set new duration
                })
                break;
            
            case 'short':
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            
            case 'long':
                setNewTimer({
                    ...newTimer,
                    long: parseInt(value)
                })
                break;
            
            default:
                break;
        }
        console.log(newTimer); //check
    }

    const updateTimerHandler = (e) => {
        console.log("我在update timer")
       // e.prventDefault() //prevent refresh the browser when the user submit the settings.
        console.log("我在update timer")
        updateTimer(newTimer)
        console.log("我在update timer")
    }

    return(
        <div className="setting-container">
            <form noValidate>
                <div className="input-container">
                        <label>Work time (min)</label>
                        <input className="input" name="work" onChange={handleChange} value={newTimer.work}/>
                        <label>Short Break (min)</label>
                        <input className="input" name="short" onChange={handleChange} value={newTimer.short} />
                        <label>Long Break (min)</label>
                        <input className="input" name="long" onChange={handleChange} value={newTimer.long} />
                </div> 
                <PomodoroButton title="Set Timer" _callback={updateTimerHandler} />
            </form>
        </div>
    )
}


export default Settings