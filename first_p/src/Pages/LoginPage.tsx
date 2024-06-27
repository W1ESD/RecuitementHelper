import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import '../style/Login.css'

const LoginPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [passwd, setPasswd] = useState<string>('');
  const navigate = useNavigate();

  // console.log(id);
  const handleConnexion = () => {
    console.log('admin');
    if (id === 'admin' && passwd === 'admin') {
      navigate('/home');
    }
    else
      window.location.reload();
  }
  return (
    <div className="container m-2">
      <div className="cont">
        <div className='mt-4'>
          <img src={logo} alt="sss" className='logo' />
          <span className='text-2xl'>Royaume du Maroc<br />Ministère de l’Enseignement Supérieur,<br />De la Recherche Scientifique et de l’Innovation<br />Direction des Ressources Humaine</span>
        </div>
        <div className=''>
          <h3 className="text-end text-5xl mr-12 m-2">Connectez-Vous</h3>
          <div className="line-border"></div>
          <div className="ml-4">
            <div className="m-10">
              <input type="text" className="identifier" onChange={(e) => setId(e.target.value)} placeholder="Identifier Vous" />
            </div>
            <div className="m-10">
              <input type="password" className="identifier" onChange={(e) => setPasswd(e.target.value)} placeholder="Mot de passe..." onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleConnexion();
                }
              }} />
            </div>
          </div>
          <div className="flex justify-around ">
            <button type="submit" onClick={handleConnexion} className="btn">Connexion</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;