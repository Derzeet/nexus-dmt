import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";

import plusIcon from "../../images/plucIcon.svg";
import trashIcon from "../../images/trashIcon.svg";
import editIcon from "../../images/editIcon.svg";

import "./quadricNode.scss";

function CompanyNode({ id, data }) {
  const [keys, setKeys] = useState(Object.keys(data));
  const [visibleKeys, setVisibleKeys] = useState(["IINBIN"]);
  const [isTextBoxOpen, setIsTextBoxOpen] = useState(false);
  const [textboxValue, setTextboxValue] = useState("");
  const [note, setNote] = useState(""); // Add a new state for the note
  const [displayText, setDisplayText] = useState(data.customText || "");
  const [nodeColor, setNodeColor] = useState("#0A84C3");

  const handlePropertyChange = (x) => {
    setVisibleKeys((prevKeys) => {
      if (prevKeys.includes(x)) {
        return prevKeys.filter((y) => y !== x);
      } else {
        return [...prevKeys, x];
      }
    });
  };

  const handleAddTextClick = () => {
    setIsTextBoxOpen(!isTextBoxOpen);
  };

  const handleSaveText = () => {
    if (isTextBoxOpen) {
      setDisplayText(textboxValue);
      setIsTextBoxOpen(false);
    } else {
      setNote(textboxValue); // Save the textboxValue as a note
      setIsTextBoxOpen(true); // Open the textbox for editing the note
    }
  };
  const handleColorChange = (color) => {
    setNodeColor(color.hex);
  };

  return (
    <div className="quadric-node" style={{ backgroundColor: "#0A84C3" }}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <div className="node-header">{data.Name}</div>
      <div className="node-body">
        {visibleKeys.map((x) => (
          <a key={x}>
            {x}: {data[x]}
          </a>
        ))}
        {note && <div className="note">{note}</div>}
        {displayText && <div>{displayText}</div>}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ background: "#555" }}
      />
      <div className="node-tools-bar">
        {/* <div className="edit-node-properties">
          <h1>Показать поля</h1>
          <div className="list-of-properties">
            {keys.map((x) => (
              <div className="prop-vision" key={x}>
                <input
                  type="checkbox"
                  onChange={() => handlePropertyChange(x)}
                  checked={visibleKeys.includes(x)}
                />
                <a>{x}</a>
              </div>
            ))}
          </div>
          <div>
            <div className="edit-node-footer">
              <img src={plusIcon} alt="+" />
              <a onClick={handleAddTextClick}>Добавить текст</a>
            </div>
            {isTextBoxOpen && (
              <div>
                <input
                  className="input-note"
                  value={textboxValue}
                  onChange={(e) => setTextboxValue(e.target.value)}
                />
                <button onClick={handleSaveText}>
                  {note ? "Изменить" : "Добавить"}
                </button>
              </div>
            )}
          </div>
        </div> */}
        <div className="node-add-connection">
          <h1>Добавить связь</h1>
          <div className="connection">
            <p>От:</p>
            <p>К:</p>
          </div>
          <div className="connection-buttons">
            <button>Новый</button>
            <button>Выбрать</button>
          </div>
        </div>
        <div className="node-color-picker">
          <input
            type="color"
            value={nodeColor}
            onChange={(e) => handleColorChange(e.target.value)}
            style={{ height: "35px", width:"35px", borderRadius: "1px", border:"#fff", padding: "2px", cursor: "pointer" }}
            
          />
          <p>Цвет</p>
          </div>
          <div className="edit-node-footer">
              <img src={plusIcon} alt="+" />
              <a onClick={handleAddTextClick}>Добавить текст</a>
            </div>
            {isTextBoxOpen && (
              <div>
                <input
                  className="input-note"
                  value={textboxValue}
                  onChange={(e) => setTextboxValue(e.target.value)}
                />
                <button onClick={handleSaveText}>
                  {note ? "Изменить" : "Добавить"}
                </button>
              </div>
            )}

      </div>
    </div>
  );
}

export default memo(CompanyNode);
