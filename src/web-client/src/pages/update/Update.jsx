import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getDocFromCache,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { realtimeDb } from "../../firebase";

const Update = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [values, setValues] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const { sensorId } = useParams();

  const handleInput = (e) => {
    // const id = e.target.id;
    // const value = e.target.value;
    // setData({ ...data, [id]: value });
  };

  const getData = async (docRef) => {
    try {
      const doc = await getDocFromCache(docRef);

      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      console.log("Cached document data:", doc.data());
      setData(doc.data());
      console.log(data);
      setDescription(data.description);
      setName(data.name);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  };

  useEffect(() => {
    const docRef = doc(db, "sensors", sensorId);

    getData(docRef);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const ref = doc(db, "sensors", sensorId);
    await updateDoc(ref, {
      name,
      description,
    });
    navigate(-1);
  };

  // console.log(image);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div>
                <h3>Name</h3>
                <input
                  id="name"
                  type="text"
                  placeholder={data.name}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <h3>Description</h3>
                <textarea
                  id="description"
                  type="text"
                  placeholder={data.description}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>

              <button type="submit">Update sensor data</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
