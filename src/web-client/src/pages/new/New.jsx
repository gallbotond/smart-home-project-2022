import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { async } from "@firebase/util";
import { uid } from "uid";
import { set, ref } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { realtimeDb } from "../../firebase";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [values, setValues] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const makeRealTimeDatabaseEntry = (uuid) => {
    set(ref(realtimeDb, `/${uuid}`), {
      values,
    });
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const uuid = uid();
    try {
      await addDoc(collection(db, "sensors"), {
        ...data,
        img: image,
        uid: uuid,
        timeStamp: serverTimestamp(),
      });
      // create uid for every entry, create entry in real-time database
      makeRealTimeDatabaseEntry(uuid);
      navigate(-1);
    } catch (err) {
      console.log(err.message);
    }
  };

  console.log(image);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                !image
                  ? "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  : "http://localhost:3000/" + image
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "radio" ? (
                    input.values.map((value, index) => (
                      <div className="radio" key={index}>
                        <label>{value.name}</label>
                        <div className="category">
                          <input
                            id={input.id}
                            type={input.type}
                            onChange={handleInput}
                            value={value.name}
                            name={input.id}
                            onClick={() => setImage(value.img)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleInput}
                      value={data.input}
                    />
                  )}
                </div>
              ))}
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
