import React, { useEffect, useState } from "react";
import { getOrgData } from "./helper";
import { getEmployees } from "./operations";

const Card = ({ data }) => {
  return (
    <ul>
      {data && data.map((item) => (
        <li key={item._id}>
          <div className="card bg-transparent border-0 p-0">
            <div className="card-body">
              <h4>{item.name}</h4>
              <p>{item.role}</p>
            </div>
            <div></div>
          </div>
          {item.children?.length && <Card data={item.children} />}
        </li>
      ))}
    </ul>
  );
};


const OrganizationChart = ({

}) => {

  const [data, setEmployeeData] = useState()

  useEffect(() => {
    getEmployees().then((res) => {
      if (res.success) {
        setEmployeeData(getOrgData(res.data))
      }
    })
  }, [])

  return (
    <>
      <h1>Organization Chart</h1>
      <div className="org-tree p-3">
        {
          data &&
          <Card data={data} />
        }
      </div>
    </>
  )
}

export default OrganizationChart