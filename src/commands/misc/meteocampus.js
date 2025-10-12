const blankEmbedField = require("../../utils/embeds/blankEmbedField");
const embedCreator = require("../../utils/embeds/embedCreator");
const linkButtonCreator = require("../../utils/buttonCreators/linkButtonCreator");

const convertFarenheightToCelsius = (temp) => {
  return (temp - 32) * (5 / 9);
};

const {
  // Si la commande requiert des paramètres
  ApplicationCommandOptionType,

  // Si la commande requiert des permissions pour être utilisée par l'utilisateur **OU** Si le bot à besoin de permission pour
  // éxécuter la commande
  PermissionFlagsBits,
  ActionRowBuilder,
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
    // On récupère le jour (et l'heure) dont l'utilisateur souhaite connaitre la météo
    const weatherDay = interraction.options.getString("jour");
    const specifiedHour = interraction.options.getString("heure");

    // On récupère le jour et l'heure actuelle
    // 0 = Sunday | 1 = Monday ...
    let rawCurrentDay = new Date().getDay();
    let rawCurrentHour = new Date().getHours();

    // On calcule l'indice auquel on doit se rendre dans le résultat de la requête API pour le jours (et les heures)
    // Pour les heures, l'indice retourné est celui du début (heure 1), il faut donc prendre l'élément en position index et index + 1
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

    // On revoie une erreur si l'heure demandée est dans plus de 12h
    if (
      specifiedHour &&
      (requestHourRangeStartIndex + 1 >= 12 || requestCurrentDayIndex != 0)
    ) {
      await interraction.reply(
        "Impossible de charger une météo plus de 12h à l'avance"
      );
      return;
    }

    // On renvoie une erreur si le jour demandé est dans plus de 5 jours
    if (requestCurrentDayIndex > 5) {
      await interraction.reply(
        "Impossible de cahrger une météo plus de 5 jours à l'avance"
      );
      return;
    }

    // On défini la requête API (en fonction de si l'heure est spécifiée)
    const weatherURL = !specifiedHour
      ? "https://dataservice.accuweather.com/forecasts/v1/daily/5day/131928"
      : "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/131928";

    // On défini la requête API pour l'image satellite sur le site de Gradignan
    const radarURL =
      "https://dataservice.accuweather.com/imagery/v1/maps/radsat/1024x1024/131928";

    // On défini les options pour notre requête API (headers)
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.WEATHER_API_KEY}`,
        "Accept-Encoding": "gzip",
      },
    };

    // On défini nos variables pour stocker les résultats API
    let APIData;
    let imageryURL;
    let weatherLinkURL;

    // On récupère les données API
    await fetch(weatherURL, options)
      .then((response) => {
        // En cas d'erreur
        if (!response.ok) {
          console.log("Error: status ->", response.status);
          throw new Error("Error while fetching weather data");
        }

        // On rend le résultat de la requête exploitable
        return response.json();
      })
      .then((data) => {
        // On stocke le résulat dans nos variables
        APIData = data;

        // A FAIRE -> IMPLÉMENTATION LIEN
        //weatherLinkURL = data.Headline.Link;
      })
      .catch((error) => {
        // En cas d'erreur
        console.error("Error while fetching data", error);
      });

    // On récupère l'image satellite
    await fetch(radarURL, options)
      .then((response) => {
        // En cas d'erreur
        if (!response.ok) {
          console.log("Error: status ->", response.status);
          throw new Error("Error while fetching radar data");
        }

        // On rend le résultat de la requête exploitable
        return response.json();
      })
      .then((data) => {
        // On stocke le résultat de notre requête dans nos variables
        imageryURL = data.Satellite.Images[0].Url;
      })
      .catch((error) => {
        // En cas d'erreur
        console.error("Error while fetching data", error);
      });

    // On convertit le résultat du jour actuel (0-6) en chaîne de caractères
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

    // On défini la description de notre embed en fonction de si une heure est passée en paramètres
    const embedDescription = specifiedHour
      ? `Prévisions météos sur le campus pour la journée de ${weatherStringDay} dans la plage horraire ${specifiedHour}h00 à ${
          parseInt(specifiedHour) + 2
        }h00.`
      : `Prévisions météo pour la journée de ${weatherStringDay}.`;

    // On défini nos variables pour notre embed
    let embed;

    // Chemin vers l'icone du thumbnail
    let filePath;

    // Numéro d'icone pour le thumbnail
    let iconNumber;

    // Embed spécifique si une heure est passée en paramètres
    if (specifiedHour) {
      // On défini le lien vers les informations complémentaires
      weatherLinkURL = APIData[requestHourRangeStartIndex].Link;

      // On récupère le numéro d'icone
      iconNumber = APIData[requestHourRangeStartIndex].WeatherIcon;

      // On récupère le chemin vers notre icone
      const path = require("path");
      filePath = path.join(
        __dirname,
        `../../../assets/weatherIcons/${iconNumber}.png`
      );

      // On créer notre embed
      embed = embedCreator(
        interraction,
        "#0000FF",
        "Prévisions Méteo",
        embedDescription,
        `attachment://${iconNumber}.png`,
        imageryURL
      ).addFields(
        // On ajoute nos Champs
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
      // Si aucune heure fournie

      // On défini le lien vers la page météo
      weatherLinkURL = APIData.DailyForecasts[requestCurrentDayIndex].Link;

      // On récupère le numéro d'icone
      iconNumber = APIData.DailyForecasts[requestCurrentDayIndex].Day.Icon;

      // On récupère le chemin vers notre icone
      const path = require("path");
      filePath = path.join(
        __dirname,
        `../../../assets/weatherIcons/${iconNumber}.png`
      );

      // On créer notre embed
      embed = embedCreator(
        interraction,
        "#0000FF",
        "Prévisions méteos",
        embedDescription,
        `attachment://${iconNumber}.png`,
        imageryURL
      ).addFields(
        // On ajoute nos champs
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

    // On créer notre ligne de composants
    const row = new ActionRowBuilder();

    // On ajoute notre lien vers le site météo
    row.addComponents(linkButtonCreator("", "Plus de détails", weatherLinkURL));

    // On envoie notre embed en lui passant notre image thumbnail
    interraction.reply({
      content: "",
      embeds: [embed],
      components: [row],
      files: [filePath],
    });
  },
};
