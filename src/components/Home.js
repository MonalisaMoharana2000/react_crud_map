import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge, IconButton } from "@mui/material";
import { AddShoppingCart, Timer10 } from "@material-ui/icons";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import BloodtypeIcon from "@mui/icons-material/Bloodtype";

function Home() {
  const [data, setData] = useState([]);
  console.log("data--->", data);
  const [empId, setEmpId] = useState("");
  console.log("empId--->", empId);
  const [empName, setEmpName] = useState("");
  const [empAge, setEmpAge] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [selectedData, setSelectedData] = useState({});
  console.log("selectedData--->", selectedData);

  const handleChange1 = (e) => {
    setEmpId(e.target.value);
  };

  const handleChange2 = (e) => {
    setEmpName(e.target.value);
  };

  const handleChange3 = (e) => {
    setEmpAge(e.target.value);
  };

  const handleChange4 = (e) => {
    setEmpEmail(e.target.value);
  };

  const handleSubmit = () => {
    console.log("all click");
    if (
      empName.length === 0 ||
      empAge.length === 0 ||
      empEmail.length === 0 ||
      empId.length === 0
    ) {
      alert("All Field Required");
    } else {
      setData((prevData) => [
        ...prevData,
        { empId, empName, empAge, empEmail },
      ]);
      setEmpId("");
      setEmpName("");
      setEmpAge("");
      setEmpEmail("");
    }
  };

  const handleUpdate = (item) => {
    console.log("update check--->", item);
    setEmpId(item.empId);
    setEmpName(item.empName);
    setEmpAge(item.empAge);
    setEmpEmail(item.empEmail);
    setSelectedData(item);
  };

  const handleUpdateData = () => {
    if (
      empName.length === 0 ||
      empAge.length === 0 ||
      empEmail.length === 0 ||
      empId.length === 0
    ) {
      alert("All Fields Required");
    } else {
      if (selectedData) {
        const updatedData = data.map((item) =>
          item === selectedData
            ? {
                empId,
                empName,
                empAge,
                empEmail,
              }
            : item
        );
        setData(updatedData);
        console.log("updatedData--->", updatedData);
      }
    }
  };

  const handleDelete = (id) => {
    console.log("deleted data----->", id);
    const deletedData = data.filter((x, index) => index + 1 !== id);
    console.log("deletedData2--->", deletedData);
    setData(deletedData);
  };

  return (
    <>
      <div className="container mt-5" style={{ marginTop: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">AMBULA</Typography>
          </Toolbar>
          {/* <Button
            variant="contained"
            color="primary"
            startIcon={<LocalPharmacyIcon />}
          >
            Alarm
          </Button> */}
        </AppBar>
        <div style={{ marginTop: 12 }}>
          <TextField
            label="Enter EmpId"
            variant="outlined"
            value={empId}
            type="number"
            onChange={handleChange1}
          />
        </div>

        <div>
          <TextField
            style={{ marginTop: 12 }}
            label="Enter Name"
            variant="outlined"
            value={empName}
            onChange={handleChange2}
          />
        </div>

        <div>
          <TextField
            style={{ marginTop: 12 }}
            label="Enter Age"
            variant="outlined"
            value={empAge}
            type="number"
            onChange={handleChange3}
          />
        </div>

        <div>
          <TextField
            style={{ marginTop: 12 }}
            label="Enter Email"
            variant="outlined"
            value={empEmail}
            type="email"
            onChange={handleChange4}
          />
        </div>
        {Object.keys(selectedData).length > 0 ? (
          <Button
            size="lg"
            onClick={handleUpdateData}
            style={{ marginTop: 12 }}
          >
            Edit
          </Button>
        ) : (
          <Button size="lg" onClick={handleSubmit} style={{ marginTop: 12 }}>
            Create
          </Button>
        )}
        <Table
          responsive
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: 12 }}
        >
          <thead>
            <tr>
              <th>Serial NO</th>
              <th>Userid</th>
              <th>Username</th>
              <th>empAge</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* <dataList
              data={data}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            /> */}
            {data && data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{item.empId}</td>
                  <td>{item.empName}</td>
                  <td>{item.empAge}</td>
                  <td>{item.empEmail}</td>

                  <td>
                    <Button size="sm" onClick={() => handleUpdate(item)}>
                      EDIT
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(index + 1)}
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

const dataList = ({ data, handleUpdate, handleDelete }) => {
  {
    data && data?.length > 0 ? (
      data.map((item, index) => (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{item.empId}</td>
          <td>{item.empName}</td>
          <td>{item.empAge}</td>
          <td>{item.empEmail}</td>

          <td>
            <Button size="sm" onClick={() => handleUpdate(item)}>
              EDIT
            </Button>

            <Button
              size="sm"
              variant="danger"
              onClick={() => handleDelete(index + 1)}
            >
              DELETE
            </Button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="7">No data available</td>
      </tr>
    );
  }
};

export default Home;
