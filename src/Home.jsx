import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <Link to="/UserCreator">Log In</Link>
    </>
  );
};

export default Home;
