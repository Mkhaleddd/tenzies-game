export default function Score (props){
    return(
        <div className="score-con">
                <span>dice rolled:{props.rolls}</span>
                <br></br>
                <span>Timer: {(Math.floor((props.time / 1000)))}:
            {("0" + ((props.time / 10) % 10))}</span>
        </div>
    )
}