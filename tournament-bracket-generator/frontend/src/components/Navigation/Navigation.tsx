import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getData } from "../../api/axios";
import "./Navigation.scss";

type Links = {
  name: string;
  href: string;
};

const LINKS: Links[] = [
  { name: "Home", href: "/" },
  { name: "Registration", href: "/players-registration" },
  { name: "Fixtures", href: "/fixtures" },
  { name: "Group Stage", href: "/group-stage" },
  { name: "Knockout Stage", href: "/knockout-stage" },
  { name: "Tournament Info", href: "/tournament-info" },
  { name: "Feedback", href: "/feedback" },
];

export const Navigation = () => {
  const [isRegistrationOpened, setIsRegistrationOpened] =
    useState<boolean>(true);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 1150px)");

  useEffect(() => {
    const getDataAboutRegistrationStatus = () => {
      getData("registration-status/").then((response) => {
        setIsRegistrationOpened(response.data.results[0].status);
      });
    };

    getDataAboutRegistrationStatus();

    isMenuOpened
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");

    !isMobile && setIsMenuOpened(false);
  }, [location.pathname, isMenuOpened, isMobile]);

  const handleMobileMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  return (
    <Box
      className={classNames("navigation-container", {
        "is-desktop": !isMobile,
      })}
    >
      <h1 className="navigation-container__title">
        <Link to={"/"}>FC24 Victory Cup</Link>
      </h1>

      {isMobile && (
        <Box className="menu-icon" onClick={handleMobileMenu}>
          {isMenuOpened ? <CloseIcon /> : <MenuIcon />}
        </Box>
      )}

      <ul
        className={classNames("navigation-container__list", {
          "mobile-view": isMobile,
          opened: isMenuOpened,
        })}
      >
        {LINKS.map(({ name, href }) => {
          if (
            isRegistrationOpened &&
            (name === "Group Stage" ||
              name === "Knockout Stage" ||
              name === "Fixtures" ||
              name === "Feedback")
          ) {
            return null;
          } else {
            return (
              <li
                key={`Link name - ${name}`}
                className={classNames("navigation-container__item", {
                  "mobile-list-item": isMenuOpened,
                })}
              >
                <Link
                  to={`${href}`}
                  onClick={() => isMobile && setIsMenuOpened(false)}
                  className={classNames("navigation-container__item__link", {
                    active: location.pathname === href,
                  })}
                >
                  {name}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </Box>
  );
};
