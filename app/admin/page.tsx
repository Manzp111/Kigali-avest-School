import React from 'react';

export default function DashboardPage() {
  // Mock data for the dynamic student photos section
  const topPerformers = [
    { 
      name: 'Kamanzi Jean', 
      grade: 'A+', 
      image: 'https://images.unsplash.com/photo-1597393353415-b3730f3719fe?q=80&w=200&h=200&fit=crop',
      trend: '+2.4%'
    },
    { 
      name: 'Uwase Alice', 
      grade: 'A', 
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&fit=crop',
      trend: '+1.8%'
    },
    { 
      name: 'Mugisha Eric', 
      grade: 'A-', 
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
      trend: '+0.5%'
    }
  ];

  const stats = [
    { label: 'Total Students', value: '1,240', change: '+12%', color: 'text-blue-600' },
    { label: 'Avg Attendance', value: '94.2%', change: '+2%', color: 'text-emerald-600' },
    { label: 'Active Teachers', value: '84', change: '0%', color: 'text-slate-600' },
    { label: 'Pending Fees', value: '$3,400', change: '-5%', color: 'text-rose-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Header Welcome */}
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Analytics Overview</h2>
        <p className="text-slate-500 text-sm font-medium">Monitoring school performance for Term 1, 2026.</p>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-50 ${stat.color}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Top Performing Students (Dynamic Photos) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-800">Top Performing Students</h3>
            <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-xl transition-colors">
              View All Rankings
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {topPerformers.map((student, idx) => (
              <div key={student.name} className="group relative bg-slate-50 rounded-2xl p-6 text-center border border-transparent hover:border-blue-200 hover:bg-white transition-all">
                <div className="relative inline-block">
                  <img 
                    src={student.image} 
                    alt={student.name} 
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-[10px] font-black text-white w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    #{idx + 1}
                  </div>
                </div>
                <h4 className="mt-4 font-bold text-slate-800 text-sm truncate">{student.name}</h4>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <p className="text-blue-600 font-black text-lg">{student.grade}</p>
                  <span className="text-[10px] text-emerald-500 font-bold">{student.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Summary / Status Card */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">School Status</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              All departments have submitted their monthly reports. Next board meeting is scheduled for Monday.
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Annual Goal</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[85%]"></div>
              </div>
            </div>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs transition-colors">
              Download Full Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}