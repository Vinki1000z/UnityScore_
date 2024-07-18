import React,{useContext,useEffect} from "react";
import Post from "./Post";
import DashboardContext from "../../createcontext/DashboardContext/DashboardContext";
export default function AllPost() {
  const { Posts,AllPost } = useContext(DashboardContext);
  useEffect(() => {
    AllPost();
    // eslint-disable-next-line
  }, [Posts]);
  return (
    <>
      <div className="card-header">
        <h5 className="mb-0">Posts</h5>
      </div>
      <div className="table-responsive" style={{ alignItems: "center" }}>
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {Posts &&
            Posts.map((singlePost) => 
              (
              <Post key={singlePost._id} singlePost={singlePost} width={"40rem"}/>
            ))}
          {/* <Post width={"40rem"} /> */}
        </div>
      </div>
    </>
  );
}