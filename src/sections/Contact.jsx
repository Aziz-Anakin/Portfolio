import SectionHeading from '../components/SectionHeading.jsx'
import IdCard from '../components/IdCard.jsx'
import mark from '../assets/marks/one-piece-6.svg'

function Contact({ onOpenCv }) {
  return (
    <section id="contact" className="py-20 sm:py-24 bg-transparent reveal" data-reveal>
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <SectionHeading title="Contact" mark={mark} />

        <IdCard onOpenCv={onOpenCv} />
      </div>
    </section>
  )
}

export default Contact
