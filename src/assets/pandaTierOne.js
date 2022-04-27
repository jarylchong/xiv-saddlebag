export default [
  { 
    number: 1, 
    title: "Asphodelos: The First Circle", 
    tier: 1,
    bossName: "Erichtonios",
    pfText: (getReadableStrat) => {
      const mechanicOrder = ['shackles','intemp','fourfold','shiningCells']
      const readableMechanics = mechanicOrder.map(getReadableStrat)
      const formattedMechanics = readableMechanics.filter(m => m && m.length).join(".   ")
      return `【  ${formattedMechanics ? formattedMechanics + "." : ""} 】` 
    },
    mechanics: [
      {
        name: "Aetherial Shackles",
        verbosePrepend: "Color",
        key: "shackles",
        options: [
          { text: "Partners", value: "Partners" }
        ],
        default: "Partners",
        enabled: false
      },
      {
        name: "Intemperance",
        verboseAppend: "Intemp",
        key: "intemp",
        options: [
          { text: "Joonbob", value: "Joonbob" },
          { text: "N/NW Flex", value: "N/NW Flex"},
          { text: "Tank DD", value: "\"I'm bad and I should feel bad\" intemp" },
        ],
        default: "Joonbob",
        enabled: true
      },
      {
        name: "Fourfold Shackles",
        verbosePrepend: "Fourfold",
        key: "fourfold",
        options: [
          { text: "Timers", value: "Timers" }
        ],
        default: "Timers",
        enabled: true
      },
      { 
        name: "Shining Cells",
        key: "shiningCells",
        options: [
          { text: "Red Safe", value: "Red Safe" },
          { text: "White Safe", value: "White Safe" }
        ],
        default: "Red Safe",
        hint: "Red / white floor",
        enabled: true
      }
    ]
  },
  { 
    number: 2, 
    title: "Asphodelos: The Second Circle", 
    tier: 1,
    bossName: "Hippokampos",
    pfText: (getReadableStrat) => {
      return `【    ${getReadableStrat('dpsTankDebuff')}   】` 
    },
    mechanics: [
      {
        name: "Predatory Avarice",
        key: "dpsTankDebuff",
        options: [
          { text: "DPS right / corner", value: "DPS right / corner" },
          { text: "DPS left / middle", value: "DPS left / middle" },
          { text: "Tank right / corner", value: "Tank right / corner" },
          { text: "Tank left / middle", value: "Tank left / middle" },
        ],
        default: "DPS right / corner",
        hint: "DPS + Tank debuff",
        enabled: true
      }
    ]
  },
  { 
    number: 3, 
    title: "Asphodelos: The Third Circle", 
    tier: 1,
    bossName: "Phoinix",
    pfText: (getReadableStrat) => {
      const firstMechanicSet = ['divebomb','addGroups','gloryplume','fofOrder']
        .map(getReadableStrat)
      const foaMechanics = ['foaFormation','foaNadoGroups']
        .map(getReadableStrat)
        .filter(m => m && m.length)
        .join(" ╱ ")
      const formattedMechanics = [].concat(firstMechanicSet, foaMechanics)
        .filter(m => m && m.length)
        .join(" │ ")
      return `【  ${formattedMechanics || ""} 】` 
    },
    mechanics: [
      {
        name: "Trail of Condemnation",
        verbosePrepend: "Dive",
        key: "divebomb",
        options: [
          { text: "TH Left, DPS Right", value: "TH-L, DPS-R" },
        ],
        default: "TH-L, DPS-R",
        hint: "Sides or mid divebomb",
        enabled: false
      },
      {
        name: "Add groups",
        verbosePrepend: "Adds",
        key: "addGroups",
        options: [
          { text: "1/3 NE, 2/4 SW", value: "1/3 NE … 2/4 SW" },
          { text: "1/3 NW, 2/4 SE", value: "1/3 NW … 2/4 SE" },
          { text: "1/4 NE, 2/3 SW", value: "1/4 NE … 2/3 SW" },
          { text: "1/4 NW, 2/3 SE", value: "1/4 NW … 2/3 SE" },
        ],
        default: "1/3 NE … 2/4 SW",
        enabled: true
      },
      {
        name: "Gloryplume",
        verbosePrepend: "Glory",
        key: "gloryplume",
        options: [
          { text: "TR South, HM North", value: "TR-S, HM-N" },
          { text: "TR North, HM South", value: "TR-N, HM-S" },
        ],
        default: "TR-S, HM-N",
        enabled: true
      },
      {
        name: "Fountain of Fire",
        verbosePrepend: "FoF",
        key: "fofOrder",
        options: [
          { text: "Tank > Melee > Ranged", value: "TMR" },
          { text: "Melee > Tank > Ranged", value: "MTR" },
        ],
        default: "TMR",
        enabled: true
      },
      {
        name: "Flames of Asphodelos",
        verbosePrepend: "FoA",
        key: "foaFormation",
        options: [
          { text: "Myta", value: "Myta" },
          { text: "Elmo", value: "Elmo" },
        ],
        default: "Myta",
        enabled: true
      },
      {
        name: "Darkblaze Twister",
        key: "foaNadoGroups",
        options: [
          { text: "TR Left / HM Right", value: "TR-Left, HM-Right" },
          { text: "TR Right / HM Left", value: "TR-Right, HM-Left" },
        ],
        default: "TR-Left, HM-Right",
        hint: "FoA knockback nado groups",
        enabled: true
      },
    ]
  },
  { 
    number: 4, 
    title: "Asphodelos: The Fourth Circle", 
    tier: 1,
    bossName: "Hesperos",
    pfText: (getReadableStrat) => {
      const firstPhaseMechanics = ['chlamys','pinax','roleOrbs','roleTowers']
        .map(getReadableStrat)
        .filter(m => m && m.length)
        .map(m => `[ ${m} ]`)
        .join("")
      return `${firstPhaseMechanics ? firstPhaseMechanics : ""}  ⇒ 【 P2: ${getReadableStrat('phaseTwo')} 】` 
    },
    mechanics: [
      {
        name: "Chlamys",
        key: "chlamys",
        options: [
          { text: "Billi", value: "Billi" },
        ],
        default: "Billi",
        hint: "Tethers + Role Call",
        enabled: false
      },
      {
        name: "Pinax",
        verboseAppend: "pinax",
        key: "pinax",
        options: [
          { text: "Uptime", value: "Uptime" },
        ],
        default: "Uptime",
        enabled: true
      },
      {
        name: "Belone Burst",
        key: "roleOrbs",
        options: [
          { text: "Pastebin orbs", value: "Pastebin orbs" },
          { text: "THTH", value: "THTH" },
        ],
        default: "Pastebin orbs",
        hint: "Role orbs",
        enabled: true
      },
      {
        name: "Belone Coils",
        key: "roleTowers",
        options: [
          { text: "North towers", value: "N Towers" },
        ],
        default: "N Towers",
        hint: "Role towers",
        enabled: true
      },
      {
        name: "Phase 2",
        key: "phaseTwo",
        options: [
          { text: "Pastebin strats", value: "pastebin strats" },
          { text: "Maxwell", value: "Maxwell" },
        ],
        default: "pastebin strats",
        hint: "Both strats are the same, just different names",
        enabled: true
      },
    ]
  },
] 