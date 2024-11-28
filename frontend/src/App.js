import { useLocation, useNavigate } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Routers from "./Routers";
import Footer from "./components/footer/Footer";
import "./App.css";
import Theme from "./contexts/ThemeContext";
import { ModeProvider } from "./contexts/ModeContext";
import NavBox from "../src/components/navbar/NavBox";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { logout } from "./slices/TokenSlice";
import { errorToast } from "./helpers/AlertToasty";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const transitions = useTransition(location, {
    key: location.pathname,
    from: { opacity: 0, transform: "rotateY(90deg)" },
    enter: { opacity: 1, transform: "rotateY(0deg)" },
    leave: { opacity: 0, transform: "rotateY(-90deg)" },
    config: { duration: 500 },
  });

  //Auto Logout after 4 hours
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { exp } = jwtDecode(token); // Token expiration time
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (exp < currentTime) {
          // If the token has already expired, log out immediately
          dispatch(logout());
          navigate("/login");
        } else {
          // Time until the token expires in milliseconds
          const timeUntilLogout = exp * 1000 - Date.now();
          // Set a timer for this time
          const timerId = setTimeout(() => {
            dispatch(logout());
            navigate("/login");
          }, timeUntilLogout);
          // Clear the timer when the component unmounts
          return () => clearTimeout(timerId);
        }
      } catch (error) {
        errorToast(`Error decoding the token: ${error.message || error}`);
        dispatch(logout());
        navigate("/login");
      }
    }
  }, [dispatch, navigate]);

  return (
    <Theme>
      <ModeProvider>
        <div className='App'>
          <NavBox />
          {transitions((props, item) => (
            <animated.div style={props}>
              <div className='app'>
                <Routers location={item} />
              </div>
            </animated.div>
          ))}
          <Footer />
        </div>
      </ModeProvider>
    </Theme>
  );
}

export default App;
