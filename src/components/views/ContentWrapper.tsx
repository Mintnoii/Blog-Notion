
 export default function ContentWrapper({ children }: {children: React.ReactNode}) {
  return (
    <section className='max-w-2xl break-all md:max-w-lg lg:max-w-xl xl:max-w-2xl'>
       {children}
    </section>
  )
}
