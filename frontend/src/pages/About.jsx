import { ShieldCheck, Leaf, Truck, Heart } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="bg-forest-800 text-cream-50 py-16">
        <div className="container-pad text-center">
          <span className="eyebrow text-gold-300">Our Story</span>
          <h1 className="font-display text-4xl font-bold mt-3">About HerbalHub</h1>
          <p className="mt-4 max-w-2xl mx-auto text-cream-100/85">
            HerbalHub is a premium healthcare and wellness platform dedicated
            to providing quality products and convenient home delivery —
            rooted in Sonia Vihar, Delhi, and built for the community we serve.
          </p>
        </div>
      </section>

      <section className="container-pad py-16 grid lg:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700"
          alt="HerbalHub store"
          className="rounded-3xl shadow-premium w-full object-cover"
        />
        <div>
          <span className="eyebrow">Who We Are</span>
          <h2 className="font-display text-3xl font-bold text-forest-900 mt-3">Wellness, made trustworthy.</h2>
          <p className="mt-4 text-forest-700 leading-relaxed">
            We started HerbalHub with one belief — that quality healthcare
            essentials shouldn't be hard to find or hard to trust. From
            everyday first aid to traditional Ayurvedic formulations, every
            product on our shelves is sourced from verified brands and
            checked for authenticity.
          </p>
          <p className="mt-4 text-forest-700 leading-relaxed">
            Based in Sonia Vihar, Delhi, we proudly serve our neighbours with
            reliable home delivery, friendly support, and a genuine commitment
            to your family's wellbeing.
          </p>
        </div>
      </section>

      <section className="bg-forest-50/60 py-16">
        <div className="container-pad grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: "Genuine Products", desc: "Every item is sourced from verified, trusted brands." },
            { icon: Leaf, title: "Ayurvedic Heritage", desc: "A curated range rooted in traditional wellness practices." },
            { icon: Truck, title: "Reliable Delivery", desc: "Fast, careful home delivery across Sonia Vihar & nearby." },
            { icon: Heart, title: "Customer First", desc: "Friendly support whenever you need it, every single day." },
          ].map((item, i) => (
            <div key={i} className="card p-6 text-center">
              <item.icon className="mx-auto text-forest-700 mb-3" size={28} />
              <h3 className="font-semibold text-forest-900">{item.title}</h3>
              <p className="text-sm text-forest-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
   
   <section className="container-pad py-16">
  <div className="card p-8 text-center">

    <span className="eyebrow">
      Our Leadership 👔
    </span>

    <h2 className="font-display text-3xl font-bold text-forest-900 mt-3">
      Meet Our Team 🤝
    </h2>

    <div className="mt-6 space-y-3 text-forest-700">

      <p>
        👩‍💼 <b>CEO:</b> Ananya Mishraa
      </p>

      <p>
        👨‍💼 <b>Manager:</b> Kapil Mishra
      </p>

      <p>
        📧 <b>Email:</b> support@herbalhub.com
      </p>

      <p>
        📍 <b>Location:</b> New Delhi, India
      </p>

    </div>

  </div>
</section>
    </div>
  );
}
