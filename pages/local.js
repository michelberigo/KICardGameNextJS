import { useState } from "react";
import Game from "../components/Game";
import SelectFighter from "../components/SelectFighter";

export async function getServerSideProps() {
    let res = await fetch(`https://ki-card-game-api.herokuapp.com/api/fighters`)
    res = await res.json()

    let fighters = res.data;

    return { props: { fighters } }
}

function Single({ fighters }) {
    const [metaGame, setMetaGame] = useState({can_start: false});

    const [players, setPlayers] = useState({
        player_1: {
            fighter_id: '',
            fighter_name: '',
            turn_player: false,
        },
        player_2: {
            fighter_id: '',
            fighter_name: '',
            turn_player: false,
        }
    })

    const playGame = () => {
        if (players.player_1.fighter_id && players.player_2.fighter_id) {
            let player1Fighter = fighters.find(x => x.id == players.player_1.fighter_id);
            let player2Fighter = fighters.find(x => x.id == players.player_2.fighter_id);
    
            setPlayers((prevState) => ({
                player_1: {
                    ...prevState.player_1,
                    fighter_name: player1Fighter.name,
                    fighter_avatar_url: player1Fighter.avatar_url,
                    life: player1Fighter.life,
                    armor: player1Fighter.armor,
                    damage_energy: player1Fighter.damage_energy,
                    recovery_energy: player1Fighter.recovery_energy,
                    special_energy: player1Fighter.special_energy,
                    damage_energy_per_turn: player1Fighter.damage_energy_per_turn,
                    recovery_energy_per_turn: player1Fighter.recovery_energy_per_turn,
                    special_energy_per_turn: player1Fighter.special_energy_per_turn,
                    deck: player1Fighter.deck,
                    hand: [],
                    discard_pile: [],
                    winner: false,
                    /*description: player1Fighter.description,
                    qtde_turns_use_hability: player1Fighter.qtde_turns_use_hability,*/
                },
                player_2: {
                    ...prevState.player_2,
                    fighter_name: player2Fighter.name,
                    fighter_avatar_url: player2Fighter.avatar_url,
                    life: player2Fighter.life,
                    armor: player2Fighter.armor,
                    damage_energy: player2Fighter.damage_energy,
                    recovery_energy: player2Fighter.recovery_energy,
                    special_energy: player2Fighter.special_energy,
                    damage_energy_per_turn: player2Fighter.damage_energy_per_turn,
                    recovery_energy_per_turn: player2Fighter.recovery_energy_per_turn,
                    special_energy_per_turn: player2Fighter.special_energy_per_turn,
                    deck: player2Fighter.deck,
                    hand: [],
                    discard_pile: [],
                    winner: false,
                }
            }));
    
            setMetaGame({can_start: true});
        } else {
            alert('No!');
        }
    }

    return (
        <>
            { metaGame.can_start
                ? <Game players={players} setPlayers={setPlayers} setMetaGame={setMetaGame} />
                : <SelectFighter players={players} setPlayers={setPlayers} fighters={fighters} playGame={playGame} /> }
        </>
    );
}

export default Single;