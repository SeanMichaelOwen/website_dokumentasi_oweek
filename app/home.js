import Image from 'next/image'
import Footer from './components/footer'
import Jumbotron from './components/jumbotron'

export default function Homes() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Jumbotron />
      <main className="px-4 py-8"> 
        {/* <section className="mt-12">
          <h2 className="text-2xl font-semibold">Recruitment</h2>
          <div className="mt-4">
            <Image src="/path-to-image.jpg" alt="Oprec 9" width={500} height={300} />
            <p className="mt-2">Oprec Koper Jember starting from the second to the fourth of December...</p>
          </div>
        </section> */}

        {/* <section className="mt-12">
          <h2 className="text-2xl font-semibold">Room Training</h2>
          <div className="mt-4">
            <Image src="/path-to-image.jpg" alt="Koper 9" width={500} height={300} />
            <p className="mt-2">Some of the material discussed regarding the world of film...</p>
          </div>
        </section> */}
      </main>
      {/* <Footer /> */}
    </div>
  )
}