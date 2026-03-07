"use client";
import { addUser } from "../../../lib/actions";
import styles from "../../../components/users/addUser/addUser.module.css";
import Navbar from "../../../components/dashboard/navbar/navbar";
import { useEffect, useState, useRef, useContext } from "react";
import { authService } from "../../../lib/services/authService";
const AddUserPage = () => {
  // const [DataAreaId, setDataAreaId] = useState(0);
  const [DataRoleId, setDataRoleId] = useState(0);
  const [DataAreaIdrecords, setDataAreaIdRecords] = useState([]);
  const [DataRolesrecords, setDataRolesRecords] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  //const hasFetched = useRef(false); // Prevents duplicate API calls

  const handleCheckboxChange = (optionId) => {
    setSelectedSites((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // if (hasFetched.current) return; // Skip if already fetched
      // hasFetched.current = true;

      try {
        await authService.getDataAreaId().then((u) => {
          // setDataAreaId(u);
          setDataAreaIdRecords(u);
        });

        await authService.getAllRole().then((u) => {
          // setDataRoleId(u);
          setDataRolesRecords(u);
        });
      } catch (error) {
        console.error("Error fetching areaid data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className="flex justify-end">
        <Navbar />
      </div>
      <fieldset className={`border border-gray-700 rounded-lg p-4 `}>
        <legend className="px-2 text-sm font-medium text-green-500">
          Add User
        </legend>

        <form action={addUser} className={styles.form}>
          <input type="text" placeholder="username" name="username" required />
          <input type="email" placeholder="email" name="email" required />
          <input
            type="password"
            placeholder="password"
            name="password"
            required
          />
          {/* <select
            name="dataareaId"
            id="dataareaId"
            value={DataAreaId}
            onChange={(e) => setDataAreaId(e.target.value)}
          >
            <option value="0" disabled>
              Choose a site
            </option>
            {DataAreaIdrecords?.length > 0 ? (
              DataAreaIdrecords.map((id) => (
                <option key={id.Id} value={id.Id}>
                  {id.Id}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select> */}

          <select
            key={"0"}
            name="RoleId"
            id="RoleId"
            value={DataRoleId}
            onChange={(e) => setDataRoleId(e.target.value)}
          >
            <option value="0" disabled>
              Choose a Role
            </option>
            {DataRolesrecords?.length > 0 ? (
              DataRolesrecords.map((id) => (
                <option key={id.id} value={id.id}>
                  {id.role_name}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
          <input type="hidden" id="role_Id" name="role_Id" value={DataRoleId} />

          <input type="phone" placeholder="phone" name="phone" />

          {/* <select name="isAdmin" id="isAdmin" className="h-16">
            <option value={false}>Is Admin?</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select> */}
          <select name="isActive" id="isActive" className="h-16">
            <option value={true}>Is Active?</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
          <textarea
            name="address"
            id="address"
            rows="3"
            placeholder="Address"
          ></textarea>

          <fieldset className={`border border-gray-700 rounded-lg p-8  `}>
            <legend className="px-2 text-sm font-medium text-green-500 ">
              Allow to Access Multiples sites
            </legend>
            {DataAreaIdrecords.map((option) => (
              <div key={option.Id}>
                <label>
                  <input
                    name="siteIds"
                    type="checkbox"
                    checked={selectedSites.includes(option.Id)}
                    onChange={() => handleCheckboxChange(option.Id)}
                  />
                  {option.Id}
                </label>
              </div>
            ))}
          </fieldset>
          <input
            type="hidden"
            id="sitesIds"
            name="sitesIds"
            value={selectedSites}
          />
          <button type="submit">Submit</button>
        </form>
      </fieldset>
    </div>
  );
};

export default AddUserPage;
