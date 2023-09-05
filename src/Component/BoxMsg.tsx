
function padTo2Digits(num : number) {
  return String(num).padStart(2, '0');
}

const Box_msg = (props: any) => {
  const date = new Date(props.createdAt);
  const hoursAndMinutes =
    padTo2Digits(date.getHours()) +
    ':' +
    padTo2Digits(date.getMinutes());
  return (
    <div
      id={props.msgid} className="flex gap-1 m-0 p-0"
      style={{ alignSelf: props.alignSelf, flexDirection: props.direction }}
    >
      {props.me ? (
        <img
          src={`/api/v1/user/avatar?id=${props.id}`}
          className="flex h-10 w-10 self-end rounded-full"
        />
      ) : null}
      <div className="flex flex-col w-[fit-content] text-[12px] p-0 break-words overflow-hidden">
        {props.me ? (
          <p className={`flex text-blue-600 ${props.side} font-extrabold`}>
            {props.name}<span className="text-white whitespace-pre">  {hoursAndMinutes}</span>
          </p>
        ) : null}
        {
          props.text ?
            <p
              className="max-w-[35vw] w-[fit-content] text-msgColorOn whitespace-pre-wrap text-[12px] p-3 break-words overflow-hidden"
              style={{
                backgroundColor: "#01101F",
                borderRadius: props.reduis,
                flexDirection: props.direction,
              }}
            >
              {props.text}
            </p>
          :
            <p
            className="max-w-[35vw] w-[fit-content] text-[#FF0000] text-[12px] p-3 break-words overflow-hidden"
            style={{
              backgroundColor: "#01101F",
              borderRadius: props.reduis,
              flexDirection: props.direction,
            }}
          >
            HIDDEN
          </p>
        }
      </div>
    </div>
  );
};

export default Box_msg;
