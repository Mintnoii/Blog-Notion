import Hero from '@/modules/hero'

 export default async function Home() {
  return (
    <section className='max-w-2xl break-all md:max-w-lg lg:max-w-xl xl:max-w-2xl xs:max-w-xs'>
      <Hero />
    </section>
  )
}
