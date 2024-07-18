import React from "react";
import { useParams } from 'react-router-dom';
// import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";
import ProfileView from "./ProfileView";

export default function ProfileDashboard() {
  // const {FindUserId} = useContext(DashboardContext);
  // const [userId, setUserId] = useState();
  const { userId } = useParams();
//   useEffect(()=>{
//     const getUserId=async()=>{
//    setUserId(await FindUserId());
//   }
//   getUserId();
//   // eslint-disable-next-line
// },[])

  return (
    <>
      <ProfileView userId={userId}/>
    </>
  );
}
