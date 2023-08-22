import { useNavigate } from 'react-router';
const Enable2fa = () => {
    
    const navigate = useNavigate();
    const handledisable = () =>
    {
      navigate('/enable2fa');
    }
  return (
    <div>
      <button onClick={handledisable}>
      Enable 2FA
      </button>
    </div>
  );
  }
export default Enable2fa;