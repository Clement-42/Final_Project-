
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  burger.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const userInfoDiv = document.getElementById("user-info");

  if (user && userInfoDiv) {
    userInfoDiv.innerHTML = `Connected as <strong>${user.username}</strong> 
      <button id="logout">Logout</button>`;
      
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      alert("Logout");
      window.location.href = "login.html";
    });
  }

  const saveBtn = document.getElementById("save-list");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const listName = prompt("Name of your list ?");
      if (!listName) return;

      const savedLists = JSON.parse(localStorage.getItem("armyLists") || "[]");
      const army = JSON.parse(localStorage.getItem("myArmy") || "[]");

      savedLists.push({
        name: listName,
        units: army,
        totalPoints: army.reduce((sum, u) => sum + u.points * u.quantity, 0),
        createdAt: new Date().toISOString()
      });

    localStorage.setItem("armyLists", JSON.stringify(savedLists));
    alert("✅ Your list has been saved!");
  });
}

  const categorySelect = document.getElementById("category");
  const factionSelect = document.getElementById("faction");
  const unitTypeSelect = document.getElementById("unit-type");
  const unitSelect = document.getElementById("unit");
  const unitPreview = document.getElementById("unit-preview");
  const addUnitBtn = document.getElementById("add-unit");
  const armyList = document.getElementById("army-list");
  const totalPointsDisplay = document.getElementById("total-points");
  const unitsContainer = document.getElementById("units-container");

  let army = JSON.parse(localStorage.getItem("myArmy")) || [];
  let totalPoints = army.reduce((sum, u) => sum + u.points * u.quantity, 0);
  renderArmyList();

  const factions = {
    Chaos: ["World Eater", "Death Guard", "Thousand Sons"],
    Xenos: ["Necron", "Ork", "Aeldari"],
    Imperium: ["Space Marine", "Adeptus Mechanicus", "Astra Militarum"]
  };

  const unitsData = {
    "Imperium": {
      "Adeptus Mechanicus": {
        "Infantry": [
          { name: "Skitarii Rangers x10",           points: 85,  image: "img/admech/Skitarii_Ranger.png" },
          { name: "Skitarii Vanguard x10",          points: 95,  image: "img/admech/Skitarii_Vanguard.png" },
          { name: "Electro-priest Corpuscarii x10", points: 65,  image: "img/admech/Electropriest.png" },
          { name: "Electro-priest Fulgurites x10",  points: 70,  image: "img/admech/Electropriest_fulgurites.png" },
          { name: "Kataphron Brecheurs x3",         points: 105, image: "img/admech/Brecheurs.png" },
          { name: "Kataphron Destroyers x3",        points: 160, image: "img/admech/Destructors.png" },
          { name: "Cybernetica Datasmith x1",       points: 35,  image: "img/admech/Cybernetica_Datasmith.png" }
        ],
        "Character": [
          { name: "Belisarius Cawl",       points: 135, image: "img/admech/Belisarius_Cawl.png" },
          { name: "Tech-Priest Dominus",   points: 65,  image: "img/admech/Technoprêtre_Dominus.png" },
          { name: "Tech-priest Manipulus", points: 60,  image: "img/admech/Technopriest_Manipulus.png" },
          { name: "Tech-priest Enginseer", points: 55,  image: "img/admech/Technaugure.png" },
          { name: "Marechal Skitari",      points: 35,  image: "img/admech/Marechal_Skitarii.png" }
        ],
        "Vehicle": [
          { name: "Onager Dunecrawler",   points: 155, image: "img/admech/Onagre_des_Dunes.png" },
          { name: "Archeopter Fusilave",  points: 150, image: "img/admech/Archeoptere_fusilave.png" },
          { name: "Kastelan robot",       points: 180, image: "img/admech/Kastelan_robot.png" }
        ],
        "Fast Attack": [
          { name: "Sydonian Dragoons",            points: 65, image: "img/admech/Dragons_Sydoniens.png" },
          { name: "Ferro-echassiers ballistarii", points: 70, image: "img/admech/Ferro-echassiers_ballistarii.png" }
        ]
      },

     "Space Marine": {
        "Infantry": [
          { name: "Intercessor squad x10",         points: 80,  image: "img/SM/Intercessor_squad.png" },
          { name: "Heavy Intercessor squad x10",   points: 100, image: "img/SM/Heavy_Intercessor_squad.png" },
          { name: "Infernus squad x10",            points: 90,  image: "img/SM/Infernus_squad.png" },
          { name: "Terminator squad x5",           points: 170, image: "img/SM/Terminator_squad.png" },
          { name: "Assault Intercessor squad x10", points: 75,  image: "img/SM/Assault_Intercessor_squad.png" },
          { name: "Agressor squad x3",             points: 100, image: "img/SM/Agressor_squad.png" },
          { name: "Bladguard Veteran squad x3",    points: 80,  image: "img/SM/Bladguard_Veteran_squad.png" }
        ],
        "Character": [
          { name: "Captain",                   points: 80, image: "img/SM/Captain.png" },
          { name: "Captain Gravis armour",     points: 80, image: "img/SM/Captain_Gravis_Armour.png" },
          { name: "Captain Phobos armour",     points: 70, image: "img/SM/Captain_Phobos_Armour.png" },
          { name: "Captain Terminator armour", points: 95, image: "img/SM/Captain_Terminator_Armour.png" },
          { name: "Chaplain",                  points: 60, image: "img/SM/Chaplain.png" },
          { name: "Judiciar",                  points: 70, image: "img/SM/Judiciar.png" },
          { name: "Librarian",                 points: 65, image: "img/SM/Librarian.png" },
          { name: "Lieutenant",                points: 65, image: "img/SM/Lieutenant.png" }
        ],
        "Vehicle": [
          { name: "Redemptor Dreadnought",      points: 210, image: "img/SM/Redemptor_Dreadnought.png" },
          { name: "Invicator Tactical Warsuit", points: 125, image: "img/SM/Invicator_Tactical_Warsuit.png" },
          { name: "Repulsor",                   points: 180, image: "img/SM/Repulsor.png" },
          { name: "Land raider",                points: 240, image: "img/SM/Land_raider.png" }
        ],
        "Fast Attack": [
          { name: "Outrider squad x3", points: 80,  image: "img/SM/Outrider_squad.png" },
          { name: "Inceptor squad x5", points: 120, image: "img/SM/Inceptor_squad.png" }
        ]
      },

      "Astra Militarum": {
        "Infantry": [
          { name: "Cadian Shock Troops x10",       points: 65,  image: "img/AM/Cadian_Shock_Troops.png" },
          { name: "Death Korps of Krieg x10",      points: 65,  image: "img/AM/Death_Korps_of_Krieg.png" },
          { name: "Kasrkin x10",                   points: 110, image: "img/AM/Kasrkin.png" },
          { name: "Cadian Heavy Weapons squad x3", points: 65,  image: "img/AM/Cadian_Heavy_Weapons_squad.png" },
          { name: "Ogryns squad x5",               points: 60,  image: "img/AM/Ogryn's_squad.png" }
        ],
        "Character": [
          { name: "Lord Solar Leontus", points: 150, image: "img/AM/Lord_Solar_Leontus.png" },
          { name: "Cadian Castellan",   points: 55,  image: "img/AM/Cadian_Castellan.png" },
          { name: "Commissar",          points: 30,  image: "img/AM/Commissar.png" },
          { name: "Primaris Psyker",    points: 60,  image: "img/AM/Primaris_Psyker.png" },
        ],
        "Vehicle": [
          { name: "Leman Russ", points: 185, image: "img/AM/Leman_Russ.png" },
          { name: "Basilisk",   points: 140, image: "img/AM/Basilisk.png" },
          { name: "Hydra",      points: 95, image: "img/AM/Hydra.png" },
          { name: "Manticore",  points: 165, image: "img/AM/Manticore.png" },
          { name: "Valkyrie",   points: 190, image: "img/AM/Valkyrie.png" },
          { name: "Baneblade",  points: 480, image: "img/AM/Baneblade.png" },
        ],
        "Fast Attack": [
          { name: "Armoured sentinels", points: 65, image: "img/AM/Armoured_sentinels.png" }
        ]
      },
    },

  "Xenos": {
      "Necron": {
        "Infantry": [
          { name: "Canoptek Scarab Swarms x10", points: 40, image: "img/Necron/Canoptek_Scarab_Swarms.png" },
          { name: "Necron Warriors x10",        points: 90, image: "img/Necron/Necron_Warriors.png" },
          { name: "Immortals x5",               points: 70, image: "img/Necron/Immortals.png" },
          { name: "Flayed Ones x10",            points: 60, image: "img/Necron/Flayed_Ones.png" },
          { name: "Deathmarks x5",              points: 60, image: "img/Necron/Deathmarks.png" },
          { name: "Skorpekh Destroyers x3",     points: 90, image: "img/Necron/Skorpekh_Destroyers.png" },
          { name: "Lokhust_Destroyers x1",      points: 55, image: "img/Necron/Lokhust_Destroyers.png" }
        ],
        "Character": [
          { name: "The Silent King",                points: 420, image: "img/Necron/The_Silent_King.png" },
          { name: "C'tan Shard of the Void Dragon", points: 300, image: "img/Necron/C'tan_Shard_of_the_Void_Dragon.png" },
          { name: "Illuminor Szeras",               points: 165, image: "img/Necron/Illuminor_Szeras.png" },
          { name: "Imotekh the Stormlord",          points: 100, image: "img/Necron/Imotekh_the_Stormlord.png" },
          { name: "Skorpekh Lord",                  points: 90,  image: "img/Necron/Skorpekh_Lord.png" },
          { name: "Technomancer",                   points: 80,  image: "img/Necron/Technomancer.png" },
          { name: "Psychomancer",                   points: 55,  image: "img/Necron/Psychomancer.png" },
          { name: "Plasmancer",                     points: 55,  image: "img/Necron/Plasmancer.png" },
          { name: "Chronomancer",                   points: 35,  image: "img/Necron/Chronomancer.png" },
          { name: "Royal Warden",                   points: 50,  image: "img/Necron/Royal_Warden.png" },
          { name: "Catacomb Command Barge",         points: 120, image: "img/Necron/Catacomb_Command_Barge.png" }
        ],
        "Vehicle": [
          { name: "Annihilation Barge", points: 105, image: "img/Necron/Annihilation_Barge.png" },
          { name: "Doom Scythe",        points: 230, image: "img/Necron/Doom_Scythe.png" },
          { name: "Doomsday Ark",       points: 200, image: "img/Necron/Doomsday_Ark.png" }
        ],
        "Fast Attack": [
          { name: "Tomb Blade x3", points: 75, image: "img/Necron/Tomb_Blade.png" },
        ]
      },

      "Ork": {
        "Infantry": [
          { name: "Boyz x10",      points: 80, image: "img/Ork/Boyz.png" },
          { name: "Gretchin x10",  points: 40, image: "img/Ork/Gretchin.png" },
          { name: "Meganobz x5",   points: 70, image: "img/Ork/Meganobz.png" },
          { name: "Flash Gitz x3", points: 80, image: "img/Ork/Flash_Gitz.png" }
        ],
        "Character": [
          { name: "Ghazghkull Thraka",             points: 235, image: "img/Ork/Ghazghkull_Thraka.png" },
          { name: "Big Mek",                       points: 70,  image: "img/Ork/Big_Mek.png" },
          { name: "Big Mek in Mega_armour",        points: 90,  image: "img/Ork/Big_Mek_in_Mega_armour.png" },
          { name: "Big Mek with Shokk Attack Gun", points: 85,  image: "img/Ork/Big_Mek_with_Shokk_Attack_Gun.png" },
          { name: "Mozrog Skragbad",               points: 165, image: "img/Ork/Mozrog_Skragbad.png" },
          { name: "Mek",                           points: 45,  image: "img/Ork/Mek.png" },
          { name: "Warboss",                       points: 75,  image: "img/Ork/Warboss.png" },
          { name: "Warboss in Mega armour",        points: 90,  image: "img/Ork/Warboss_in_Mega_armour.png.png" },
          { name: "Painboy",                       points: 80,  image: "img/Ork/Painboy.png" },
          { name: "Painboss",                      points: 70,  image: "img/Ork/Painboss.png" }
        ],
        "Vehicle": [
          { name: "Deff Dread", points: 120, image: "img/Ork/Deff_Dread.png" },
          { name: "Gorkanaut",  points: 265, image: "img/Ork/Gorkanaut.png" },
          { name: "Killa Kans", points: 125, image: "img/Ork/Killa_Kans.png" },
          { name: "Stompa",     points: 800, image: "img/Ork/Stompa.png" }
        ],
        "Fast Attack": [
          { name: "Deffkoptas x3",        points: 80, image: "img/Ork/Deffkoptas.png" },
          { name: "Kustom Boosta-blasta", points: 70, image: "img/Ork/Kustom_Boosta-blasta.png" },
          { name: "Megatrakk Scrapjet",   points: 75, image: "img/Ork/Megatrakk_Scrapjet.png" }
        ]
      },

      "Aeldari": {
        "Infantry": [
          { name: "Guardian Defenders x10",  points: 100, image: "img/Eldar/Guardian_Defenders.png" },
          { name: "Storm Guardians x10",     points: 100, image: "img/Eldar/Storm_Guardians.png" },
          { name: "Corsair Voidreavers x10", points: 60,  image: "img/Eldar/Corsair_Voidreavers.png" },
          { name: "Dark Reapers x5",         points: 90,  image: "img/Eldar/Dark_Reapers.png" },
          { name: "Dire Avengers x5",        points: 80,  image: "img/Eldar/Dire_Avengers.png" },
          { name: "Fire Dragons x5",         points: 120, image: "img/Eldar/Fire_Dragons.png" },
          { name: "Howling Banshees x5",     points: 95,  image: "img/Eldar/Howling_Banshees.png" },
          { name: "Rangers x5",              points: 55,  image: "img/Eldar/Rangers.png" },
          { name: "Troupe x10",              points: 85,  image: "img/Eldar/Troupe.png" }
        ],
        "Character": [
          { name: "Avatar of Khaine",  points: 300, image: "img/Eldar/Avatar_of_Khaine.png" },
          { name: "Autarch Wayleaper", points: 80,  image: "img/Eldar/Autarch_Wayleaper.png" },
          { name: "Death Jester",      points: 90,  image: "img/Eldar/Death_Jester.png" },
          { name: "Maugan Ra",         points: 100, image: "img/Eldar/Maugan_Ra.png" },
          { name: "Shadowseer",        points: 60,  image: "img/Eldar/Shadowseer.png" },
          { name: "Solitaire",         points: 115, image: "img/Eldar/Solitaire.png" },
          { name: "Spiritseer",        points: 65,  image: "img/Eldar/Spiritseer.png" },
          { name: "Troupe Master",     points: 75,  image: "img/Eldar/Troupe_Master.png" },
          { name: "Warlock",           points: 45,  image: "img/Eldar/Warlock.png" }
        ],
        "Vehicle": [
          { name: "Falcon",         points: 130, image: "img/Eldar/Falcon.png" },
          { name: "Fire Prism",     points: 150, image: "img/Eldar/Fire_Prism.png" },
          { name: "Crimson Hunter", points: 160, image: "img/Eldar/Crimson_Hunter.png" },
          { name: "Wraithknight",   points: 435, image: "img/Eldar/Wraithknight.png" }
        ],
        "Fast Attack": [
          { name: "Windriders x3",     points: 80,  image: "img/Eldar/Windriders.png" },
          { name: "Skyweavers x3",     points: 95,  image: "img/Eldar/Skyweavers.png" },
          { name: "Shroud Runners x3", points: 80,  image: "img/Eldar/Shroud_Runners.png" },
          { name: "Voidweaver",        points: 125, image: "img/Eldar/Voidweaver.png" }
        ]
      },
    },
    
    "Chaos": {
      "World Eater": {
        "Infantry": [
          { name: "Khorne Berzerkers x10", points: 180, image: "img/WE/Khorne_Berzerkers.png" },
          { name: "Jakhals x10",           points: 65,  image: "img/WE/Jakhals.png" },
          { name: "Eightbound x5",         points: 150, image: "img/WE/Eightbound.png" },
          { name: "Exalted Eightbound x5", points: 160, image: "img/WE/Exalted_Eightbound.png" },
          { name: "Chaos Terminators x5",  points: 185, image: "img/WE/Chaos_Terminators.png" },
          { name: "Bloodletters x10",      points: 110, image: "img/WE/Bloodletters.png" }
        ],
        "Character": [
          { name: "Angron",                  points: 385, image: "img/WE/Angron.png" },
          { name: "Khârn the Betrayer",      points: 85,  image: "img/WE/Khârn_the_Betrayer.png" },
          { name: "Deamon Prince of Khorne", points: 200, image: "img/WE/Deamon_Prince_of_Khorne.png" },
          { name: "Lord Invocatus",          points: 110, image: "img/WE/Lord_Invocatus.png" },
          { name: "Lord on Juggernaut",      points: 90,  image: "img/WE/Lord_on_Juggernaut.png" },
          { name: "Master of Executions",    points: 60,  image: "img/WE/Master_of_Executions.png" },
          { name: "Bloodthirster",           points: 305, image: "img/WE/Bloodthirster.png" },
          { name: "Skarbrand",               points: 305, image: "img/WE/Skarbrand.png" },
          { name: "Skullmaster",             points: 100, image: "img/WE/Skullmaster.png" },
          { name: "Bloodcrushers",           points: 60,  image: "img/WE/Bloodcrushers.png" }
        ],
        "Vehicle": [
          { name: "Chaos Land Raider",     points: 240, image: "img/WE/Chaos_Land_Raider.png" },
          { name: "Chaos Rhino",           points: 145, image: "img/WE/Chaos_Rhino.png" },
          { name: "Defiler",               points: 180, image: "img/WE/Defiler.png" },
          { name: "Helbrute",              points: 120, image: "img/WE/Helbrute.png" },
          { name: "Forgefiend",            points: 150, image: "img/WE/Forgefiend.png" },
          { name: "Heldrake",              points: 200, image: "img/WE/Heldrake.png" },
          { name: "Khorne Lord of Skulls", points: 505, image: "img/WE/Khorne_Lord_of_Skulls.png" }
        ],
        "Fast Attack": [
          { name: "Bloodcrushers x3",     points: 110,  image: "img/WE/Bloodcrushers.png" }
        ]
      },

      "Death Guard": {
        "Infantry": [
          { name: "Poxwalkers x10",             points: 180, image: "img/Nurgle/Poxwalkers.png" },
          { name: "Plaguebearers x10",          points: 65,  image: "img/Nurgle/Plaguebearers.png" },
          { name: "Plague Marines x10",         points: 95,  image: "img/Nurgle/Plague_Marines.png" },
          { name: "Blightlord Terminators x3",  points: 115, image: "img/Nurgle/Blightlord_Terminators.png" },
          { name: "Deathshroud Terminators x3", points: 140, image: "img/Nurgle/Deathshroud_Terminators.png" },
          { name: "Nurglings x10",              points: 180, image: "img/Nurgle/Nurglings.png" }
        ],
        "Character": [
          { name: "Mortarion",              points: 380, image: "img/Nurgle/Mortarion.png" },
          { name: "Typhus",                 points: 90,  image: "img/Nurgle/Typhus.png" },
          { name: "Rotigus",                points: 250, image: "img/Nurgle/Rotigus.png" },
          { name: "Great Unclean One",      points: 250, image: "img/Nurgle/Great_Unclean_One.png" },
          { name: "Lord of Contagion",      points: 110, image: "img/Nurgle/Lord_of_Contagion.png" },
          { name: "Lord of Virulence",      points: 90,  image: "img/Nurgle/Lord_of_Virulence.png" },
          { name: "Malignant Plaguecaster", points: 60,  image: "img/Nurgle/Malignant_Plaguecaster.png" },
          { name: "Foul Blightspawn",       points: 60,  image: "img/Nurgle/Foul_Blightspawn.png" }
        ],
        "Vehicle": [
          { name: "Helbrute",                points: 115, image: "img/Nurgle/Helbrute.png" },
          { name: "Foetid Bloat-Drone",      points: 90,  image: "img/Nurgle/Foetid_Bloat-Drone.png" },
          { name: "Myphitic Blight-Haulers", points: 90,  image: "img/Nurgle/Myphitic_Blight-Haulers.png" },
          { name: "Plagueburst Crawler",     points: 195, image: "img/Nurgle/Plagueburst_Crawler.png" }
        ],
      },
      "Thousand Sons": {
        "Infantry": [
          { name: "Rubric Marines x10",           points: 100, image: "img/TS/Rubric_Marines.png" },
          { name: "Pink Horrors x10",             points: 140, image: "img/TS/Pink_Horrors.png" },
          { name: "Blue Horrors x10",             points: 125, image: "img/TS/Blue_Horrors.png" },
          { name: "Scarab Occult Terminators x3", points: 180, image: "img/TS/Scarab_Occult_Terminators.png" },
          { name: "Tzaangor Enlightened x3",      points: 50,  image: "img/TS/Tzaangor_Enlightened.png" },
          { name: "Tzaangors x10",                points: 70,  image: "img/TS/Tzaangors.png" }
        ],
        "Character": [
          { name: "Magnus the Red",    points: 420, image: "img/TS/Magnus_the_Red.png" },
          { name: "Ahriman",           points: 100, image: "img/TS/Ahriman.png" },
          { name: "Kairos Fateweaver", points: 270, image: "img/TS/Kairos_Fateweaver.png" },
          { name: "Lord of Change",    points: 260, image: "img/TS/Lord_of_Change.png" },
          { name: "Infernal Master",   points: 85,  image: "img/TS/Infernal_Master.png" },
          { name: "Exalted Sorcerer",  points: 80,  image: "img/TS/Exalted_Sorcerer.png" },
          { name: "Sorcerer",          points: 75,  image: "img/TS/Sorcerer.png" },
          { name: "Tzaangor Shaman",   points: 55,  image: "img/TS/Tzaangor_Shaman.png" }
        ],
        "Vehicle": [
          { name: "Chaos Rhino", points: 90,  image: "img/TS/Chaos_Rhino.png" },
          { name: "Helbrute",    points: 110, image: "img/TS/Helbrute.png" },
          { name: "Forgefiend",  points: 140, image: "img/TS/Forgefiend.png" },
          { name: "Heldrake",    points: 215, image: "img/TS/Heldrake.png" }
        ],
        "Fast Attack": [
          { name: "Mutalith Vortex Beast", points: 160, image: "img/TS/Mutalith_Vortex_Beast.png" }
        ]
      },
    }
  };

  const backgroundMap = {
    "Adeptus Mechanicus": "img/admech/bg_admech.jpg",
    "Space Marine"      : "img/SM/bg_sm.jpg",
    "Astra Militarum"   : "img/AM/bg_am.jpg",
    "Necron"            : "img/Necron/bg_necron.jpg",
    "Ork"               : "img/Ork/bg_ork.jpg",
    "Aeldari"           : "img/Eldar/bg_eldar.jpeg",
    "World Eater"       : "img/WE/bg_we.jpg",
    "Death Guard"       : "img/Nurgle/bg_dg.jpg",
    "Thousand Sons"     : "img/TS/bg_ts.jpg"
  };

