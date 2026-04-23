import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: 'NZEYIMANA Francois Xavier',
    image: '/imports/Screenshot_2026-04-16_110117.png',
    grade: 'Middle class Nursery',
    text: 'We are proud to entrust our children to this Christian school, where they are nurtured in both academic excellence and strong social values. Through diverse club activities, students grow in knowledge, character, and confidence in engaging with others.'
  },
  {
    name: 'MUTESI Adrienne',
    image: '/imports/Screenshot_2026-04-16_104329.png',
    grade: 'Grade 2 and Grade 5',
    text: 'As a ministry of Restoration Church, this school instills the Word of God while nurturing children through music, drama, sports, and quality education. It builds strong values, good character, and language excellence—my children now speak English fluently both at school and at home.'
  },
  {
    name: 'KABERA Marcel',
    image: '/imports/Screenshot_2026-04-16_104736.png',
    grade: 'Upper class Nursery',
    text: 'This school provides excellent teaching and academic results, helping children achieve distinction and success in their studies. Through weekly Friday sermons and prayer gatherings, students develop strong values, discipline, and admirable behavior, which is why I confidently encourage other parents to enroll their children here.'
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-blue-900 mb-4">What Parents Say</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Hear from our trusted community of parents</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-600"
                />
                <div>
                  <h4 className="text-lg text-blue-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.grade}</p>
                </div>
              </div>
              <div className="mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
