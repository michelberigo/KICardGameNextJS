function Player({ player }) {
    return (
        <div className={ player.turn_player ? 'border border-success p-2' : '' }>
            <div>
                <h5 className="text-center">{ player.fighter_name }</h5>

                <h6>Life: { player.life }</h6>
                <h6>Armor: { player.armor }</h6>
            </div>

            <hr />

            <div className="card-damage">
                <h6 title="Damage Energy Per Turn">Damage: { player.damage_energy_per_turn }</h6>
                <h6 title="Current Damage Energy">Damage Energy: { player.damage_energy }</h6>
            </div>

            <hr />

            <div className="card-recovery">
                <h6 title="Recovery Energy Per Turn">Recovery: { player.recovery_energy_per_turn }</h6>
                <h6 title="Current Recovery Energy">Recovery Energy: { player.recovery_energy }</h6>
            </div>

            <hr />

            <div className="card-special">
                <h6 title="Special Energy Per Turn">Special: { player.special_energy_per_turn }</h6>
                <h6 title="Current Special Energy">Special Energy: { player.special_energy }</h6>
            </div>
        </div>
    )
}

export default Player;