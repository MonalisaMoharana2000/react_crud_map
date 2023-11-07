import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Api from "./Api";

const App = () => {
  const [input1Value, setInput1Value] = useState("");
  console.log("inputValue--->", input1Value);
  const [input2Value, setInput2Value] = useState("");
  const [input3Value, setInput3Value] = useState("");
  const [input4Value, setInput4Value] = useState("");
  const [input5Value, setInput5Value] = useState("");
  const [input6Value, setInput6Value] = useState("");
  const [dataList, setDataList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  console.log("selectedData--------->", selectedData);

  const fetchData = async () => {
    const response = await Api.get("/getPost");
    console.log("response--->", response.data);
    setDataList(response.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

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

  const handleDataSubmit = async () => {
    try {
      if (selectedData) {
        const body = {
          stopName: input1Value,
          stopAddress: input2Value,
          lattitude: input3Value,
          longitude: input4Value,
          pickupPrice: input5Value,
          dropPrice: input6Value,
        };
        console.log("update body--->", body);
        const response = await Api.put(`updatePost/${selectedData._id}`, body);
        console.log("updatedDataList---->", response.data, response.status);
        if (response.status === 200) {
          alert("Updated Successfully !");
          fetchData();
        }
        // setDataList(updatedDataList);
        // setSelectedData(null);
      } else {
        const body = {
          stopName: input1Value,
          stopAddress: input2Value,
          lattitude: input3Value,
          longitude: input4Value,
          pickupPrice: input5Value,
          dropPrice: input6Value,
        };
        // setDataList([...dataList, newData]);

        const response = await Api.post("/createPost", body);
        console.log("createresponse----->", response.data, response.status);
        if (response.status === 200) {
          alert("Created Successfully !");
          fetchData();
        }
      }

      setInput1Value("");
      setInput2Value("");
      setInput3Value("");
      setInput4Value("");
      setInput5Value("");
      setInput6Value("");
    } catch (err) {
      alert("Failed !");
    }
  };

  const handleEdit = (data) => {
    setInput1Value(data.stopName);
    setInput2Value(data.stopAddress);
    setInput3Value(data.lattitude);
    setInput4Value(data.longitude);
    setInput5Value(data.pickupPrice);
    setInput6Value(data.dropPrice);
    setSelectedData(data);
  };

  const handleDelete = async (data) => {
    console.log("data==>", data);
    if (window.confirm("Are you sure you want to delete this data?")) {
      // const updatedDataList = dataList.filter((item) => item !== data);
      // setDataList(updatedDataList);

      const response = await Api.get(`/deletePost/${data._id}`);
      console.log("delte--->", response, response.data);
      if (response.status === 200) {
        alert("Deleted Successfully !");
        fetchData();
      }
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
            <p>Input 1: {data.stopName}</p>
            <p>Input 2: {data.stopAddress}</p>
            <p>Input 3 (Latitude): {data.lattitude}</p>
            <p>Input 4 (Longitude): {data.longitude}</p>
            <p>Input 5: {data.pickupPrice}</p>
            <p>Input 6: {data.dropPrice}</p>
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
