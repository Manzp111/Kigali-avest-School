"use client";
export function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-200 border-l-4 border-[#1E4F9A] p-6 mb-12">
          <p className="text-lg text-gray-800">
            <strong>Admissions Open – Limited Spaces Available</strong>
          </p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl text-blue-900 mb-4">Welcome to Kigali Harvest School</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
  
  {/* Card 1: Caring Learning Environment */}
  <div className="group text-center p-8 bg-white rounded-xl border-2 border-transparent hover:border-[#1E4F9A] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fadeUp">
    <div className="w-16 h-16 bg-[#1E4F9A] rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>
    <h3 className="text-[22px] text-[#020202] font-bold mb-2 group-hover:text-[#1E4F9A] transition-colors">Caring Learning Environment</h3>
    <p className="text-gray-700 text-[18px]">A nurturing space where every child feels valued and supported</p>
  </div>

  {/* Card 2: Qualified Teachers */}
  <div className="group text-center p-8 bg-white rounded-xl border-2 border-transparent hover:border-[#1E4F9A] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fadeUp">
    <div className="w-16 h-16 bg-[#1E4F9A] rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
    <h3 className="text-[22px] text-[#020202] font-bold mb-2 group-hover:text-[#1E4F9A] transition-colors">Qualified Teachers</h3>
    <p className="text-gray-700 text-[18px]">Dedicated and experienced educators committed to excellence</p>
  </div>

  {/* Card 3: Holistic Development */}
  <div className="group text-center p-8 bg-white rounded-xl border-2 border-transparent hover:border-[#1E4F9A] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fadeUp">
    <div className="w-16 h-16 bg-[#1E4F9A] rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <h3 className="text-[22px] text-[#020202] font-bold mb-2 group-hover:text-[#1E4F9A] transition-colors">Holistic Development</h3>
    <p className="text-gray-700 text-[18px]">Focus on academic and personal growth in a Christian environment</p>
  </div>

</div>

        <div className="text-center bg-[#1E4F9A]  py-6 rounded-lg">
          <p className="text-[30px] text-[#F5F7FA]"> Trusted by parents in Kigali</p>
        </div>
      </div>
    </section>
  );
}
