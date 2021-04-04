let image = document.getElementById("player-image")
let playerName = document.getElementById("player-name")

const players = []

const addPlayer = () => {
    const player = {
      image: image.value,
      name: playerName.value,
      victories: 0,
      draws: 0,
      losses: 0,
      totalPoints: 0,

      calcPoints() {
        total = this.victories * 3 + this.draws * 1

        this.totalPoints = total
      }
    }
    players.push(player)

    updateList()
    clearFields()
}
document.getElementById("addPlayer").onclick = addPlayer

const updateList = () => {
    document.querySelector("tbody").innerHTML = ""

    players.forEach(setOnList)
}

const setOnList = (player, index) => {
    const tr = document.createElement("tr")
    tr.innerHTML = `
        <td><img src="${player.image}" alt="Imagem do jogador"></td>
        <td>${player.name}</td>
        <td>${player.victories}</td>
        <td>${player.draws}</td>
        <td>${player.losses}</td>
        <td>${player.totalPoints}</td>
        <td><button onclick="addVictory(${index})">Vitória</button></td>
        <td><button onclick="addDraw(${index})">Empate</button></td>
        <td><button onclick="addLoss(${index})">Derrota</button></td>
    `
    tr.dataset.index = index
    document.querySelector("tbody").appendChild(tr)
}

const clearFields = () => {
    image.value = ""
    playerName.value = ""
}

const addVictory = (index) => {
    const player = players[index]
    player.victories += 1

    player.calcPoints()
    updateClassification(players)
    updateList()
}

const addDraw = (index) => {
    const player = players[index]
    player.draws += 1

    player.calcPoints()
    updateClassification(players)
    updateList()
}

const addLoss = (index) => {
    const player = players[index]
    player.losses += 1

    player.calcPoints()
    updateClassification(players)
    updateList()
}

const updateClassification = (array) => {
    let len = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len-1; i++) {
            if (array[i].totalPoints < array[i + 1].totalPoints) {
                let tmp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = tmp;
                swapped = true;
            }
        }
    } while (swapped);
}