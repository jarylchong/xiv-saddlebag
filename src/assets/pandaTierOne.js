export default [
  { 
    number: 1, 
    title: "Asphodelos: The First Circle", 
    tier: 1,
    bossName: "Erichtonios",
    pfText: (getReadableStrat) => {
      return `[   Partners  |  ${getReadableStrat('intemp')} Intemp  |  Timers  |  ${getReadableStrat('shiningCells')}   ]` 
    },
    mechanics: [
      {
        name: "Intemperance",
        key: "intemp",
        options: [
          { text: "Joonbob", value: "Joonbob" },
          { text: "N/NW Flex", value: "N/NW Flex"},
          { text: "Tank DD", value: "\"I'm bad and I should feel bad\"" },
        ],
        default: "Joonbob"
      },
      { 
        name: "Shining Cells (red/white floor)",
        key: "shiningCells",
        options: [
          { text: "Red Safe", value: "Red Safe" },
          { text: "White Safe", value: "White Safe" }
        ],
        default: "Red Safe"
      }
    ]
  },
  { 
    number: 2, 
    title: "Asphodelos: The Second Circle", 
    tier: 1,
    bossName: "Hippokampos",
    pfText: (getReadableStrat) => {
      return `[   ${getReadableStrat('dpsTankDebuff')}   ]` 
    },
    mechanics: [
      {
        name: "Predatory Avarice (dps + tank debuff)",
        key: "dpsTankDebuff",
        options: [
          { text: "DPS right / corner", value: "DPS right / corner" },
          { text: "DPS left / middle", value: "DPS left / middle" },
          { text: "Tank right / corner", value: "Tank right / corner" },
          { text: "Tank left / middle", value: "Tank left / middle" },
        ],
        default: "DPS right / corner"
      }
    ]
  },
] 