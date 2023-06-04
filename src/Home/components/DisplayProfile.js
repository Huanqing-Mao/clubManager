import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Divider } from "antd";
import { Card, Space } from "antd";

export default function UpdateProfile({ userID }) {
  const [data, setData] = useState(null);

  async function fetchDataById(userId) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userId)
        .single();
      console.log(data);

      if (error) {
        console.error("Error fetching username:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error fetching username:", error);
      return null;
    }
  }
  useEffect(() => {
    const getData = async () => {
      const userData = await fetchDataById(userID);
      if (userData) {
        setData(userData);
      }
    };
    getData();
  }, [userID]);

  return (
    <div className="DisplayProfile">
      <h1>My Profile </h1>
      <Card title="Personal Email" size="small">
        <p className="info">{data ? data.email : "Loading..."}</p>
      </Card>
      <br />
      <Card title="Name" size="small">
        <p className="info">{data ? data.name : "Loading..."}</p>
      </Card>
      <br />

      <Card title="Year" size="small">
        <p className="info">{data ? data.year : "Loading..."} </p>
      </Card>
      <br />

      <Card title="Faculty" size="small">
        <p className="info">{data ? data.faculty : "Loading..."} </p>
      </Card>
      <br />

      <Card title="Prior Experience" size="small">
        <p className="info">{data ? data.prior_experience : "Loading..."} </p>
      </Card>
    </div>
  );
}
