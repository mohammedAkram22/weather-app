import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
// External Libraries
import axios from "axios";

import { useTranslation } from "react-i18next";
import { dir } from "i18next";

export default function Weather() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("ar");
  const [currentTemp, setCurrentTemp] = useState({
    number: 0,
    description: "",
    min: null,
    max: null,
    iconUrl: "",
  });

  const dateAndTime = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  //================ Event Handlers ================

  function handleLangSwitch() {
    if (lang == "ar") {
      i18n.changeLanguage("en");
      setLang("en");
    } else {
      i18n.changeLanguage("ar");
      setLang("ar");
    }
  }

  useEffect(() => {
    i18n.changeLanguage(lang);
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=31.5017&lon=34.4531&appid=4cd7f7a8ad62d29ce5112ff44bc1a5a9&units=metric",
      )
      .then((response) => {
        const temp = response.data.main.temp;
        const min = response.data.main.temp_min;
        const max = response.data.main.temp_max;
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;

        setCurrentTemp({
          number: temp,
          min: min,
          max: max,
          description: description,
          iconUrl: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Request completed");
      });
  }, []);
  return (
    <div dir={lang == "en" ? "ltr" : "rtl"}>
      <Box>
        <Card
          sx={{
            minWidth: 400,
            backgroundColor: "rgba(0, 0, 57, 0.32)",
            backdropFilter: "blur(12px)",
            padding: "0 20px",
            color: "white",
            borderRadius: "20px",
            boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent>
            <Box
              gutterBottom
              sx={{
                fontSize: 14,
                display: "flex",
                alignItems: "end",
                justifyContent: "start",
                gap: "10px",
                padding: "0px 25px",
              }}
            >
              <Typography variant="h4">{t("Gaza")}</Typography>
              <Typography variant="subtitle1">{dateAndTime}</Typography>
            </Box>
            <Divider sx={{ backgroundColor: "white" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "50px",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "35px",
                  }}
                >
                  <Box>
                    <Typography variant="h1">
                      {Math.round(currentTemp.number)}
                    </Typography>
                  </Box>
                  <Box>
                    <img src={currentTemp.iconUrl} />
                  </Box>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "white", fontSize: 20, textAlign: "center" }}
                >
                  {t(currentTemp.description)}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "white", fontSize: 14 }}
                  >
                    {t("Minimum")} :{" "}
                    {currentTemp.min !== null && Math.floor(currentTemp.min)}
                  </Typography>
                  |
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "white", fontSize: 14 }}
                  >
                    {t("Maximum")} :{" "}
                    {currentTemp.max !== null && Math.ceil(currentTemp.max)}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <CloudIcon sx={{ fontSize: "200px" }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ textAlign: "end", marginTop: "20px" }}>
          <Button
            variant="outlined"
            sx={{ color: "white", border: "solid 1px white" }}
            onClick={handleLangSwitch}
          >
            {lang == "en" ? "Arabic" : "إنجليزي"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}
