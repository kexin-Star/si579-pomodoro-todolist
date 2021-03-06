import React, { useContext, useEffect, useState } from "react";
import { SetupPomodoroContext } from "../context/SetupPomodoroContext";
import PomodoroButton from "./PomodoroButton";
import "./PomodoroButton.css"

{/*Setup initial pomodoro timer */}


const Settings = ( {disabled, disableNoTask} ) => {
    const initState = {
        work: 25, //set initial time of work - 25min
        short: 5, //set initial time of short break - 5min
        long: 30, //set initial time of long break - 30min
        active: 'work' //set 
    }
    
    const [ newTimer, setNewTimer ] = useState(initState)
    
    const { updateTimer } = useContext(SetupPomodoroContext)


    {/* handleChange: customize the duration of the pomodoro clock*/}    
    const handleChange = (input) => {
        const  { name, value } = input.target; //destrcuture the input value
        console.log("activeType: " + name)

        switch (name) {
            case "work":
                setNewTimer({
                    ...newTimer,
                    work: parseInt(value) //override the value of "work", set new duration
                })
                break;
            
            case "short":
                setNewTimer({
                    ...newTimer,
                    short: parseInt(value)
                })
                break;
            
            case "long":
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
        e.preventDefault();
        updateTimer(newTimer)
    }

    // console.log("disableNotask: " + disableNoTask)
    if (disabled || disableNoTask) {
        return(
            <div className="setting-container" style={{ opacity: 0.5, pointerEvents: "none" }} disabled>
                <form noValidate>
                    <div className="input-container">
                            <label>Work time (min)</label>
                            <input className="input" name="work" onChange={handleChange} defaultValue={newTimer.work}/>
                            <label>Short Break (min)</label>
                            <input className="input" name="short" onChange={handleChange} defaultValue={newTimer.short} />
                            <label>Long Break (min)</label>
                            <input className="input" name="long" onChange={handleChange} defaultValue={newTimer.long} />
                    </div> 
                    <PomodoroButton title="Set Timer" _callback={updateTimerHandler} />
                </form>
            </div>
        )
    } 
    else{
        return(
            <div className="setting-container" disabled>
                <form noValidate>
                    <div className="input-container">
                            <label>Work time (min)</label>
                            <input className="input" name="work" onChange={handleChange} defaultValue={newTimer.work}/>
                            <label>Short Break (min)</label>
                            <input className="input" name="short" onChange={handleChange} defaultValue={newTimer.short} />
                            <label>Long Break (min)</label>
                            <input className="input" name="long" onChange={handleChange} defaultValue={newTimer.long} />
                    </div> 
                    <PomodoroButton title="Set Timer" _callback={updateTimerHandler} />
                </form>
            </div>
        )
    }
    
}


export default Settings