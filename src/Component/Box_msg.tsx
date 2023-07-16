const Box_msg = (props:any) => {
    return (
    <div className="w-[80%] p-2" style={{backgroundColor : props.color, borderRadius: props.reduis,alignSelf:props.alignSelf}}>
        <span className="text-[12px]  text-msgColorOn">
        Hey my friend how are you 😇, I’m loser and you are
        winner  my home is big and your home is small
        </span>
    </div>
    );
}


export default Box_msg;