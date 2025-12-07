import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">About AI SmartHome Hub</h1>
        
        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          <p className="lead text-xl">
            Welcome to <strong>AI SmartHome Hub</strong>, your intelligent companion in the complex world of home automation.
          </p>

          <h3>Our Mission</h3>
          <p>
            The smart home landscape is fragmented. With competing standards like Zigbee, Z-Wave, Thread, and Matter, plus major ecosystems like Apple HomeKit, Google Home, and Amazon Alexa, figuring out what works together is a challenge.
          </p>
          <p>
            Our mission is simple: <strong>To democratize smart home technical knowledge.</strong> We leverage advanced Artificial Intelligence to analyze device specifications, compatibility charts, and troubleshooting protocols to provide you with instant, accurate, and unbiased advice.
          </p>

          <h3>How It Works</h3>
          <p>
            Unlike traditional review sites that rely on subjective experiences, our platform uses data-driven AI models to:
          </p>
          <ul>
            <li>Analyze interoperability between thousands of devices.</li>
            <li>Design custom automation architectures based on your specific floor plan.</li>
            <li>Diagnose network and connectivity issues using logical deduction.</li>
          </ul>

          <h3>Transparency & AdSense Disclosure</h3>
          <p>
            To keep this tool free for everyone, we display advertisements provided by Google AdSense. We are committed to ensuring these ads are non-intrusive and relevant. 
          </p>
          <p>
            Additionally, we participate in the Amazon Services LLC Associates Program. If our AI recommends a product and you choose to purchase it through our links, we may earn a small commission at no extra cost to you. This supports our server costs and API fees.
          </p>

          <h3>Contact Us</h3>
          <p>
            Have suggestions or found a bug? While we are an AI-first platform, human oversight is crucial. You can reach the administration team at: <br/>
            <a href="mailto:aismarthomehub@gmail.com.cn" className="font-medium text-blue-600 hover:underline">aismarthomehub@gmail.com.cn</a>
          </p>
        </div>
      </div>
    </div>
  );
};