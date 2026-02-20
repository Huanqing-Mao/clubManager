import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";

import { Card, Button, Divider, List, Spin, Table } from "antd";

export default function MyCCAs({ ccaNamesRoles, data }) {
  const [load, setLoad] = useState(true);
  console.log("CCANAMES ROLES:", ccaNamesRoles);
  const ccaRoles = ccaNamesRoles.map((item) => {
    return { cca: item[0], role: item[1] ? "Manager" : "Member" };
  });

  const columns = [
    {
      title: "CCA",
      dataIndex: "cca",
      key: "cca"
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role"
    }
  ];

  if (ccaNamesRoles === []) {
    setLoad(false);
  }
  return (
    <div>
      {ccaNamesRoles && ccaNamesRoles.length > 0 ? (
        <div>
          <Table
            loading={data ? false : true}
            dataSource={ccaRoles}
            columns={columns}
            pagination={false}
          />
        </div>
      ) : load ? (
        <Card>
          <p>Loading...</p>
        </Card>
      ) : (
        <Card>
          <p>No Data</p>
        </Card>
      )}
    </div>
  );
}
