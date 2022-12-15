const game_functions = {
    setTurnPlayer: function(turn, players) {
        if (turn % 2 == 1) {
            players.player_1.turn_player = true;
            players.player_2.turn_player = false;
        } else {
            players.player_1.turn_player = false;
            players.player_2.turn_player = true;
        }

        return players;
    },

    getTurnPlayer: function(players) {
        let player = players.player_1.turn_player ? players.player_1 : players.player_2;

        return player;
    },

    getPlayersByTurn: function(player1, player2) {
        let turnPlayer = player1.turn_player ? player1 : player2;
        let nonTurnPlayer = !player1.turn_player ? player1 : player2;

        return {
            'turn_player': turnPlayer,
            'non_turn_player': nonTurnPlayer
        }
    },

    getPlayersByPosition: function(players, turn) {
        let player1 = turn % 2 == 1 ? players.turn_player : players.non_turn_player;
        let player2 = turn % 2 == 0 ? players.turn_player : players.non_turn_player;

        return {
            'player_1': player1,
            'player_2': player2
        }
    },

    receiveEffect: function(player, card, isTurnPlayer) {
        if (isTurnPlayer) {
            if (card.current_player_damage > 0) {
                player = this.applyDamage(player, card.current_player_damage);
            }

            if (card.current_player_damage_life > 0) {
                player.life -= card.current_player_damage_life;
            }

            if (card.current_player_damage_armor > 0) {
                player.amor -= card.current_player_damage_armor;
                player.armor = this.resetValue(player.armor, 0);
            }

            if (card.current_player_recovery_life > 0) {
                player.life += card.current_player_recovery_life;
            }

            if (card.current_player_recovery_armor > 0) {
                player.armor += card.current_player_recovery_armor;
            }

            if (card.current_player_add_damage_energy > 0) {
                player.damage_energy += card.current_player_add_damage_energy;
            }

            if (card.current_player_add_recovery_energy > 0) {
                player.recovery_energy += card.current_player_add_recovery_energy;
            }

            if (card.current_player_add_special_energy > 0) {
                player.special_energy += card.current_player_add_special_energy;
            }

            if (card.current_player_add_damage_energy_per_turn > 0) {
                player.damage_energy_per_turn += card.current_player_add_damage_energy_per_turn;
            }

            if (card.current_player_add_recovery_energy_per_turn > 0) {
                player.recovery_energy_per_turn += card.current_player_add_recovery_energy_per_turn;
            }

            if (card.current_player_add_special_energy_per_turn > 0) {
                player.special_energy_per_turn += card.current_player_add_special_energy_per_turn;
            }

            if (card.current_player_remove_damage_energy > 0) {
                player.damage_energy -= card.current_player_remove_damage_energy;
                player.damage_energy = this.resetValue(player.damage_energy, 0);
            }

            if (card.current_player_remove_recovery_energy > 0) {
                player.recovery_energy -= card.current_player_remove_recovery_energy;
                player.recovery_energy = this.resetValue(player.recovery_energy, 0);
            }

            if (card.current_player_remove_special_energy > 0) {
                player.special_energy -= card.current_player_remove_special_energy;
                player.special_energy = this.resetValue(player.special_energy, 0);
            }

            if (card.current_player_remove_damage_energy_per_turn > 0) {
                player.damage_energy_per_turn -= card.current_player_remove_damage_energy_per_turn;
                player.damage_energy_per_turn = this.resetValue(player.damage_energy_per_turn, 1);
            }

            if (card.current_player_remove_recovery_energy_per_turn > 0) {
                player.recovery_energy_per_turn -= card.current_player_remove_recovery_energy_per_turn;
                player.recovery_energy_per_turn = this.resetValue(player.recovery_energy_per_turn, 1);
            }

            if (card.current_player_remove_special_energy_per_turn > 0) {
                player.special_energy_per_turn -= card.current_player_remove_special_energy_per_turn;
                player.special_energy_per_turn = this.resetValue(player.special_energy_per_turn, 1);
            }
        } else {
            if (card.other_player_damage > 0) {
                player = this.applyDamage(player, card.other_player_damage);
            }

            if (card.other_player_damage_life > 0) {
                player.life -= card.other_player_damage_life;
            }

            if (card.other_player_damage_armor > 0) {
                player.armor -= card.other_player_damage_armor;
                player.armor = this.resetValue(player.armor, 0);
            }

            if (card.other_player_recovery_life > 0) {
                player.life += card.other_player_recovery_life;
            }

            if (card.other_player_recovery_armor > 0) {
                player.armor += card.other_player_recovery_armor;
            }

            if (card.other_player_add_damage_energy > 0) {
                player.damage_energy += card.other_player_add_damage_energy;
            }

            if (card.other_player_add_recovery_energy > 0) {
                player.recovery_energy += card.other_player_add_recovery_energy;
            }

            if (card.other_player_add_special_energy > 0) {
                player.special_energy += card.other_player_add_special_energy;
            }

            if (card.other_player_add_damage_energy_per_turn > 0) {
                player.damage_energy_per_turn += card.other_player_add_damage_energy_per_turn;
            }

            if (card.other_player_add_recovery_energy_per_turn > 0) {
                player.recovery_energy_per_turn += card.other_player_add_recovery_energy_per_turn;
            }

            if (card.other_player_add_special_energy_per_turn > 0) {
                player.special_energy_per_turn += card.other_player_add_special_energy_per_turn;
            }

            if (card.other_player_remove_damage_energy > 0) {
                player.damage_energy -= card.other_player_remove_damage_energy;
                player.damage_energy = this.resetValue(player.damage_energy, 0);
            }

            if (card.other_player_remove_recovery_energy > 0) {
                player.recovery_energy -= card.other_player_remove_recovery_energy;
                player.recovery_energy = this.resetValue(player.recovery_energy, 0);
            }

            if (card.other_player_remove_special_energy > 0) {
                player.special_energy -= card.other_player_remove_special_energy;
                player.special_energy = this.resetValue(player.special_energy, 0);
            }

            if (card.other_player_remove_damage_energy_per_turn > 0) {
                player.damage_energy_per_turn -= card.other_player_remove_damage_energy_per_turn;
                player.damage_energy_per_turn = this.resetValue(player.damage_energy_per_turn, 1);
            }

            if (card.other_player_remove_recovery_energy_per_turn > 0) {
                player.recovery_energy_per_turn -= card.other_player_remove_recovery_energy_per_turn;
                player.recovery_energy_per_turn = this.resetValue(player.recovery_energy_per_turn, 1);
            }

            if (card.other_player_remove_special_energy_per_turn > 0) {
                player.special_energy_per_turn -= card.other_player_remove_special_energy_per_turn;
                player.special_energy_per_turn = this.resetValue(player.special_energy_per_turn, 1);
            }
        }

        return player;
    },

    applyDamage: function(player, damage) {
        if (player.armor - damage >= 0) {
            player.armor -= damage;
        } else if (player.armor > 0 && player.armor - damage < 0) {
            let lifeDamage = player.armor - damage;

            player.armor = 0;
            player.life += lifeDamage;

            player.life = this.resetValue(player.life, 0);
        } else {
            player.life -= damage;

            player.life = this.resetValue(player.life, 0);
        }

        return player;
    },

    checkWinner: function (nonTurnPlayer) {
        let winner = false;

        if (nonTurnPlayer.life <= 0) {
            winner = true;
        }

        return winner;
    },

    moveCardToDiscardPile: function (player, cardPosition, cardDiscarded) {
        let cardToDiscardPile = player.hand.splice(cardPosition, 1);
        cardToDiscardPile[0].discarded = cardDiscarded;

        player.discard_pile.push(cardToDiscardPile[0]);

        return player;
    },

    drawCard: function (player, numberOfCards) {
        if (player.deck.length < numberOfCards) {
            player = this.moveDiscardPileToDeck(player);
        }

        let cardsDrew = player.deck.splice(0, numberOfCards);

        cardsDrew.forEach(function (card) {
            player.hand.push(card);
        });

        return player;
    },

    moveDiscardPileToDeck: function (player) {
        let cardsToDeck = player.discard_pile.splice(0, player.discard_pile.length);

        cardsToDeck.forEach(function (card) {
            player.deck.push(card);
        });

        player.deck = this.shuffleDeck(player.deck);

        return player;
    },

    shuffleDeck: function (deck) {
        deck = [...deck];

        var j, x, i;

        for (i = deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = deck[i];

            deck[i] = deck[j];
            deck[j] = x;
        }

        return deck;
    },

    addEnergies: function (player) {
        player.damage_energy += player.damage_energy_per_turn;
        player.recovery_energy += player.recovery_energy_per_turn;
        player.special_energy += player.special_energy_per_turn;

        return player;
    },

    calculateEnergy: function (player, card) {
        if (card.type_id == 1) {
            player.damage_energy -= card.cost;
        } else if (card.type_id == 2) {
            player.recovery_energy -= card.cost;
        } else if (card.type_id == 3) {
            player.special_energy -= card.cost;
        }

        return player;
    },

    resetValue: function (value, valueToReset) {
        value = value < valueToReset ? valueToReset : value;

        return value;
    },

    isPlayableCard: function (player, card) {
        let playable = true;

        if ((card.type_id == 1 && card.cost > player.damage_energy)
            || (card.type_id == 2 && card.cost > player.recovery_energy)
            || (card.type_id == 3 && card.cost > player.special_energy)
        ) {
            playable = false;
        }

        return playable;
    },

    getPlayableCards: function (player) {
        let _this = this;
        let playableCards = [];

        player.hand.forEach(function (card, index) {
            if (_this.isPlayableCard(player, card)) {
                card.position_in_hand = index;

                playableCards.push(card);
            }
        });

        return playableCards;
    },

    canUseHability: function (player) {
        let canUseHability = player.turn_use_hability % player.qtde_turns_use_hability == 0;

        return canUseHability;
    },

    useHability: function (player) {
        switch (player.slug) {
            case 'Sabrewulf':
                player = fightersFunctions.sabrewulfHability(player);
                break;
            case 'Riptor':
                player = fightersFunctions.riptorHability(player);
                break;
        }

        return player;
    },
}

export default game_functions;