import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './Generatecard.css';

const Generatecard = () => {
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [img, setImg] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [form, setForm] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImg(reader.result);
      };
    }
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setShowCard(true);
    setForm(false);
  };

  const handleDownload = () => {
    const cardElement = document.querySelector('.wrapper');
    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'generated-card.png';
      link.click();
    });
  };

  return (
    <>
      {form && (
        <div className="form-container">
          <form className="form" onSubmit={handleGenerate}>
            <h1>Generate card dynamically</h1>
            <input
              type="text"
              placeholder="Name"
              onChange={handleNameChange}
              value={name}
              required
            />
            <textarea
              placeholder="About"
              rows="3"
              onChange={handleAboutChange}
              value={about}
              required
            />
            <label>
              Upload photo:
              <input
                type="file"
                onChange={handleImgChange}
                required
              />
            </label>
            <div className="button_div">
              <button className="button" type="submit">Generate card</button>
            </div>
          </form>
        </div>
      )}
      {showCard && (
        <div>
          <div className="main_div">
            <div className="wrapper">
              <div className="img_div">
                {img && <img className="img" src={img} alt="Uploaded" />}
              </div>
              <div className="content">
                <h1 className="h1">{name}</h1>
                <p>{about}</p>
              </div>
            </div>
          </div>
          <div className="btn-dwload ">
          <button onClick={handleDownload} className="button">Download Card</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Generatecard;