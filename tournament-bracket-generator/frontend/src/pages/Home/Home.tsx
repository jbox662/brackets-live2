import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import home_features from "../../assets/home_features.jpg";
import home_title from "../../assets/home_title.jpg";
import { FAQ } from "../../components/FAQ/FAQ";
import "./Home.scss";
import { LIST_ITEMS } from "./data/listItemsData";

export const Home = () => {
  return (
    <Box className="home-container">
      <Box mb={5} className="home-top">
        <Box className="home__text">
          <h2 className="home__title">Join the FC24 Victory Cup!</h2>

          <Typography className="home__description">
            Register, compete and keep track of all match data in one place.
            Your journey to glory start here!
          </Typography>
        </Box>

        <Box className="home__image-container">
          <img className="home__image" src={home_title} alt="Title Image" />
        </Box>
      </Box>

      <Box mb={5} className="home__features">
        <Box className="home__feature__image-container">
          <img
            className="home__features__image"
            src={home_features}
            alt="Features Image"
          />
        </Box>

        <Box className="home__features-content">
          <h2 className="home__features-title">Features</h2>

          <ul className="home__features-list">
            {LIST_ITEMS.map(({ title, description }, index) => (
              <li key={`List-item-${index}`}>
                <strong>{title}</strong> {description}
              </li>
            ))}
          </ul>
        </Box>
      </Box>

      <Box mb={5} className="home__cta-container">
        <Typography sx={{ mb: "12px" }}>
          Ready to <strong>kick off</strong> your FC 24 tournament experience?
        </Typography>

        <Link to={"/players-registration"}>
          <Button variant="contained" className="home__cta-button">
            Register Now
          </Button>
        </Link>
      </Box>

      <FAQ />
    </Box>
  );
};
