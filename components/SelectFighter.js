import Head from "next/head";

function SelectFighter({ players, setPlayers, fighters, playGame }) {
    const listFighters = (player) => {
        return fighters.map((fighter, index) =>
            <div className="col-sm-3 my-2" key={ index }>
                <div className="form-check">
                    <label>
                        <input className="form-check-input" type="radio" name="fighter_id" value={ fighter.id } data-player={player} onClick={handleChange} />
                        <img src={fighter.avatar_url} alt={fighter.name} width="100%" title={fighter.name} className="select-fighter" />
                    </label>
                </div>
            </div>
        );
    }

    const handleChange = (event) => {
        setPlayers((prevState) => ({
            ...prevState,
            [event.target.dataset.player]: {
                ...prevState[event.target.dataset.player],
                [event.target.name]: event.target.value
            }
        }));
    }

    return (
        <>
            <Head>
                <title>Select Fighter</title>
            </Head>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <form>
                            <div className="row">
                                { listFighters('player_1') }
                            </div>
                        </form>
                    </div>

                    <div className="col-sm-4">
                        <div className="h-100 d-flex justify-content-center align-items-center">
                            <button type="button" className="btn btn-success" onClick={playGame}>PLAY!</button>
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <form>
                            <div className="row">
                                { listFighters('player_2') }
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SelectFighter;