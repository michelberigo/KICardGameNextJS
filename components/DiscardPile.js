function DiscardPile({ cards }) {
    const cardColor = (card) => {
        let cardClass = '';

        if (card.type_id == 1) {
            cardClass += 'card-damage';
        } else if (card.type_id == 2) {
            cardClass += 'card-recovery';
        } else if (card.type_id == 3) {
            cardClass += 'card-special';
        }

        return cardClass;
    }

    const [lastCard] = cards.slice(-1);

    return (
        <>
            {
                lastCard &&
                <div className={ 'card mx-auto ' + cardColor(lastCard) } style={{ width: '8rem', height: '9rem' }}>
                    <div className="card-header px-1 py-2">
                        <div className="text-end"><span className="badge rounded-pill bg-primary">{ lastCard.cost }</span></div>
                    </div>
                    
                    <div className="card-body text-center px-1 py-2">
                        <h6 style={{ fontSize: '12px' }} className="text-uppercase text-danger fw-bold">{ lastCard.name }</h6>
                        <div style={{ fontSize: '12px' }}>{ lastCard.description }</div>
                    </div>

                    <div className="card-footer d-flex justify-content-center align-items-center">
                        <span className="badge rounded-pill bg-primary">{ lastCard.type.name }</span>
                    </div>
                </div>
            }
        </>
    );
}

export default DiscardPile;