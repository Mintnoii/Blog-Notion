import Hero from '@/modules/hero'

 export default async function Home() {
  return (
    <section className='break-words max-w-xs md:max-w-lg lg:max-w-xl xl:max-w-2xl pt-[25vh]'>
      <Hero />
    </section>
  )
}
