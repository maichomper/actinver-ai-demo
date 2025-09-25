import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Infosel Holdings Expert
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Advanced AI-powered fund and portfolio analysis with comprehensive market intelligence.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">💰 Holdings Expert Agent</h2>
            <p className="text-gray-600 mb-4">
              Specialized AI agent for comprehensive fund analysis, portfolio optimization, and investment insights.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Advanced Fund & Portfolio Analysis</li>
              <li>• Risk Assessment & Optimization</li>
              <li>• Market Intelligence & Insights</li>
              <li>• Infosel Integration</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛠️ Analysis Tools</h2>
            <p className="text-gray-600 mb-4">
              Comprehensive suite of financial analysis tools for professional investment decisions.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Fixed Income Analysis</li>
              <li>• Market Movers Tracking</li>
              <li>• Portfolio Performance Tools</li>
              <li>• Trade History Analysis</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔄 Analysis Workflows</h2>
            <p className="text-gray-600 mb-4">
              Automated workflows for complex fund analysis and comprehensive investment research.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Fund Analysis Workflow</li>
              <li>• Complex Fund Analysis</li>
              <li>• Performance Benchmarking</li>
              <li>• Risk Assessment Automation</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📊 Mastra Platform</h2>
            <p className="text-gray-600 mb-4">
              Built on the powerful Mastra framework for scalable AI agent development.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• LibSQL Storage & Memory</li>
              <li>• Advanced Logging & Monitoring</li>
              <li>• Workflow Automation</li>
              <li>• Enterprise-Grade Architecture</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">
            Professional investment analysis powered by Mastra AI Framework
          </p>
          <div className="flex justify-center space-x-4">
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Open Mastra Playground
            </a>
            <a href="https://docs.mastra.ai" target="_blank" rel="noopener noreferrer" className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}