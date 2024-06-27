import React, { useState } from 'react';
import "../style/Settings.css";
import NavBar from '../Components/NavBar';

const Settings: React.FC = () => {
  const [isChangePwdModalOpen, setIsChangePwdModalOpen] = useState<boolean>(false);
  const [isDeleteAccModalOpen, setIsDeleteAccModalOpen] = useState<boolean>(false);

  const openChangePwdModal = () => {
    console.log('open change : ', isChangePwdModalOpen);
    setIsChangePwdModalOpen(true);
  }
  const closeChangePwdModal = () => setIsChangePwdModalOpen(false);

  const openDeleteAccModal = () => setIsDeleteAccModalOpen(true);
  const closeDeleteAccModal = () => setIsDeleteAccModalOpen(false);

  return (
    <div className='container m-2'>
      <div className='homepage'>
        <NavBar />
        <div className='flex justify-center text-4xl'>
          <h1>Réglages</h1>
        </div>
        <div className='flex justify-center'>
          <button className='changemdp' onClick={openChangePwdModal}>Changer de mots de passe</button>
          <button className='deleteaccount' onClick={openDeleteAccModal}>Supprimer un compte</button>
        </div>

        {/* Change Password Modal */}
        {isChangePwdModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <span className='close' onClick={closeChangePwdModal}>&times;</span>
              <h2 className=' font-bold flex justify-center'>Changer de mots de passe</h2>
              <form className='flex'>
                <label>Ancien mot de passe:</label>
                <input type='password' className='amdp m-2' />
                <label>Nouveau mot de passe:</label>
                <input type='password' className='amdp m-2' />
                <label>Confirmer le nouveau mot de passe:</label>
                <input type='password' className='amdp m-2' />
                <button type='submit' className='changer m-2 justify-center'>Changer</button>
              </form>
            </div>
          </div>
        )}

        {/* Delete Account Modal */}
        {isDeleteAccModalOpen && (
          <div className='modal'>
            <div className='modal-content'>
              <span className='close' onClick={closeDeleteAccModal}>&times;</span>
              <h2>Supprimer un compte</h2>
              <p>Êtes-vous sûr de vouloir supprimer ce compte? Cette action est irréversible.</p>
              <div className='flex justify-around'>
                <button className='deleteaccountSup'>Supprimer</button>
                <button onClick={closeDeleteAccModal} className='annuler'>Annuler</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;

