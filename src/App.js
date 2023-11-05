import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const App = () => {
  const [input1Value, setInput1Value] = useState("");
  const [input2Value, setInput2Value] = useState("");
  const [input3Value, setInput3Value] = useState("");
  const [input4Value, setInput4Value] = useState("");
  const [input5Value, setInput5Value] = useState("");
  const [input6Value, setInput6Value] = useState("");
  const [dataList, setDataList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  const handleInput1Change = (event) => {
    setInput1Value(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2Value(event.target.value);
  };

  const onMapClick = ({ x, y, lat, lng, event }) => {
    setInput3Value(lat.toString());
    setInput4Value(lng.toString());
  };

  const handleInput5Change = (event) => {
    setInput5Value(event.target.value);
  };

  const handleInput6Change = (event) => {
    setInput6Value(event.target.value);
  };

  const handleDataSubmit = () => {
    if (selectedData) {
      const updatedDataList = dataList.map((data) =>
        data === selectedData
          ? {
              input1: input1Value,
              input2: input2Value,
              input3: input3Value,
              input4: input4Value,
              input5: input5Value,
              input6: input6Value,
            }
          : data
      );
      setDataList(updatedDataList);
      setSelectedData(null);
    } else {
      const newData = {
        input1: input1Value,
        input2: input2Value,
        input3: input3Value,
        input4: input4Value,
        input5: input5Value,
        input6: input6Value,
      };
      setDataList([...dataList, newData]);
    }

    setInput1Value("");
    setInput2Value("");
    setInput3Value("");
    setInput4Value("");
    setInput5Value("");
    setInput6Value("");
  };

  const handleEdit = (data) => {
    setInput1Value(data.input1);
    setInput2Value(data.input2);
    setInput3Value(data.input3);
    setInput4Value(data.input4);
    setInput5Value(data.input5);
    setInput6Value(data.input6);
    setSelectedData(data);
  };

  const handleDelete = (data) => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      const updatedDataList = dataList.filter((item) => item !== data);
      setDataList(updatedDataList);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={inputStyle}>
        <label style={labelStyle}>Stop Name</label>
        <input
          style={input}
          placeholder="   Stop Name"
          type="text"
          value={input1Value}
          onChange={handleInput1Change}
        />
        <label style={labelStyle}>Stop Address</label>
        <input
          style={input}
          placeholder="   Stop Address"
          type="text"
          value={input2Value}
          onChange={handleInput2Change}
        />
        <label style={labelStyle}>Latitude</label>
        <input style={input} type="text" value={input3Value} />
        <label style={labelStyle}>Longitude</label>
        <input style={input} type="text" value={input4Value} />
        <label style={labelStyle}>Pickup Price</label>
        <input
          style={input}
          placeholder="   Pickup Price "
          type="number"
          value={input5Value}
          onChange={handleInput5Change}
        />
        <label style={labelStyle}>Drop Price</label>
        <input
          style={input}
          placeholder="   Drop Price"
          type="number"
          value={input6Value}
          onChange={handleInput6Change}
        />
        <button
          style={{ ...input, fontWeight: "bold", fontSize: 20 }}
          onClick={handleDataSubmit}
        >
          {selectedData ? "Edit" : "Submit"}
        </button>
        <DataList
          dataList={dataList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <MapBox onMapClick={onMapClick} />
    </div>
  );
};

const MapBox = ({ onMapClick }) => {
  return (
    <div style={{ flex: 1, height: "400px" }}>
      <GoogleMapReact
        defaultCenter={{ lat: 40.7128, lng: -74.006 }}
        defaultZoom={12}
        onClick={onMapClick}
      ></GoogleMapReact>
    </div>
  );
};

const DataList = ({ dataList, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {dataList.map((data, index) => (
          <li key={index}>
            <p>Input 1: {data.input1}</p>
            <p>Input 2: {data.input2}</p>
            <p>Input 3 (Latitude): {data.input3}</p>
            <p>Input 4 (Longitude): {data.input4}</p>
            <p>Input 5: {data.input5}</p>
            <p>Input 6: {data.input6}</p>
            <button onClick={() => onEdit(data)}>Edit</button>
            <button onClick={() => onDelete(data)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

const containerStyle = {
  display: "flex",
};

const inputStyle = {
  backgroundColor: "lightgrey",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "56%",
  marginTop: 12,
  marginLeft: 23,
};

const labelStyle = {
  fontWeight: "bold",
};

const input = {
  height: 29,
};
