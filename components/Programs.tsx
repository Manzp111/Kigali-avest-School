export function Programs() {
  return (
    <section id="programs" className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-blue-900 mb-4">Our Programs</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We offer comprehensive education programs tailored to each age group
          </p>
        </div>

        {/* <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl text-blue-900">Nursery School</h3>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2"><strong>Ages:</strong> 2-5 years</p>
            </div>
            <p className="text-gray-700 mb-4">
              Our nursery program provides a warm and stimulating environment where young children develop essential skills through play and guided activities.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Early learning foundations</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Creativity and imagination</span>
              </li>

              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Christian values and spirituality</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-blue-600">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl text-blue-900">Primary School</h3>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2"><strong>Grades:</strong> 1-6</p>
            </div>
            <p className="text-gray-700 mb-4">
              Our primary program builds a strong academic foundation while nurturing character, discipline, and critical thinking skills.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Strong academic foundation</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Discipline and character building</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Literacy and language excellence</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Problem-solving and growth mindset</span>
              </li>
            </ul>
          </div>
        </div> */}

        <div className="grid md:grid-cols-2 gap-8 px-4 py-12">
  
  {/* NURSERY SCHOOL CARD */}
  <div className="group bg-white rounded-2xl p-8 border-2 border-transparent hover:border-[#1E4F9A] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fadeUp">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 bg-[#D62828] rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:rotate-3 shadow-md shadow-blue-900/20">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-[#1E4F9A]">Nursery School</h3>
        <p className="text-gray-500 font-medium">Ages: 2-5 years</p>
      </div>
    </div>

    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
      Our nursery program provides a warm and stimulating environment where young children develop essential skills through play and guided activities.
    </p>

    {/* Custom Broken-Circle List */}
    <ul className="space-y-4">
      {["Early learning foundations", "Creativity and imagination", "Christian values & spirituality", "Problem-solving and growth mindset"].map((item) => (
        <li key={item} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-all duration-300 group/item">
          <div className="relative flex-shrink-0 w-6 h-6">
            <div className="w-6 h-6 bg-white rounded-full border-2 border-[#1E4F9A] group-hover/item:border-[#1E4F9A] transition-colors" />
            <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
              <svg className="w-3.5 h-3.5 text-[#1E4F9A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <span className="text-gray-700 font-bold text-[15px] group-hover/item:text-[#1E4F9A] transition-colors">
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>

  {/* PRIMARY SCHOOL CARD */}
  <div className="group bg-white rounded-2xl p-8 border-2 border-transparent hover:border-[#1E4F9A] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fadeUp">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-14 h-14 bg-[#D62828] rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:rotate-3 shadow-md shadow-blue-900/20">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-[#1E4F9A]">Primary School</h3>
        <p className="text-gray-500 font-medium">Grades: 1-6</p>
      </div>
    </div>

    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
      Our primary program builds a strong academic foundation while nurturing character, discipline, and critical thinking skills.
    </p>

    {/* Custom Broken-Circle List */}
    <ul className="space-y-4">
      {["Strong academic foundation", "Discipline and character", "Literacy & language excellence", "Growth mindset"].map((item) => (
        <li key={item} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 group-hover:bg-blue-50 transition-all duration-300 group/item">
          <div className="relative flex-shrink-0 w-6 h-6">
            <div className="w-6 h-6 bg-white rounded-full border-2 border-[#1E4F9A] group-hover/item:border-[#1E4F9A] transition-colors" />
            <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
              <svg className="w-3.5 h-3.5 text-[#1E4F9A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <span className="text-gray-700 font-bold text-[15px] group-hover/item:text-[#1E4F9A] transition-colors">
            {item}
          </span>
        </li>
      ))}
    </ul>
  </div>

</div>
      </div>
    </section>
  );
}
