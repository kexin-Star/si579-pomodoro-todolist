import { createContext, useState } from "react";

export const SetupPomodoroContext = createContext()

const SetupContextProvider = (props) => {

    // const [ pomodoro, setPomodoro ] = useState(0); 
    // const [ executing, setExecuting ] = useState({});
    // const [ startAnimation, setStartAnimation ] = useState(false);
    // const [ newTimerKey, setNewTimerKey ] =useState(0);

    //default
    
    const initState = {
        work: 25, //set initial time of work - 25min
        short: 5, //set initial time of short break - 5min
        long: 30, //set initial time of long break - 30min
        active: 'work' //set 
    }
    const [ pomodoro, setPomodoro ] = useState(0); 
    const [ executing, setExecuting ] = useState(initState);
    const [ startAnimation, setStartAnimation ] = useState(false);
    const [ newTimerKey, setNewTimerKey ] =useState(0);
    const [ usedTime, setUsedTime ] = useState(0);
    const [ finishCycle, setFinishCycle ] = useState(false);


    const startTimerTodoList = () => {
        setFinishCycle(false)
        setStartAnimation(true)
    }
    const startTimer = () => {
        setStartAnimation(true)
    }

    const pauseTimer = () => {
        setStartAnimation(false)
    }

    const resetTimer = (isDoingTask) => {
        console.log("isDoingTask: " + isDoingTask)
        if(isDoingTask){
            setFinishCycle(true)
            // console.log("In Context: finish Cycle: " + finishCycle)
        } else {
            setNewTimerKey(newTimerKey + 1)
            pauseTimer() //pause the animation when the clock is refreshed
        }

        
    }

    const updateTimer = (newTimer) => {
        setExecuting(newTimer) //object, "newTimer" from SetPomodoro
        setTime(newTimer)
    }

    function setTaskNowTimer(time){ //either "work", "short" or "long"
        updateTimer({
            ...executing,
            work: time
        })
    }

    function setCurrentTimer(activeType){ //either "work", "short" or "long"
        updateTimer({
            ...executing,
            active: activeType
        })
        setTime(executing) //reset the promodoro value depending on the active state
        pauseTimer()
    }

    const setTime = (data) => { //also used for resetting the timer
        switch (data.active) { //active: from SetPomodoro
            case "work":
                setPomodoro(data.work)
                break;

            case "short":
                setPomodoro(data.short)
                break;

            case "long":
                setPomodoro(data.long)
                break;

            default:
                setPomodoro(0)
                break;
        }
    }

    const usedTimeHandler = (min, sec) => {
        if(executing.active === "work"){
            const usedSeconds = executing.work * 60 - (min * 60 + sec)
            // console.log("used seconds in Context: " + usedSeconds + " s");
            setUsedTime(usedSeconds);

            return `${usedSeconds}`
        }
        return 0
    }

    const children = ({ remainingTime }) => {
        console.log("time: " + remainingTime)   
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
        //console.log(usedTime)
        setTimeout(()=>{
            usedTimeHandler(minutes, seconds);
        }, 0)
        return `${minutes} : ${seconds}`
    }

    return(
        <SetupPomodoroContext.Provider 
            value={{
                startTimer,
                pauseTimer,
                resetTimer,
                updateTimer,
                setCurrentTimer,
                children,
                startAnimation,
                pomodoro,
                executing,
                newTimerKey,
                usedTime,
                usedTimeHandler,
                
                finishCycle,
                setFinishCycle,
                startTimerTodoList,
                setTaskNowTimer
                
                // setTime,
                // setCurrentTimer,
                // setExecuting,
                // setPomodoro
            }}
        >
            {props.children}
        </SetupPomodoroContext.Provider>
    )
}

export default SetupContextProvider