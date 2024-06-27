import React, { useEffect } from 'react';
import "../style/UploadList.css"
import "../style/Home.css"
import { useNavigate } from 'react-router-dom';

const UploadList = () => {
    const navigate = useNavigate();

    const [files, setFiles] = React.useState<string[]>([]);
    useEffect(() => {
        fetchFileList();
    }, []);
    const fetchFileList = async () => {
        try {
            const response = await fetch('http://localhost:3000/output');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFiles(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    const handleDownload = async (filename: string) => {
        try {
            const response = await fetch(`http://localhost:3000/output/${filename}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    return (
        <div className='container m-2'>
            <div className='homepage'>
                <div className='flex justify-center text-4xl'>
                    <h1>Liste des fichiers</h1>
                </div>
                <div className='m-1'>
                    <ul className='file-list'>
                        {files.length > 0 ? (
                            files.map(file => (
                                <li key={file}>
                                    {file} <button className='btn-downl' onClick={() => handleDownload(file)}>Download</button>
                                </li>
                            ))
                        ) : (
                            <h3>Il n'y a pas de fichier à télécharger</h3>
                        )}
                    </ul>
                </div>
                <div className='flex justify-end'>
                    <button className='btn' onClick={() => navigate('/home')}>Retourner</button>
                </div>
            </div>

        </div>
    )
};


export default UploadList;