import Head from "next/head";

function SelectFighter({ players, setPlayers, fighters, playGame, metaGame, setMetaGame }) {
    const listFighters = (player) => {
        return fighters.map((fighter, index) =>
            <div className="col-sm-3 my-2" key={ index }>
                <div className="form-check">
                    <label>
                        <input className="form-check-input" type="radio" name="fighter_id" value={ fighter.id } data-player={player} onChange={handleChange} />
                        <img src={fighter.avatar_url} alt={fighter.name} width="100%" title={fighter.name} className="select-fighter" />
                    </label>
                </div>
            </div>
        );
    }

    const handleChange = (event) => {
        if (metaGame[event.target.dataset.player].fighter_random) {
            event.preventDefault();
        } else {
            setPlayers((prevState) => ({
                ...prevState,
                [event.target.dataset.player]: {
                    ...prevState[event.target.dataset.player],
                    [event.target.name]: event.target.value
                }
            }));
        }
    }

    const handleMetaGameChange = (event) => {
        if (event.target.checked) {
            setPlayers((prevState) => ({
                ...prevState,
                [event.target.dataset.player]: {
                    ...prevState[event.target.dataset.player],
                    fighter_id: ''
                }
            }));
        }

        setMetaGame((prevState) => ({
            ...prevState,
            [event.target.dataset.player]: {
                ...prevState[event.target.dataset.player],
                [event.target.name]: event.target.checked
            }
        }));
    }

    return (
        <>
            <Head>
                <title>Select Fighter</title>
            </Head>

            <div className="container-fluid">
                <div className="row pt-3">
                    <div className="col-sm-4">
                        <form>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <input type="checkbox" className="btn-check" id="fighter-1-random" name="fighter_random" data-player="player_1" onClick={handleMetaGameChange} />
                                    <label className="btn btn-outline-secondary" htmlFor="fighter-1-random">Random</label>
                                </div>
                            </div>

                            <div className="row mt-3">
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
                                <div className="col-sm-12 text-center">
                                    <input type="checkbox" className="btn-check" id="fighter-2-random" name="fighter_random" data-player="player_2" onClick={handleMetaGameChange} />
                                    <label className="btn btn-outline-secondary" htmlFor="fighter-2-random">Random</label>
                                </div>
                            </div>

                            <div className="row mt-3">
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