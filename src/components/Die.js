export default function Die (props){
    
    return (
            <div  className={props.isHeld ? "held":"die"} 
            style={{animation:props.isClick?"swirl-in-fwd 0.6s ease-out both":""}}
            onClick={props.holdDice}>
                <span className="die-num">{props.value}</span>
            </div>
    
        
    );
}