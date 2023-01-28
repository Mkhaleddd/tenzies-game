export default function Score (props){
    return(
        <div className="score-con">
         <span>dice rolled:{props.rolls}</span>
                <br></br>
        <span>Timer: {("0"+Math.floor((props.time /6000)%60)).slice(-2)}:
            {("0"+Math.floor((props.time/1000)%60)).slice(-2)}:
            {("0"+Math.floor((props.time/10)%1000)).slice(-2)}
            </span>
        </div>
    )
}