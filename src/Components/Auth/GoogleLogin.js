import React from 'react';

export default function LoginPage() {
  const loginWithGoogle = () => {
    window.open("http://localhost:5000/api/auth/google", "_self");
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card col-md-4 text-center" style={{width:"20rem"}}>
        <div className="card-body">
          <h5 className="card-title">Login with Google</h5>
          <button className="btn btn-danger btn-block" onClick={loginWithGoogle}>
            <i className="fab fa-google mr-2"></i> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
