import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge, IconButton } from "@mui/material";
import { AddShoppingCart } from "@material-ui/icons";

function Home() {
  let history = useNavigate();
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    const newEmployes = data.filter((emp) => emp.id !== id);
    setData(newEmployes);
    localStorage.setItem("emoployees", JSON.stringify(newEmployes));
    history("/");
  };

  useEffect(() => {
    const cacheEmployee = localStorage.getItem("emoployees");
    setData(JSON.parse(cacheEmployee));
  }, []);

  return (
    <>
      <div className="container mt-5">
        <IconButton aria-label="Add to Cart">
          <Badge badgeContent={data?.length} color="error">
            <Link to="/cart" className="text-decoration-none">
              <AddShoppingCart style={{ color: "red" }} />
            </Link>
          </Badge>
        </IconButton>

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Serial NO</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.Name}</td>
                  <td>{item.Lname}</td>
                  <td>{item.Age}</td>
                  <td>{item.Email}</td>
                  <td>{item.Number}</td>
                  <td>
                    <Link to={`/edit/${item.id}`}>
                      <Button size="sm">EDIT</Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(item.id)}
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

        <Link to="/create" className="d-grid gap-2">
          <Button size="lg">Create</Button>
        </Link>
      </div>
    </>
  );
}

export default Home;
