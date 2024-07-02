import { useContext } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Header, Navbar, Loading } from "../components";
import { CartContext } from "../context/CartContext.jsx";

const HomeLayout = () => {
  const navigation = useNavigation();
  const { user } = useContext(CartContext);
  const isPageLoading = navigation.state === "loading";
  //console.log("user inside home", user.username);
  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default HomeLayout;
