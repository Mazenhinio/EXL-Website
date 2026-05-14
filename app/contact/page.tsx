import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact | EXL Agency',
  description: 'Book a 20-minute call. No deck, no pitch. Just a conversation about what you\'re trying to ship.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <div className="pt-40 pb-20">
        <ContactForm />
      </div>
      <Footer variant="dark" />
    </main>
  )
}
