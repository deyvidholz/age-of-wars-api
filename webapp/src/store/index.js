import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasInteracted: false,
    isRequesting: false,
    alreadyPicked: false,
    alreadyPlayed: false,

    colorTargetId: null,
    colorToBePicked: null,

    showLeftSidebar: false,
    showRightSidebar: true,
    rightSidebarMini: true,

    defaultCountryFlagPath: "http://localhost:3001/imgs/flags",
    defaultCountryFlag: "http://localhost:3001/imgs/flags/default.png",
    defaultProvinceImgPath: "http://localhost:3001/imgs/provinces/",
    defaultProvinceFlag: "http://localhost:3001/imgs/provinces/default.jpg",

    demandMapMode: false,
    demandingProvinces: [],
    provincesAllowedToDemand: [],
    maxProvincesToDemand: 0,

    selfCountryOverview: false,
    actions: [],

    game: {
      id: null,
      name: null,
      stage: null,
      stageCount: -1,
      owner: {
        id: null,
        name: null,
      },
      players: [],
    },

    playerCountry: {
      id: null,
      flag: null,
      name: "{COUNTRY_NAME}",
      balance: 0,
      balanceIncoming: 0,
      oil: 0,
      oilIncoming: 0,
      divisions: 0,
      tanks: 0,
      aircrafts: 0,
      warships: 0,
      aggressiveness: 0,
      focusType: null,
      decisions: [],
      allies: [],
      enemies: [],
      guaranteeingIndependence: [],
      independenceGuaranteedBy: [],
    },

    messages: [],

    isRequestingProvince: false,
    provinceElement: null,
    provinceElementOriginalColor: "#ffffff",
    province: {
      mapRef: null,
      img: null,
      name: null,
      description: null,
      isCapital: null,
      hasCoast: null,
      isIsland: null,
      passives: [],
      incoming: {
        balance: 0,
        oil: 0,
      },
      levels: {
        production: 0,
        taxation: 0,
      },
      country: {
        id: null,
        name: null,
        isAi: null,
        owner: {},
        aggressiveness: {},
        army: {},
        estimatedArmy: {},
        opinions: {},
        focus: {},
        personality: {},
      },
    },

    svgpanzoom: null,

    notifications: [],

    dialogs: {
      console: {
        show: false,
      },
      info: {
        show: false,
        title: null,
        description: null,
        isError: false,
        handler: () => {},
        onClose: () => {},
      },
      startPickingPhase: {
        show: false,
      },
      opinionRanking: {
        show: false,
      },
      economicRanking: {
        show: false,
      },
      oilRanking: {
        show: false,
      },
      militaryRanking: {
        show: false,
      },
      aggressivenessRanking: {
        show: false,
      },
      manageActions: {
        show: false,
      },
      changeFocus: {
        show: false,
      },
      relations: {
        show: false,
      },
      shop: {
        show: false,
      },
      manageArmy: {
        show: false,
      },
      overview: {
        show: false,
      },
      province: {
        show: false,
      },
      decisions: {
        show: false,
      },
    },

    mainMenu: {
      dialogs: {
        newGame: {
          show: false,
        },
        loadGame: {
          show: false,
        },
        joinGame: {
          show: false,
        },
        settings: {
          show: false,
        },
      },
    },

    audio: {
      MAIN_THEME_1: new Audio(require("@/assets/sounds/main-theme-1.mp3")),
      AUDIO_WAR_SUSPENSE_1: new Audio(
        require("@/assets/sounds/war-suspense-1.mp3")
      ),
      AUDIO_WAR_SUSPENSE_2: new Audio(
        require("@/assets/sounds/war-suspense-2.mp3")
      ),
      CLICK: new Audio(require("@/assets/sounds/click.mp3")),
      PLAYER_TURN: new Audio(require("@/assets/sounds/player-turn.mp3")),
    },

    audioConfig: {
      MAIN_THEME_1: { loop: true, volume: 0.4, "aow-sfx-type": "music" },
      AUDIO_WAR_SUSPENSE_1: {
        loop: true,
        volume: 0.3,
        "aow-sfx-type": "music",
      },
      AUDIO_WAR_SUSPENSE_2: {
        loop: true,
        volume: 0.3,
        "aow-sfx-type": "music",
      },
      CLICK: { volume: 0.7, "aow-sfx-type": "sfx" },
      PLAYER_TURN: { volume: 0.7, "aow-sfx-type": "sfx" },
    },
  },
  mutations: {
    stopAllAudios({ audio }) {
      for (const audioElement of Object.values(audio)) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    },
    stopAllAudiosKeepingTime({ audio }) {
      for (const audioElement of Object.values(audio)) {
        audioElement.pause();
      }
    },
  },
  actions: {},
  modules: {},
  getters: {},
});