categorySelect.addEventListener("change", () => {
  factionSelect.disabled = false;
  animateIn(factionSelect.parentElement);

  const selectedCategory = categorySelect.value;
  factionSelect.innerHTML = `<option value="">-- Choose your faction --</option>`;
  if (factions[selectedCategory]) {
    factions[selectedCategory].forEach(faction => {
    factionSelect.innerHTML += `<option value="${faction}">${faction}</option>`;
    });
  }
  unitsContainer.innerHTML = "";
});

factionSelect.addEventListener("change", () => {
  unitTypeSelect.disabled = false;
  animateIn(unitTypeSelect.parentElement);

  const selectedCategory = categorySelect.value;
  const selectedFaction = factionSelect.value;

  if (backgroundMap[selectedFaction]) {
    document.body.style.backgroundImage = `url('${backgroundMap[selectedFaction]}')`;
  }

  const factionUnits = unitsData[selectedCategory]?.[selectedFaction];
  unitTypeSelect.innerHTML = `<option value="">-- Choose unit type --</option>`;
  if (factionUnits) {
    Object.keys(factionUnits).forEach(type => {
      unitTypeSelect.innerHTML += `<option value="${type}">${type}</option>`;
    });
  }
});

unitTypeSelect.addEventListener("change", () => {
unitsContainer.innerHTML = "";

  unitSelect.disabled = false;
  animateIn(unitSelect.parentElement);

  const selectedCategory = categorySelect.value;
  const selectedFaction = factionSelect.value;
  const selectedType = unitTypeSelect.value;

  const units = unitsData[selectedCategory]?.[selectedFaction]?.[selectedType];
  unitSelect.innerHTML = `<option value="">-- Choose unit --</option>`;
  if (units) {
    units.forEach(unit => {
      unitSelect.innerHTML += `<option value="${unit.name}">${unit.name}</option>`;
    });
  }
  units.forEach(unit => {
  const card = document.createElement("div");
  card.className = "unit-card";
  card.innerHTML = `
    <img src="${unit.image}" alt="${unit.name}" class="unit-image">
    <h3>${unit.name}</h3>
    <p><strong>Points :</strong> ${unit.points}</p>
    <input type="number" min="1" value="1" />
    <button>Ajouter à la liste</button>
  `;

  const button = card.querySelector("button");
  const qtyInput = card.querySelector("input");

  button.addEventListener("click", () => {
    const quantity = parseInt(qtyInput.value) || 1;

    const existing = army.find(u => u.name === unit.name);
    if (existing) {
      existing.quantity += quantity;
    } else {
      army.push({
        name: unit.name,
        type: selectedType,
        faction: selectedFaction,
        quantity,
        points: unit.points,
        image: unit.image
      });
    }

    renderArmyList();
    localStorage.setItem("myArmy", JSON.stringify(army));
  });

  unitsContainer.appendChild(card);
});
});

  unitSelect.addEventListener("change", () => {
    addUnitBtn.disabled = false;
    animateIn(addUnitBtn);

  const selectedCategory = categorySelect.value;
  const selectedFaction = factionSelect.value;
  const selectedType = unitTypeSelect.value;
  const selectedUnitName = unitSelect.value;

  const unit = unitsData[selectedCategory]?.[selectedFaction]?.[selectedType]?.find(
  u => u.name === selectedUnitName
);

if (unit) {
  unitPreview.innerHTML = `<img src="${unit.image}" alt="${unit.name}" style="max-width: 500px; border-radius: 15px;" />`;
}
  });

  function renderArmyList() {
  armyList.innerHTML = "";
  let total = 0;

  army.forEach((unit, index) => {
    const cost = unit.points * unit.quantity;
    total += cost;

    const item = document.createElement("div");
    item.className = "unit-list-item";
    item.innerHTML = `
      <span>${unit.name} : </span>
      <input type="number" min="1" value="${unit.quantity}" data-index="${index}" />
      x ${unit.points} pts = <strong>${cost}</strong> pts
      <button data-remove="${index}">❌</button>
    `;

    item.querySelector("input").addEventListener("change", e => {
      const newQty = parseInt(e.target.value) || 1;
      army[index].quantity = newQty;
      renderArmyList();
    });

    item.querySelector("button").addEventListener("click", e => {
      if (confirm("Delete this unit ?")) {
        army.splice(index, 1);
        renderArmyList();
      }
    });

    armyList.appendChild(item);
  });

  totalPoints = total;
  totalPointsDisplay.textContent = total;
  localStorage.setItem("myArmy", JSON.stringify(army));
}

  function animateIn(element) {
    element.classList.remove("fade-in", "slide-in");
    void element.offsetWidth;
    element.classList.add("fade-in", "slide-in");
  }
});
