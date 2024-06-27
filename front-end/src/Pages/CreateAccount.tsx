import React, { useState } from 'react'
import "../style/Home.css"
import "../style/CreateCompte.css"
import NavBar from '../Components/NavBar';


const CreateAccount: React.FC = () => {
    const [newId, setNewId] = useState<String>('');
    const [newPasswd, setNewPasswd] = useState<String>('');

    return (
        <div className='container m-2'>
            <div className='homepage'>
                <NavBar />
                <div className='create'>
                    <div className='createAccount'>
                        <div>
                            <span className='nv'>Nouveau Compte:</span>
                        </div>
                        <div className=''>
                            <input type='text' className='m-2 ide' onChange={(e) => setNewId(e.target.value)} placeholder='Nouveau Identifiant' />
                        </div>
                        <div className='m-4'>
                            <input type='text' className='ide' onChange={(e)=> setNewPasswd(e.target.value)} placeholder='Nouveau Mots de passe' />
                        </div>
                    </div>
                    <div className='bord'>
                        <div>
                            <span className='flex justify-center font-bold'>Les Roles a associer:</span>
                        </div>
                        <div className='m-2'>
                            <input type='checkbox' placeholder='' />
                            <label className='m-1'>Crée un compte</label>
                        </div>
                        <div className='m-2'>
                            <input type='checkbox' placeholder='' />
                            <label className='m-1'>Supprimer un compte</label>
                        </div>
                        <div className='m-2'>
                            <input type='checkbox' placeholder='' />
                            <label className='m-1'>Changer de mots de passe</label>
                        </div>
                    </div>
                </div>
                <div className='flex justify-around m-5'>
                    <button className='newClick'>Crée un Nouveau Compte</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;
