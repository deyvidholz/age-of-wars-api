<template>
  <div>
    <Toolbar />
    <div class="toolbar-margin-fix"></div>

    <LeftSidebar />
    <RightSidebar />

    <WorldMap />
    <TargetInfo />

    <Console />

    <StartPickingPhaseDialog />
    <OpinionRakingDialog />
    <EconomicRankingDialog />
    <OilRankingDialog />
    <MilitaryRankingDialog />
    <AggressivenessRankingDialog />

    <ManageActionsDialog />
    <ChangeFocusDialog />
    <RelationsDialog />
    <ShopDialog />
    <ManageArmyDialog />
    <OverviewDialog />
    <ProvinceInfoDialog />
    <DecisionsDialog />

    <PickColorButton />
    <PickCountryButton />
    <NextTurnButton />
    <DemandProvinceButton />

    <MessageDialog
      v-for="(msg, index) in $store.state.messages"
      :key="index"
      :message="msg"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { getPlayerCountry } from "@/helpers/country";
import { fillProvinces, getAllProvinceElements } from "@/helpers/map";

import LinearLoading from "@/components/LinearLoading";
import CircularLoading from "@/components/CircularLoading";
import Notification from "@/components/Notification";
import Chip from "@/components/Chip";
import Avatar from "@/components/Avatar";

import ErrorAlert from "@/components/alerts/ErrorAlert";
import InfoAlert from "@/components/alerts/InfoAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import WarningAlert from "@/components/alerts/WarningAlert";

import Toolbar from "@/components/game/Toolbar";
import LeftSidebar from "@/components/game/LeftSidebar";
import RightSidebar from "@/components/game/RightSidebar";
import Tabs from "@/components/game/Tabs";
import WorldMap from "@/components/game/maps/World";
import TargetInfo from "@/components/game/TargetInfo";
import Console from "@/components/game/dialogs/ConsoleDialog";

import StartPickingPhaseDialog from "@/components/game/dialogs/StartPickingPhaseDialog";
import PickColorButton from "@/components/game/PickColorButton";
import PickCountryButton from "@/components/game/PickCountryButton";
import NextTurnButton from "@/components/game/NextTurnButton";
import DemandProvinceButton from "@/components/game/DemandProvinceButton";

import OpinionRakingDialog from "@/components/game/dialogs/OpinionRakingDialog";
import EconomicRankingDialog from "@/components/game/dialogs/EconomicRankingDialog";
import OilRankingDialog from "@/components/game/dialogs/OilRankingDialog";
import MilitaryRankingDialog from "@/components/game/dialogs/MilitaryRankingDialog";
import AggressivenessRankingDialog from "@/components/game/dialogs/AggressivenessRankingDialog";

import ManageActionsDialog from "@/components/game/dialogs/ManageActionsDialog";
import ChangeFocusDialog from "@/components/game/dialogs/ChangeFocusDialog";
import RelationsDialog from "@/components/game/dialogs/RelationsDialog";
import ShopDialog from "@/components/game/dialogs/ShopDialog";
import ManageArmyDialog from "@/components/game/dialogs/ManageArmyDialog";
import OverviewDialog from "@/components/game/dialogs/OverviewDialog";
import ProvinceInfoDialog from "@/components/game/dialogs/ProvinceInfoDialog";
import MessageDialog from "@/components/game/dialogs/MessageDialog";
import DecisionsDialog from "@/components/game/dialogs/DecisionsDialog";

