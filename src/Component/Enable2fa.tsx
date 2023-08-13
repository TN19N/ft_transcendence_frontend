import axios from 'axios';
import { useNavigate } from 'react-router';
const Enable2fa = () => {
    
    const navigate = useNavigate();
    const handledisable = () =>
    {
      axios.put('http://localhost/api/v1/user/turnOn2fa', {})
        .then((response) => {
          console.log(response);
          navigate('/authentication')
        })
        .catch((error) => {
        if (error.response.status === 401)
        {
            navigate('/login');
            console.log('Unauthorized');
        }else
          console.error('Error disabling 2FA:', error);
        });
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