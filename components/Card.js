function Card({ card, positionInHand, player, playCard, eventDiscardCard }) {
    const cardPlayable = () => {
        let playable = true;

        if ((card.type_id == 1 && card.cost > player.damage_energy)
            || (card.type_id == 2 && card.cost > player.recovery_energy)
            || (card.type_id == 3 && card.cost > player.special_energy)
        ) {
            playable = false;
        }

        return playable;
    }

    const cardColor = () => {
        let cardClass = '';

        if (!cardPlayable()) {
            cardClass += 'card-not-playable';
        } else {
            if (card.type_id == 1) {
                cardClass += 'card-damage';
            } else if (card.type_id == 2) {
                cardClass += 'card-recovery';
            } else if (card.type_id == 3) {
                cardClass += 'card-special';
            }
        }

        return cardClass;
    }

    const cardOpacity = () => {
        let cardOpacity = '';

        if (!cardPlayable()) {
            cardOpacity = 'opacity-75';
        }

        return cardOpacity;
    }

    return (
        <div className={ 'card mx-auto stretched-link ' + cardOpacity() + ' ' + cardColor() }
            style={{ width: '8rem', height: '9rem' }} onClick={(event) => playCard(card, positionInHand, cardPlayable())}
            onContextMenu={(event) => eventDiscardCard(event, card, positionInHand)}
        >
            <div className="card-header px-1">
                <span className="badge rounded-pill bg-primary">{ card.type.name }</span>
                <span className="float-end"><span className="badge rounded-pill bg-primary">{ card.cost }</span></span>
            </div>
            
            <div className="card-body text-center px-1 py-2">
                <h6 style={{ fontSize: '12px' }} className="text-uppercase text-danger fw-bold">{ card.name }</h6>
                <div style={{ fontSize: '12px' }}>{ card.description }</div>
            </div>
        </div>
    )
}

export default Card;