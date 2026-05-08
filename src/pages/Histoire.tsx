import Story from "../components/Story";

export default function Histoire() {
  return (
    <div className="pt-20 md:pt-24 lg:pt-28">
      <Story />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif text-luxury-ink mb-6">Un Heritage d'Exception</h3>
            <p className="text-luxury-muted font-light italic leading-relaxed">
              Ancrée au cœur de Kribi, notre maison perpétue une vision de la fleuristerie qui allie l'exubérance de la nature camerounaise et une audace créative sans pareille. 
              Chaque année de notre histoire est une pétale ajoutée à notre identité locale et nationale.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
