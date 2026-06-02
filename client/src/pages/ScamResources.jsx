import React from 'react';
import { ShieldAlert, Globe, Search, PhoneCall, AlertTriangle, CheckCircle } from 'lucide-react';

function ScamResources() {
  const redFlags = [
    { title: "Upfront Fees", desc: "Asking for 'security deposits', 'laptop fees', or 'training charges'." },
    { title: "Generic Emails", desc: "Recruiters using @gmail.com, @outlook.com instead of company domains." },
    { title: "Urgent Hiring", desc: "Pressure to join 'immediately' or pay within an hour to secure a seat." },
    { title: "Vague Tasks", desc: "High pay for simple data entry or SMS sending tasks with no skill required." }
  ];

  const tools = [
    { name: "MCA21 Portal", url: "https://www.mca.gov.in/", desc: "Verify if the company is legally registered in India." },
    { name: "LinkedIn", url: "https://www.linkedin.com/", desc: "Check if the recruiter actually works at the stated company." },
    { name: "Whois Lookup", url: "https://who.is/", desc: "Check how old the company website is. Scams use new sites." }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Scam <span className="text-teal-600">Resources</span></h1>
        <p className="text-gray-600 text-lg mb-12">Empower yourself with knowledge to stay ahead of internship scammers.</p>

        {/* Red Flag Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {redFlags.map((flag, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 flex gap-4">
              <AlertTriangle className="text-red-500 shrink-0" size={32} />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{flag.title}</h3>
                <p className="text-gray-500">{flag.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Toolbox */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Globe className="text-teal-600" /> Official Verification Toolbox
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tools.map((tool, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-teal-500">
              <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{tool.desc}</p>
              <a href={tool.url} target="_blank" rel="noreferrer" className="text-teal-600 font-bold hover:underline">Visit Site →</a>
            </div>
          ))}
        </div>

        {/* Emergency Protocol */}
        <div className="bg-teal-900 text-white p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-8">
          <div className="bg-teal-800 p-4 rounded-full">
            <PhoneCall size={48} />
          </div>
          <div>
            <h2 className="text-3xl font-black mb-2">Scammed? Take Action.</h2>
            <p className="text-teal-100 mb-4">Report financial fraud immediately to the National Cyber Crime Helpline.</p>
            <div className="flex gap-4">
              <span className="bg-white text-teal-900 px-6 py-2 rounded-full font-black text-xl tracking-widest">1930</span>
              <a href="https://www.cybercrime.gov.in" target="_blank" className="border-2 border-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-teal-900 transition">Portal Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScamResources;