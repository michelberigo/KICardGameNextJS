import Head from "next/head";
import { useEffect, useState } from "react";
import Player from "./Player";
import game_functions from '../helpers/game_functions'
import Hand from "./Hand";
import DiscardPile from "./DiscardPile";

function Game({ players, setPlayers, setMetaGame }) {
    const [game, setGame] = useState({turn: 0});

    useEffect(() => {
        if (players.player_1.winner || players.player_2.winner) {
            let winnerPlayer = players.player_1.winner ? players.player_1 : players.player_2;

            finishGame(winnerPlayer);
        }
    });

    const finishGame = (winnerPlayer) => {
        let message = winnerPlayer.fighter_name + ' won!';

        setTimeout(() => {
            alert(message);
            setMetaGame({can_start: false});
        }, 200);
    }

    const initGame = () => {
        players = {...players};

        players.player_1.deck = game_functions.shuffleDeck(players.player_1.deck);
        players.player_2.deck = game_functions.shuffleDeck(players.player_2.deck);
        players.player_1 = game_functions.drawCard(players.player_1, 5);
        players.player_2 = game_functions.drawCard(players.player_2, 5);

        setPlayers((prevState) => (players));

        initTurn();
    }

    const initTurn = () => {
        let turn = game.turn + 1;

        players = {...players};

        players = game_functions.setTurnPlayer(turn, players);
        players = game_functions.getPlayersByTurn(players.player_1, players.player_2);
        players.turn_player = game_functions.addEnergies(players.turn_player);
        players = game_functions.getPlayersByPosition(players, turn);

        setGame({turn: turn});
        setPlayers((prevState) => (players));
    }

    const playCard = (event, card, cardPositionInHand, cardPlayable) => {
        if (!cardPlayable) {
            return;
        }

        players = {...players};

        players = game_functions.getPlayersByTurn(players.player_1, players.player_2);
        players.turn_player = game_functions.calculateEnergy(players.turn_player, card);
        players.turn_player = game_functions.receiveEffect(players.turn_player, card, true);
        players.non_turn_player = game_functions.receiveEffect(players.non_turn_player, card, false);
        players.turn_player = game_functions.moveCardToDiscardPile(players.turn_player, cardPositionInHand);
        players.turn_player.winner = game_functions.checkWinner(players.non_turn_player);
        players.turn_player = game_functions.drawCard(players.turn_player, 1);

        players = game_functions.getPlayersByPosition(players, game.turn);

        setPlayers((prevState) => (players));

        setTimeout(() => {
            initTurn();
        }, 200);
    }

    const discardCard = (event, card, cardPositionInHand) => {
        event.preventDefault();

        players = {...players};

        players = game_functions.getPlayersByTurn(players.player_1, players.player_2);
        players.turn_player = game_functions.moveCardToDiscardPile(players.turn_player, cardPositionInHand);
        players.turn_player = game_functions.drawCard(players.turn_player, 1);

        players = game_functions.getPlayersByPosition(players, game.turn);

        console.log(players);

        setPlayers((prevState) => (players));

        setTimeout(() => {
            initTurn();
        }, 200);
    }

    useEffect(() => {
        initGame();
    }, []);

    return (
        <>
            <Head>
                <title>Game</title>
            </Head>

            <div className="container-fluid">
                <div className="h-75">
                    <div className="d-flex flex-column">
                        <div className="text-center mt-3"><b>Turno: { game.turn }</b></div>

                        <hr />

                        <div className="row">
                            <div className="col-sm-2">
                                <Player player={ players.player_1 } />
                            </div>

                            <div className="col-sm-4">
                                <div className="text-center">
                                    <h4>Discard Pile</h4>
                                    
                                    <DiscardPile cards={players.player_1.discard_pile}></DiscardPile>
                                </div>
                            </div>

                            <div className="col-sm-4">
                                <h4>Player 2</h4>
                                <h5>Hand</h5>
                                <ul>{players.player_2.hand.map((card, index) => <li key={index}>{card.name}</li>)}</ul>
                                <h5>Deck</h5>
                                <ul>{players.player_2.deck.map((card, index) => <li key={index}>{card.name}</li>)}</ul>
                                <h5>Discard</h5>
                                <ul>{players.player_2.discard_pile.map((card, index) => <li key={index}>{card.name}</li>)}</ul>
                            </div>

                            <div className="col-sm-2">
                                <Player player={ players.player_2 } />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-25">
                    <Hand cards={game_functions.getTurnPlayer(players).hand} player={game_functions.getTurnPlayer(players)}
                        playCard={playCard} discardCard={discardCard}
                    />
                </div>
            </div>
        </>
    );
}

export default Game;