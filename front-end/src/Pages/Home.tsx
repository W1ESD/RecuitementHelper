import React, { useState, useEffect } from 'react';
import '../style/Home.css';
import NavBar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [grade, setGrade] = useState<string>('');
  const [specialiter, setSpecialiter] = useState<string>('');
  const [fichierC, setFichierC] = useState<File | null>(null);
  const [fichierS, setFichierS] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [files, setFiles] = useState<string[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetchFileList();
  // }, []);

  const handleFileCandidatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFichierC(e.target.files[0]);
    }
  };

  const handleFileSurveillantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFichierS(e.target.files[0]);
    }
  };

  const handleClick = async () => {
    if (!fichierC || !fichierS) {
      setMessage('Please upload both files.');
      return;
    }

    const formData = new FormData();
    formData.append('files', fichierC);
    formData.append('files', fichierS);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      console.log(data);
      setMessage(data.message);
      navigate('/uploadlist');
      // fetchFileList(); // Refresh the file list after upload
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setMessage('An error occurred while uploading the files.');
    }
  };

  // const fetchFileList = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/output');
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     setFiles(data);
  //   } catch (error) {
  //     console.error('There was a problem with the fetch operation:', error);
  //   }
  // };

  // const handleDownload = async (filename: string) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/output/${filename}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     a.href = url;
  //     a.download = filename;
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();
  //   } catch (error) {
  //     console.error('There was a problem with the fetch operation:', error);
  //   }
  // };

  return (
    <div className="container m-2">
      <div className="homepage">
        <NavBar />
        <div className="candidat">
          <span className="grade">Grade :</span>
          <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="" />
          <span className="grade">Specialiter :</span>
          <input type="text" value={specialiter} onChange={(e) => setSpecialiter(e.target.value)} placeholder="" />
          <span className="grade">Fichier Candidats:</span>
          <input type="file" onChange={handleFileCandidatChange} />
          <span className="grade">Fichier Surveillants:</span>
          <input type="file" onChange={handleFileSurveillantChange} />
        </div>
        <div className="flex justify-center">
          <button className="click" onClick={handleClick}>
            Télécharger les fichiers
          </button>
        </div>
        {/* {message && <div className="message">{message}</div>}
        <div className="file-list">
          <h3>Available Files for Download:</h3>
          <ul>
            {files.map(file => (
              <li key={file}>
                {file} <button onClick={() => handleDownload(file)}>Download</button>
              </li>
            ))}
        </ul>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
