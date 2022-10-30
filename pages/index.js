import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>KI - Card Game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="d-flex justify-content-center align-items-center">
        <ul className="list-group w-25">
          <li className="list-group-item py-3 text-center"><Link href="/single">Single</Link></li>
          <li className="list-group-item py-3 text-center"><Link href="/local">Local</Link></li>
          <li className="list-group-item py-3 text-center"><Link href="/multiplayer">Multiplayer</Link></li>
        </ul>
      </div>
    </>
  )
}
