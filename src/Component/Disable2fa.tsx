import axios from 'axios';
interface Disableit {
  Disable : ()=>void
}
const Disable2fa: React.FC<Disableit>  = ({ Disable }) => {
  const handleDisable = () => {
    axios.patch(`${process.env.SERVER_HOST}/api/v1/user/turnOff2fa`, {})
      .then(() => {

        Disable();
        console.log('2FA disabled successfully.');
      })
      .catch((error) => {
        console.error('Error disabling 2FA:', error);
      });
  };

  return (
    <div>
      <button onClick={handleDisable}>
        Disable 2FA
      </button>
    </div>
  );
};

export default Disable2fa;

