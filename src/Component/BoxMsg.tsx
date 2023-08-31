const Box_msg = (props: any) => {
  return (
    <div
      className="flex gap-1 m-0 p-0"
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
            {props.name}
          </p>
        ) : null}
        <p
          className="max-w-[35vw] w-[fit-content] text-msgColorOn text-[12px] p-3 break-words overflow-hidden"
          style={{
            backgroundColor: "#01101F",
            borderRadius: props.reduis,
            flexDirection: props.direction,
          }}
        >
          {props.text}
        </p>
      </div>
    </div>
  );
};

export default Box_msg;
