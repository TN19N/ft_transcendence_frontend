import axios from 'axios';


const Disable2fa = () => {
    const handledisable = () =>
    {
      axios.patch(`${process.env.SERVER_HOST}/api/v1/user/turnOff2fa`, {})
        .then((response) => {
          console.log(response);
          console.log('2FA disabled successfully.');
        })
        .catch((error) => {
          console.error('Error disabling 2FA:', error);
        });
    }
  return (
    <div>
      <button onClick={handledisable}>
      Disable 2FA
      </button>
    </div>
  );
  }
export default Disable2fa;
