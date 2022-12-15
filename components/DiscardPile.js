function DiscardPile({ cards }) {
    const cardColor = (card) => {
        let cardClass = '';

        if (card.discarded) {
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

    const [lastCard] = cards.slice(-1);

    return (
        <>
            {
                lastCard &&
                <div className={ 'card stretched-link ' + cardColor(lastCard) } style={{ width: '8rem', height: '9rem' }}>
                     <div className="card-header px-1">
                        <span className="badge rounded-pill bg-primary">{ lastCard.type.name }</span>
                        <span className="float-end"><span className="badge rounded-pill bg-primary">{ lastCard.cost }</span></span>
                    </div>
                    
                    <div className="card-body text-center px-1 py-2">
                        <h6 style={{ fontSize: '12px' }} className="text-uppercase text-danger fw-bold">{ lastCard.name }</h6>
                        <div style={{ fontSize: '12px' }}>{ lastCard.description }</div>
                    </div>
                </div>
            }
        </>
    );
}

export default DiscardPile;