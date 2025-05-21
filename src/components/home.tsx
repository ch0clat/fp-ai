import "bootstrap/dist/css/bootstrap.css";
import DropFileInput from "./DropFileInput";

function Home() {
  return (
    <>
    <div className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">Face Prediction</a>
    </div>
    <div className="container mt-4">
        <h1>Face Prediction</h1>
      <DropFileInput onFileChange={(files) => console.log(files)} />
        </div>
      <>
      </>
    </>
  );
}

export default Home;
