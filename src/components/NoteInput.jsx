import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/actions/noteActions";

function NoteInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [showPalette, setShowPalette] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

  const handleAddNote = () => {
    if (title.trim() || content.trim() || selectedImage) {
      dispatch(addNote({ title, content, color, backgroundImage, selectedImage }));
      setTitle("");
      setContent("");
      setColor("#ffffff");
      setBackgroundImage("");
      setSelectedImage(null);
      setIsExpanded(false);
    } else {
      alert("Please enter a title, content, or select an image.");
    }
  };

  const handleColorSelect = (color) => {
    setColor(color);
    setShowPalette(false); 
  };

  const handleBackgroundSelect = (imageUrl) => {
    setBackgroundImage(imageUrl);
    setShowPalette(false); 
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const colors = [
    "#ffffff",
    "#ad7cdb",
    "#d65b5b",
    "#e0af55",
    "#f3f30a",
    "#d45bc4",
    "#0000FF",
    "#808080",
    "#008000",
    "#808000",
    "#FFA500",
    "#800000",
    "#00FFFF",
    "#00FF00"
  ];

  const backgrounds = [
    "https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg",
    "https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg",
    "https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg",
    "https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg",
    "https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg",
    "https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg",
    "https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
    "https://www.gstatic.com/keep/backgrounds/video_light_thumb_0615.svg",
    "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
  ];

  return (
    <div className="note-input" style={{ backgroundColor: color, backgroundImage: `url(${backgroundImage})` }}>
      {isExpanded ? (
        <>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="note-input-actions">
            <button><i className="bi bi-bell"></i></button>
            <button><i className="bi bi-person-fill-add"></i></button>
            <button
              onClick={() => setShowPalette(!showPalette)}
              className="palette-btn"
            >
              <i className="bi bi-palette"></i>
            </button>
            <button>
              <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                <i className="bi bi-image"></i>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </button>
            <button><i className="bi bi-arrow-down-square-fill"></i></button>
            <button><i className="bi bi-three-dots-vertical"></i></button>
            {showPalette && (
              <div className="palette-popup">
                <div className="color-palette">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                </div>
                <div className="background-palette">
                  {backgrounds.map((bg, index) => (
                    <img
                      key={index}
                      src={bg}
                      alt={`background ${index}`}
                      onClick={() => handleBackgroundSelect(bg)}
                      style={{
                        cursor: "pointer",
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="col d-flex justify-content-end me-2">
              <button className="bg-warning" onClick={handleAddNote}>
                Save
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="close-btn bg-danger ms-2"
              >
                Close
              </button>
            </div>
          </div>
          {selectedImage && (
            <div className="selected-image-preview">
              <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", height: "200px" }} />
            </div>
          )}
        </>
      ) : (
        <div
          className="note-input-collapsed"
          onClick={() => setIsExpanded(true)}
        >
          <input
            type="text"
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default NoteInput;
