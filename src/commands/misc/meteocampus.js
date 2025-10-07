const blankEmbedField = require("../../utils/embeds/blankEmbedField");
const embedCreator = require("../../utils/embeds/embedCreator");

const convertFarenheightToCelsius = (temp) => {
  return (temp - 32) * (5 / 9);
};

const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
} = require("discord.js");
const embedField = require("../../utils/embeds/embedField");

module.exports = {
  // Nom de la commande
  name: "meteocampus",

  // Description de la commande
  description: "aa",

  // Paramètres de la commande
  options: [
    {
      name: "jour",
      description: "Météo pour un jour précis de la semaine",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "Lundi", value: "1" },
        { name: "Mardi", value: "2" },
        { name: "Mercredi", value: "3" },
        { name: "Jeudi", value: "4" },
        { name: "Vendredi", value: "5" },
      ],
    },
    {
      name: "heure",
      description:
        "Météo pour une heure précise de la semaine (si non spécifiée = journée complète)",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "08h00", value: "8" },
        { name: "10h00", value: "10" },
        { name: "12h00", value: "12" },
        { name: "14h00", value: "14" },
        { name: "16h00", value: "16" },
        { name: "18h00", value: "18" },
      ],
    },
  ],

  // Permissions requises pour l'utilisateur éxécutant la commande
  permissionsRequired: [],

  // Permissions requises pour que le bot puisse éxécuter la commande
  botPermissions: [PermissionFlagsBits.Administrator],

  // Optionel: Active la commande uniquement sur le testServer configuré dans config.json
  testOnly: false,

  // Optionnel: Active la commande uniquement pour les développeurs ajoutés dans config.json
  devOnly: false,

  // Action de la commande sous forme de fonction (prenant toujours ces 2 paramètres)
  callback: async (client, interraction) => {
    const weatherDay = interraction.options.getString("jour");
    const specifiedHour = interraction.options.getString("heure");
    console.log(specifiedHour);
    // 0 = Sunday | 1 = Monday ...
    let rawCurrentDay = new Date().getDay();
    let rawCurrentHour = new Date().getHours();
    console.log("Raw Current Hour", rawCurrentHour);
    console.log("Specified Hour", parseInt(specifiedHour));
    const requestCurrentDayIndex = Math.abs(
      parseInt(weatherDay) < rawCurrentDay
        ? 7 - rawCurrentDay + parseInt(weatherDay)
        : parseInt(weatherDay) - rawCurrentDay
    );
    const requestHourRangeStartIndex = Math.abs(
      parseInt(specifiedHour) < rawCurrentHour
        ? 24 - rawCurrentHour + parseInt(specifiedHour)
        : parseInt(specifiedHour) - rawCurrentHour
    );

    if (requestHourRangeStartIndex + 1 >= 12) {
      await interraction.reply(
        "Impossible de charger une météo plus de 12h à l'avance"
      );
      return;
    }
    if (requestCurrentDayIndex > 5) {
      await interraction.reply(
        "Impossible de cahrger une météo plus de 5 jours à l'avance"
      );
      return;
    }

    console.log("Continued");
    console.log("DAY INDEX:", requestCurrentDayIndex);

    console.log("HOUR INDEX:", requestHourRangeStartIndex);
    const weatherURL = !specifiedHour
      ? "https://dataservice.accuweather.com/forecasts/v1/daily/5day/131928"
      : "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/131928";
    const radarURL =
      "https://dataservice.accuweather.com/imagery/v1/maps/radsat/1024x1024/131928";
    console.log(weatherURL);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.WEATHER_API_KEY}`,
        "Accept-Encoding": "gzip",
      },
    };

    let APIData;
    let imageryURL;
    let weatherLinkURL;
    await fetch(weatherURL, options)
      .then((response) => {
        if (!response.ok) {
          console.log("Error: status ->", response.status);
          throw new Error("Error while fetching weather data");
        }
        console.log("Response is OK");
        return response.json();
      })
      .then((data) => {
        APIData = data;
        console.log(APIData[requestCurrentDayIndex]);
        //weatherLinkURL = data.Headline.Link;
        // console.log("Link:", weatherLinkURL);
      })
      .catch((error) => {
        console.error("Error while fetching data", error);
      });

    await fetch(radarURL, options)
      .then((response) => {
        if (!response.ok) {
          console.log("Error: status ->", response.status);
          throw new Error("Error while fetching radar data");
        }
        console.log("Response is OK");
        return response.json();
      })
      .then((data) => {
        imageryURL = data.Satellite.Images[0].Url;
        console.log(APIData[requestCurrentDayIndex]);
        //weatherLinkURL = data.Headline.Link;
        // console.log("Link:", weatherLinkURL);
      })
      .catch((error) => {
        console.error("Error while fetching data", error);
      });

    console.log("--- FORECAST ---");
    if (specifiedHour) {
      console.log(
        APIData.slice(
          requestHourRangeStartIndex,
          requestHourRangeStartIndex + 2
        )
      );
    } else {
      console.log(APIData.DailyForecasts[requestCurrentDayIndex]);
    }

    let weatherStringDay;
    switch (weatherDay) {
      case "1":
        weatherStringDay = "Lundi";
        break;
      case "2":
        weatherStringDay = "Mardi";
        break;
      case "3":
        weatherStringDay = "Mercredi";
        break;
      case "4":
        weatherStringDay = "Jeudi";
        break;
      case "5":
        weatherStringDay = "Vendredi";
        break;
      default:
        weatherStringDay = "Erreur";
        break;
    }
    const embedDescription = specifiedHour
      ? `Prévisions météos sur le campus pour la journée de ${weatherStringDay} dans la plage horraire ${specifiedHour}h00 à ${
          parseInt(specifiedHour) + 2
        }h00.`
      : `Prévisions météo pour la journée de ${weatherStringDay}.`;

    let embed;
    let filePath;
    let iconNumber;
    if (specifiedHour) {
      iconNumber = APIData[requestHourRangeStartIndex].WeatherIcon;
      const path = require("path");
      filePath = path.join(
        __dirname,
        `../../../assets/weatherIcons/${iconNumber}.png`
      );
      embed = embedCreator(
        interraction,
        "#0000FF",
        "Prévisions Méteo",
        embedDescription,
        `attachment://${iconNumber}.png`,
        imageryURL
      ).addFields(
        blankEmbedField(),
        embedField(
          "Durée de la prévision",
          `${parseInt(specifiedHour)}h00 -> ${parseInt(specifiedHour) + 2}h00`,
          true
        ),
        embedField(
          "Précipitations",
          `${
            (APIData[requestHourRangeStartIndex].PrecipitationProbability +
              APIData[requestHourRangeStartIndex + 1]
                .PrecipitationProbability) /
            2
          }%`,
          true
        ),
        embedField(
          "Température",
          `${Math.round(
            convertFarenheightToCelsius(
              (APIData[requestHourRangeStartIndex].Temperature.Value +
                APIData[requestHourRangeStartIndex + 1].Temperature.Value) /
                2
            )
          )}°C`
        ),
        blankEmbedField()
      );
    } else {
      iconNumber = APIData.DailyForecasts[requestCurrentDayIndex].Day.Icon;
      const path = require("path");
      filePath = path.join(
        __dirname,
        `../../../assets/weatherIcons/${iconNumber}.png`
      );
      embed = embedCreator(
        interraction,
        "#0000FF",
        "Prévisions méteos",
        embedDescription,
        `attachment://${iconNumber}.png`,
        imageryURL
      ).addFields(
        blankEmbedField(),
        embedField("Durée de la prévision", `Journée entière`, true),
        embedField(
          "Précipitations",
          `${
            APIData.DailyForecasts[requestCurrentDayIndex].Day.HasPrecipitation
              ? "Oui"
              : "Non"
          }`,
          true
        ),
        embedField(
          "Température",
          `Min: ${Math.round(
            convertFarenheightToCelsius(
              APIData.DailyForecasts[requestCurrentDayIndex].Temperature.Minimum
                .Value
            )
          )}°C \n Max: ${Math.round(
            convertFarenheightToCelsius(
              APIData.DailyForecasts[requestCurrentDayIndex].Temperature.Maximum
                .Value
            )
          )}°C \n Moy: ${Math.round(
            convertFarenheightToCelsius(
              (APIData.DailyForecasts[requestCurrentDayIndex].Temperature
                .Minimum.Value +
                APIData.DailyForecasts[requestCurrentDayIndex].Temperature
                  .Maximum.Value) /
                2
            )
          )}°C`
        ),
        blankEmbedField()
      );
    }

    interraction.reply({
      content: "",
      embeds: [embed],
      files: [filePath],
    });
  },
};
