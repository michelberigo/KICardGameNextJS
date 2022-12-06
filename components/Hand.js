import Card from "./Card";
import CardCover from "./CardCover";

function Hand({ cards, player, playCard, eventDiscardCard }) {
    const showCard = (card, i) => {
        return (
            <div className="col d-flex justify-content-center" key={i} >
                {
                    !player.is_cpu
                    ? <Card card={card} positionInHand={i} player={player} playCard={playCard} eventDiscardCard={eventDiscardCard} />
                    : <CardCover />
                }
                
            </div>
        )
    }

    return (
        <div className="mt-auto py-2 bg-light">
            <div className="row">
                { cards.map((card, i) => {
                    return showCard(card, i);
                }) }
            </div>
        </div>
    )
}

export default Hand;