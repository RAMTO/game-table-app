
const state = {
  games: [
    {
      name: 'Mars'
    },
    {
      name: 'Seasons'
    },
    {
      name: 'Dinosaurs'
    }
  ],
  players: [
    {
      name: 'Mila'
    },
    {
      name: 'Petya'
    },
    {
      name: 'Dani'
    },
    {
      name: 'Vlado'
    }
  ],
  sessions: [
    {
      gameId: 2,
      date: null,
      players: [0, 1, 2, 3],
      places: [
        {
          label: '1st place',
          playerId: 0,
          points: 123
        },
        {
          label: '2nd place',
          playerId: 1,
          points: 53
        },
        {
          label: '3rd place',
          playerId: 2,
          points: 45
        },
        {
          label: '4th place',
          playerId: 3,
          points: 10
        }
      ]
    },
    {
      gameId: 1,
      date: null,
      players: [0, 1, 2],
      places: [
        {
          label: '1st place',
          playerId: 2,
          points: 423
        },
        {
          label: '2nd place',
          playerId: 0,
          points: 143
        },
        {
          label: '3rd place',
          playerId: 1,
          points: 35
        }
      ]
    },
    {
      gameId: 0,
      date: null,
      players: [1, 2, 3],
      places: [
        {
          label: '1st place',
          playerId: 2,
          points: 523
        },
        {
          label: '2nd place',
          playerId: 1,
          points: 253
        },
        {
          label: '3rd place',
          playerId: 3,
          points: 445
        }
      ]
    }
  ]
}

const formNewSession = document.querySelector('#formNewSession')

const renderTableSessions = () => {
  const rows = state.sessions.map((item, index) => {
    const gameName = state.games[item.gameId].name
    const firstPlaceLabel = state.players[item.places[0].playerId].name
    const secondPlaceLabel = state.players[item.places[1].playerId].name
    const thirdPlaceLabel = state.players[item.places[2].playerId].name
    const fourthPlaceLabel = item.places.length > 3 ? state.players[item.places[3].playerId].name : '-'

    return `
  <tr>
    <td>
      ${gameName}
    </td>
    <td>
      ${firstPlaceLabel}
    </td>
    <td>
      ${secondPlaceLabel}
    </td>
    <td>
      ${thirdPlaceLabel}
    </td>
    <td>
      ${fourthPlaceLabel}
    </td>
    <td class="text-center">
      <i class="fas fa-times js-item-remove" data-id="${index}"></i>
    </td>
  </tr>
  `
  }).join('')
  const tableResults = document.querySelector('#tableResults')
  tableResults.innerHTML = `
  <table class="table table-hover">
    <tr>
      <td>
        <strong class="text-light">Game name</strong>
      </td>
      <td>
        <strong class="text-light">I place</strong>
      </td>
      <td>
        <strong class="text-light">II place</strong>
      </td>
      <td>
        <strong class="text-light">III place</strong>
      </td>
      <td>
        <strong class="text-light">IV place</strong>
      </td>
      <td class="text-center">
        <strong class="text-light">Actions</strong>
      </td>
    </tr>
    ${rows}
  </table>
`
}

const renderTablePlayers = () => {
  const rows = state.players.map((item, index) => {
    const playerName = item.name
    const firstPlaceLabel = state.sessions.reduce((acc, session) => {
      acc = acc + session.places.reduce((placeAcc, place, placeIndex) => {
        if (place.playerId === index && placeIndex === 0) {
          placeAcc++
        }
        return placeAcc
      }, 0)
      return acc
    }, 0)
    const secondPlaceLabel = state.sessions.reduce((acc, session) => {
      acc = acc + session.places.reduce((placeAcc, place, placeIndex) => {
        if (place.playerId === index && placeIndex === 1) {
          placeAcc++
        }
        return placeAcc
      }, 0)
      return acc
    }, 0)
    const thirdPlaceLabel = state.sessions.reduce((acc, session) => {
      acc = acc + session.places.reduce((placeAcc, place, placeIndex) => {
        if (place.playerId === index && placeIndex === 2) {
          placeAcc++
        }
        return placeAcc
      }, 0)
      return acc
    }, 0)
    const fourthPlaceLabel = state.sessions.reduce((acc, session) => {
      acc = acc + session.places.reduce((placeAcc, place, placeIndex) => {
        if (place.playerId === index && placeIndex === 3) {
          placeAcc++
        }
        return placeAcc
      }, 0)
      return acc
    }, 0)

    return `
  <tr>
    <td>
      ${playerName}
    </td>
    <td class="text-right">
      ${firstPlaceLabel}
    </td>
    <td class="text-right">
      ${secondPlaceLabel}
    </td>
    <td class="text-right">
      ${thirdPlaceLabel}
    </td>
    <td class="text-right">
      ${fourthPlaceLabel}
    </td>
  </tr>
  `
  }).join('')
  const tableResults = document.querySelector('#tablePlayers')
  tableResults.innerHTML = `
  <table class="table table-hover">
    <tr>
      <td>
        <strong class="text-light">Player name</strong>
      </td>
      <td class="text-right">
        <strong class="text-light">I places</strong>
      </td>
      <td class="text-right">
        <strong class="text-light">II places</strong>
      </td>
      <td class="text-right">
        <strong class="text-light">III places</strong>
      </td>
      <td class="text-right">
        <strong class="text-light">IV places</strong>
      </td>
    </tr>
    ${rows}
  </table>
`
}

const renderSelectGames = (games) => {
  const selectGames = document.querySelector('#selectGames')
  selectGames.innerHTML = games.map((item, index) => {
    return `
      <option value="${index}">${item.name}</option>
    `
  }).join('')
}

const renderSelectPlayers = (players) => {
  const selectPlayers = document.querySelectorAll('.select-players')
  selectPlayers.forEach(el => {
    el.innerHTML = players.map((item, index) => {
      return `
        <option value="${index}">${item.name}</option>
      `
    }).join('')
  })
}

const handleFormSubmit = e => {
  e.preventDefault()
  const gameId = parseInt(document.querySelector('#selectGames').value, 10)
  const firstPlayerId = parseInt([...document.querySelectorAll('.select-players')][0].value, 10)
  const secondPlayerId = parseInt([...document.querySelectorAll('.select-players')][1].value, 10)
  const thirdPlayerId = parseInt([...document.querySelectorAll('.select-players')][2].value, 10)
  const newSession = {
    gameId,
    date: null,
    players: [1, 2, 3],
    places: [
      {
        label: '1st place',
        playerId: firstPlayerId,
        points: 0
      },
      {
        label: '2nd place',
        playerId: secondPlayerId,
        points: 0
      },
      {
        label: '3rd place',
        playerId: thirdPlayerId,
        points: 0
      }
    ]
  }
  const sessionsUpadated = [...state.sessions, newSession]
  /*
    this.setState(prevState => ({
      sessions: [...prevState.sessions, newSession]
    }))
  */
  state.sessions = sessionsUpadated
  renderTableSessions()
  renderTablePlayers()
}

const handleItemDelete = e => {
  if ([...e.target.classList].includes('js-item-remove')) {
    const itemId = parseInt(e.target.dataset.id, 10)
    const sessionsUpadated = state.sessions.filter((item, index) => index !== itemId)
    state.sessions = sessionsUpadated
    renderTableSessions()
    renderTablePlayers()
  }
}

formNewSession.addEventListener('submit', handleFormSubmit)
document.addEventListener('click', handleItemDelete)

renderTableSessions()
renderTablePlayers()
renderSelectGames(state.games)
renderSelectPlayers(state.players)
