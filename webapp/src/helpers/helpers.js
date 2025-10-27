import Vue from "vue";

Vue.prototype.formatMoney = (
  value,
  convertToInt = false,
  includeCurrencySymbol = true
) => {
  const options = {
    currency: "USD",
    maximumFractionDigits: convertToInt ? 0 : 2,
  };

  if (includeCurrencySymbol) {
    options.style = "currency";
  }

  return value.toLocaleString("en-US", options);
};

Vue.prototype.formatRanking = (value) => {
  value = value.toString();
  const pad = "000";
  return pad.substring(0, pad.length - value.length) + value;
};

Vue.prototype.getOpinionColor = (value) => {
  if (value > 170) {
    return "font-weight-bold blue--text";
  } else if (value > 100) {
    return "blue--text text--lighten-2";
  } else if (value < -170) {
    return "font-weight-bold  red--text";
  } else if (value < -50) {
    return "red--text text--lighten-1";
  } else {
    return "yellow--text";
  }
};

Vue.prototype.getOpinionIcon = (value) => {
  if (value > 130) {
    return { color: "blue", icon: "mdi-heart" };
  } else if (value < -130) {
    return { color: "red", icon: "mdi-heart-broken" };
  } else {
    return { color: "yellow", icon: "mdi-heart-half-full" };
  }
};

Vue.prototype.sumMilitaryPowers = (mps) => {
  const mp = mps.reduce(
    (a, b) => ({
      aircrafts: a.aircrafts + b.aircrafts,
      divisions: a.divisions + b.divisions,
      tanks: a.tanks + b.tanks,
      warships: a.warships + b.warships,
      total: a.total + b.total,
    }),
    {
      aircrafts: 0,
      divisions: 0,
      tanks: 0,
      total: 0,
      warships: 0,
    }
  );

  return mp;
};

Vue.prototype.sumArmies = (armies) => {
  const army = armies.reduce(
    (a, b) => ({
      divisions: a.divisions + b.divisions,
      tanks: a.tanks + b.tanks,
      aircrafts: a.aircrafts + b.aircrafts,
      warships: a.warships + b.warships,
    }),
    {
      divisions: 0,
      tanks: 0,
      aircrafts: 0,
      warships: 0,
    }
  );

  return army;
};

Vue.prototype.getBaseData = () => {
  return {
    token: localStorage.getItem("token"),
    gameId: localStorage.getItem("gameId"),
    playerId: localStorage.getItem("playerId"),
    countryId: localStorage.getItem("countryId"),
  };
};
