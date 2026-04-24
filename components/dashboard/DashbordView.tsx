import React from 'react';

// Icons for the Dashboard Grid
const cardIcons = {
  students: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 110-8 4 4 0 010 8z",
  teachers: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479",
  events: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
};

export function DashboardView() {
  const stats = [
    { label: 'Total Students', value: '1,240', color: 'bg-blue-500', icon: cardIcons.students },
    { label: 'Total Teachers', value: '84', color: 'bg-indigo-500', icon: cardIcons.teachers },
    { label: 'Active Courses', value: '42', color: 'bg-emerald-500', icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5" },
    { label: 'Upcoming Events', value: '12', color: 'bg-orange-500', icon: cardIcons.events },
  ];

  const topStudents = [
    { name: 'Kamanzi Jean', grade: 'A+', photo: 'https://images.unsplash.com/photo-1597393353415-b3730f3719fe?q=80&w=200&h=200&fit=crop', rank: 1 },
    { name: 'Uwase Alice', grade: 'A', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop', rank: 2 },
    { name: 'Mugisha Eric', grade: 'A-', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop', rank: 3 },
  ];

  return (
    <div className="flex-1 bg-slate-50 p-8 overflow-y-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">KHS Analytics Overview</h2>
        <p className="text-slate-500">Real-time performance and enrollment metrics</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-800 mt-1">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Performing Students Section (Inspired by Other Levels) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Top Performing Students</h3>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">Term 1 2026</span>
          </div>
          
          <div className="flex flex-wrap gap-8 justify-around">
            {topStudents.map((student) => (
              <div key={student.name} className="flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <img 
                    src={student.photo} 
                    className="relative w-24 h-24 rounded-full border-4 border-white object-cover shadow-xl" 
                    alt={student.name}
                  />
                  <div className="absolute -bottom-2 right-0 bg-yellow-400 text-white text-[10px] font-black w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    #{student.rank}
                  </div>
                </div>
                <h4 className="mt-4 font-bold text-slate-800 text-sm">{student.name}</h4>
                <p className="text-blue-600 font-black text-lg">{student.grade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Activity/Events List */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Upcoming Events</h3>
          <div className="space-y-6">
            {[
              { time: '09:00 AM', event: 'Staff Meeting', date: 'April 24' },
              { time: '11:30 AM', event: 'Physics Lab', date: 'April 24' },
              { time: '02:00 PM', event: 'Sports Day Planning', date: 'April 25' }
            ].map((e, idx) => (
              <div key={idx} className="flex gap-4 items-start border-l-2 border-blue-100 pl-4">
                <div className="flex-1">
                  <p className="text-xs font-bold text-blue-600">{e.time}</p>
                  <p className="text-sm font-bold text-slate-700">{e.event}</p>
                  <p className="text-[10px] text-slate-400">{e.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors">
            View Academic Calendar
          </button>
        </div>
      </div>
    </div>
  );
}