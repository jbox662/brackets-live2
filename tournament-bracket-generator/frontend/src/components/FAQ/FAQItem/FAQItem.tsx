import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import { Box, Typography } from "@mui/material";
import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";

type FAQItemProps = {
  header: string;
  body: string;
  link?: string;
};

export const FAQItem = ({ header, body, link }: FAQItemProps) => {
  const [isSectionDisplayed, setIsSectionDisplayed] = useState<boolean>(false);

  const setSectionVisibility = () => {
    setIsSectionDisplayed(!isSectionDisplayed);
  };

  return (
    <Box className="faq__item">
      <header className="faq__item__header" onClick={setSectionVisibility}>
        <span>{header}</span>
        <ArrowDownwardOutlinedIcon
          className={classNames({
            active: isSectionDisplayed,
          })}
        />
      </header>

      {isSectionDisplayed ? (
        <Box mt={3}>
          <Typography>
            {body}{" "}
            {link ? (
              <Link to={link}>
                <strong>Click here for more info.</strong>
              </Link>
            ) : null}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};
