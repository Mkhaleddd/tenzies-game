export default function Die (props){
    let styles={className:props.isHeld ? "held":"die"}
    return (
            <div  className={props.isHeld ? "held":"die"} onClick={props.holdDice}>
                <span className="die-num">{props.value}</span>
            </div>
    
        
    );
}