export default {
  name: "Game",

  data: () => ({}),

  components: {
    Chip,
    LinearLoading,
    CircularLoading,
    Notification,
    ErrorAlert,
    InfoAlert,
    SuccessAlert,
    WarningAlert,
    Avatar,
    Toolbar,
    LeftSidebar,
    RightSidebar,
    Tabs,
    WorldMap,
    TargetInfo,
    Console,
    StartPickingPhaseDialog,
    PickColorButton,
    PickCountryButton,
    NextTurnButton,
    DemandProvinceButton,
    OpinionRakingDialog,
    EconomicRankingDialog,
    OilRankingDialog,
    MilitaryRankingDialog,
    AggressivenessRankingDialog,
    ManageActionsDialog,
    ChangeFocusDialog,
    RelationsDialog,
    ShopDialog,
    ManageArmyDialog,
    OverviewDialog,
    ProvinceInfoDialog,
    MessageDialog,
    DecisionsDialog,
  },

  computed: {
    hasInteracted() {
      return this.$store.state.hasInteracted;
    },
  },

  watch: {
    hasInteracted() {
      this.$store.state.audio.AUDIO_WAR_SUSPENSE_2.play();
    },
  },

  methods: {
    ...mapMutations(["stopAllAudios"]),
    setGameData(game) {
      this.$store.state.game.id = game.id;
      this.$store.state.game.name = game.name;
      this.$store.state.game.stage = game.stage;
      this.$store.state.game.stageCount = game.stageCount;
      this.$store.state.game.owner = game.owner;
      this.$store.state.game.players = game.players;
    },
    setPlayerCountryData(playerCountry) {
      this.$store.state.playerCountry.id = playerCountry.id;
      this.$store.state.playerCountry.flag = `${this.$store.state.defaultCountryFlagPath}/${playerCountry.flag}`;
      this.$store.state.playerCountry.name = playerCountry.name;

      this.$store.state.playerCountry.balance = playerCountry.economy.balance;
      this.$store.state.playerCountry.balanceIncoming =
        playerCountry.incoming.balance;
      this.$store.state.playerCountry.oil = playerCountry.resources.oil;
      this.$store.state.playerCountry.oilIncoming = playerCountry.incoming.oil;

      this.$store.state.playerCountry.divisions = playerCountry.army.divisions;
      this.$store.state.playerCountry.tanks = playerCountry.army.tanks;
      this.$store.state.playerCountry.aircrafts = playerCountry.army.aircrafts;
      this.$store.state.playerCountry.warships = playerCountry.army.warships;

      this.$store.state.playerCountry.aggressiveness =
        playerCountry.aggressiveness.current;

      this.$store.state.playerCountry.decisions = [...playerCountry.decisions];

      this.$store.state.playerCountry.allies = playerCountry.allies;
      this.$store.state.playerCountry.enemies = playerCountry.enemies;
      this.$store.state.playerCountry.inWarWith = playerCountry.inWarWith;
      this.$store.state.playerCountry.guaranteeingIndependence =
        playerCountry.guaranteeingIndependence;
      this.$store.state.playerCountry.independenceGuaranteedBy =
        playerCountry.independenceGuaranteedBy;

      this.$store.state.playerCountry.focusType = playerCountry.focus.type;

      playerCountry.messages.forEach((message, index) => {
        this.$store.state.notifications.push({
          id: Date.now() + index,
          text: message.title,
        });
      });
    },
    async setupGame(game = null) {
      if (!game) {
        try {
          const res = await this.http.get(
            `/games/find/${localStorage.getItem("gameId")}`
          );

          game = res.data.data.game;
        } catch (err) {
          console.log(err.response);

          if (err.response.status === 401) {
            return this.$router.push({ name: "SignIn" });
          }

          this.$store.state.dialogs.info.title = err.response.data.message;
          this.$store.state.dialogs.info.isError = true;
          this.$store.state.dialogs.info.show = true;
        }
      }

      const playerId = localStorage.getItem("playerId");
      const playerCountry = getPlayerCountry(playerId, game.countries);

      const handleClick = () => {
        this.$store.state.audio.CLICK.play();
      };

      fillProvinces(game, handleClick);
      this.setGameData(game);

      this.$store.state.dialogs.startPickingPhase.show = [
        "CLOSED",
        "IN_LOBBY",
      ].includes(game.stage);

      if (!playerCountry) {
        this.$store.state.alreadyPicked = false;
        return;
      }

      console.log("messages", playerCountry.messages);
      console.log("decisions", playerCountry.decisions);

      this.$store.state.alreadyPicked = true;
      this.setPlayerCountryData(playerCountry);
    },
  },

  mounted() {
    if (this.hasInteracted) {
      this.stopAllAudios();
      this.$store.state.audio.AUDIO_WAR_SUSPENSE_2.play();
    }

    this.$store.state.isRequesting = true;
    this.$socket.client.emit("join-room", {
      ...this.getBaseData(),
      nickname: localStorage.getItem("playerNickname"),
    });

    document.querySelector("body").addEventListener("keyup", (event) => {
      if (event.key === "/") {
        const isGameOwner =
          localStorage.getItem("playerId") === this.$store.state.game.owner.id;

        if (isGameOwner) {
          this.$store.state.dialogs.console.show = true;
        }
      }

      if (event.code !== "Space") {
        return;
      }

      event.preventDefault();
      this.$store.state.svgpanzoom.center();
      this.$store.state.svgpanzoom.fit();
    });

    this.setupGame();

    const elements = getAllProvinceElements();

    elements.map((element) => {
      element.addEventListener("click", () => {
        if (
          this.$store.state.provinceElement &&
          this.$store.state.provinceElementOriginalColor
        ) {
          this.$store.state.provinceElement.style.fill =
            this.$store.state.provinceElementOriginalColor;
        }

        this.$store.state.provinceElementOriginalColor = element.style.fill;
        this.$store.state.provinceElement = element;

        element.style.fill = "red";

        this.$store.state.selfCountryOverview = false;
        this.$store.state.isRequestingProvince = true;

        this.http
          .get(`/countries/provinces/${element.id}`)
          .then(({ data }) => {
            const province = data.data.province;
            this.$store.state.province = province;
            this.$store.state.isRequestingProvince = false;
          })
          .catch((error) => {
            this.$store.state.isRequestingProvince = false;
            this.$store.state.dialogs.info.title = "An error occurred";
            this.$store.state.dialogs.info.description =
              error.response.data.message;

            this.$store.state.dialogs.info.show = true;
            element.style.fill = "#ffffff";
          });
      });

      element.addEventListener("dblclick", (event) => {
        event.preventDefault();
        this.$store.state.dialogs.province.show = true;
      });
    });
  },

  sockets: {
    "@player-disconnected"(payload) {
      this.$store.state.isRequesting = false;
      this.$store.state.notifications.push({
        id: Date.now(),
        text: `${payload.player.nickname} was disconnected`,
      });
    },
    "player:start-picking-phase"(payload) {
      this.$store.state.isRequesting = false;
      console.log("player:start-picking-phase", payload);
      this.setupGame(payload.game);
    },
    "player:pick-country"(payload) {
      this.$store.state.isRequesting = false;
      console.log("player:pick-country", payload);

      this.$store.state.notifications.push({
        id: Date.now(),
        flag: payload.country.flag,
        countryName: payload.country.name,
        text: `${payload.country.owner.nickname} picked ${payload.country.name}`,
      });

      if (payload.country.owner.id === localStorage.getItem("playerId")) {
        localStorage.setItem("countryId", payload.country.id);
      }

      this.setupGame(payload.game);
    },
    "player:next-turn"(payload) {
      this.$store.state.isRequesting = false;
      this.$store.state.demandMapMode = false;
      console.log("player:next-turn", payload);
      if (!payload.isNextTurn) {
        this.$store.state.game.owner = payload.game.owner;
        this.$store.state.game.players = payload.game.players;
        this.$store.state.alreadyPlayed = true;
        return;
      }

      this.$store.state.audio.PLAYER_TURN.play();
      this.setupGame(payload.game);
      this.$store.state.alreadyPlayed = false;
    },
    "player:join-game"(payload) {
      this.$store.state.isRequesting = false;
      this.$store.state.game.players = payload.game.players;
    },
    "player:player-list"(payload) {
      this.$store.state.game.owner = payload.owner;
      this.$store.state.game.players = payload.players;
    },
  },
};
</script>
