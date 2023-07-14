import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { Divider } from "antd";
import { Card, Button } from "antd";
import MyCCAs from "./MyOrganisations/MyCCAs";

export default function UpdateProfile({ userID }) {
  const [data, setData] = useState(null);
  const [ccas, setCCAs] = useState([]);
  const [ccaNamesRoles, setCCANamesRoles] = useState([]);

  async function getCCARoles(userID) {
    console.log("fetching...");
    console.log("userid:", userID);

    const { data, error } = await supabase
      .from("Records")
      .select("user_id, cca_id, manager")
      .eq("user_id", userID);

    if (error) {
      // Handle the error
      console.error(error);
      //console.log("UNDEFINED");
    }

    if (data.length > 0) {
      // CCA name found
      console.log(data);
      setCCAs(data);
    }

    // CCA not found
  }

  async function getCCAName(ccaID) {
    console.log("fetching...");

    const { data, error } = await supabase
      .from("CCA")
      .select("cca_name")
      .eq("cca_id", ccaID);

    if (error) {
      // Handle the error
      console.error(error);
      return "UNDEFINED";
    }

    if (data.length > 0) {
      // CCA name found
      const ccaName = data[0].cca_name;
      console.log(ccaName);
      //console.log(typeof ccaName);

      return ccaName;
    } else {
      return "NO CCA";
    }

    // CCA not found
  }

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
        console.log("data:", userData);
        setData(userData);
      }
    };
    getData();
    getCCARoles(userID);
  }, [userID]);

  useEffect(() => {
    const fetchCCANames = async () => {
      if (ccas) {
        const resolvedNames = [];
        for (const item of ccas) {
          const ccaName = await getCCAName(item.cca_id);
          resolvedNames.push([ccaName, item.manager]);
        }
        setCCANamesRoles(resolvedNames);
      } else {
        setCCANamesRoles(["NO CCAs Yet!"]);
      }
    };

    fetchCCANames();
  }, [ccas]);

  return (
    <div className="DisplayProfile">
      <h1>My Profile </h1>

      <Divider
        orientation="left"
        orientationMargin="0"
        style={{ fontSize: "25px" }}
      >
        My Organisations
      </Divider>
      <MyCCAs ccaNamesRoles={ccaNamesRoles} data={data} />
      <Divider
        orientation="left"
        orientationMargin="0"
        style={{ fontSize: "25px" }}
      >
        My Personal Information
      </Divider>

      <Card title="Personal Email" size="small">
        {data ? data.email : "Loading..."}
      </Card>
      <br />

      <Card title="Name" size="small">
        {data ? data.name : "Loading..."}
      </Card>
      <br />

      <Card title="Year" size="small">
        {data ? data.year : "Loading..."}
      </Card>
      <br />

      <Card title="Faculty" size="small">
        {data ? data.faculty : "Loading..."}
      </Card>
      <br />

      <Card title="Prior Experience" size="small">
        {data ? data.prior_experience : "Loading..."}
      </Card>
    </div>
  );
}
