import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, realtimeDb } from "../../firebase";
import { onValue, ref, set } from "firebase/database";

const Single = () => {
  const [data, setData] = useState({});
  const { sensorId } = useParams();
  const [dataChart, setDataChart] = useState([]);
  const [values, setButtonvalue] = useState(0);

  useEffect(() => {
    onValue(ref(realtimeDb, `${data.uid}/values`), (snapshot) => {
      const fetchedData = snapshot.val();
      let chartValues = [];
      let chartValue = { temp: 0, name: "" };
      let index = 0;
      for (let key in fetchedData) {
        // console.log(fetchedData[key]);
        if (index % 2 === 0) {
          chartValue.temp = fetchedData[key];
        } else {
          const date = new Date(fetchedData[key]);
          // console.log(date)
          chartValue.name = date.toString().substring(16, 24);
          chartValues.push(chartValue);
          // console.log(chartValues)
          chartValue = { temp: 0, name: "" };
        }
        index++;
      }
      // console.log(chartValues)
      setDataChart(chartValues);
    });
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "sensors", sensorId);
      const docSnap = await getDoc(docRef);
      setData(docSnap.data());
    };

    fetchData();
  }, []);

  const handleSetValue = () => {
    set(ref(realtimeDb, `/${data.uid}/`), {
      values,
    });
  };

  // console.log(dataChart);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link
              to={`/sensors/update/${sensorId}`}
              style={{ textDecoration: "none" }}
            >
              <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={"http://localhost:3000/" + data.img}
                alt="icon"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{data.category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">UID:</span>
                  <span className="itemValue">{data.uid}</span>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {data.category === "switch" ? (
              <div className="left switch-item">
                <input
                  type="number"
                  onChange={(e) => setButtonvalue(e.target.value)}
                  value={values}
                />
                <button onClick={handleSetValue}>Set value</button>
              </div>
            ) : (
              <Chart data={dataChart} aspect={3 / 1} title="Data Logs" />
            )}
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
