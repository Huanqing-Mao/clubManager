import { supabase } from "./supabase";
import { useState, useEffect, useCallback } from "react";
import { Card } from 'antd';

function Dashboard( { userID, CCAs, setChoice, setManager, choice } ) {

    const chooseCCA = useCallback(
        (ccaID, manager) => {
          setChoice(ccaID);
          console.log("choosing CCA:", ccaID);
          setManager(manager);
          console.log("manager: ", manager);
        },
        [choice]
    );

    console.log('Entered Dashboard');
    

    return(
        <div>
            <h1>CCA Dashboard</h1>
            <h3>Please choose a CCA</h3>
            {CCAs.map((item) => (
                <Card
                style={{ width: 300 }}
                hoverable={true}
                onClick={() => chooseCCA(item.cca_id, item.manager)}>
                    <h1>{item.CCA.cca_name}</h1>
                    <p>{item.cca_id}</p>
                </Card>
            ))}
        </div>
    )
}

export default Dashboard;