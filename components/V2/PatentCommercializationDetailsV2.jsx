'use client';

import React from 'react';
import useV2Store from '@/store/v2Store';

function PatentCommercializationDetailsV2({ page }) {
  const formData = useV2Store((state) => state.getFormData(page));
  const updateFormData = useV2Store((state) => state.updateFormData);

  const handleInputChange = (field, value) => {
    updateFormData(page, field, value);
  };

  const handleArrayChange = (field, value) => {
    // Convert string to array if needed
    const arrayValue = Array.isArray(value) ? value : value.split(',').map(item => item.trim()).filter(item => item);
    updateFormData(page, field, arrayValue);
  };

  const handleNumberChange = (field, value) => {
    updateFormData(page, field, parseFloat(value) || 0);
  };

  const handleObjectChange = (field, value) => {
    // Convert string to object if needed
    try {
      const objectValue = typeof value === 'string' ? JSON.parse(value) : value;
      updateFormData(page, field, objectValue);
    } catch {
      // If parsing fails, store as string
      updateFormData(page, field, value);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Patent Commercialization Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Commercialization Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Commercialization Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commercialization Date
            </label>
            <input
              type="date"
              value={formData?.commercializationDate || ''}
              onChange={(e) => handleInputChange('commercializationDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Patent Number
            </label>
            <input
              type="text"
              value={formData?.patentNumber || ''}
              onChange={(e) => handleInputChange('patentNumber', e.target.value)}
              placeholder="Enter patent number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commercialization Strategy
            </label>
            <select
              value={formData?.commercializationStrategy || ''}
              onChange={(e) => handleInputChange('commercializationStrategy', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select strategy</option>
              <option value="licensing">Licensing</option>
              <option value="direct-sales">Direct Sales</option>
              <option value="joint-venture">Joint Venture</option>
              <option value="spin-off">Spin-off Company</option>
              <option value="partnership">Strategic Partnership</option>
              <option value="franchising">Franchising</option>
              <option value="open-source">Open Source</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commercialization Status
            </label>
            <select
              value={formData?.commercializationStatus || ''}
              onChange={(e) => handleInputChange('commercializationStatus', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select status</option>
              <option value="planning">Planning</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
              <option value="launch">Launch</option>
              <option value="active">Active</option>
              <option value="scaling">Scaling</option>
              <option value="mature">Mature</option>
              <option value="declining">Declining</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </div>

        {/* Market Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Market Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Markets
            </label>
            <textarea
              value={Array.isArray(formData?.targetMarkets) ? formData.targetMarkets.join(', ') : (formData?.targetMarkets || '')}
              onChange={(e) => handleArrayChange('targetMarkets', e.target.value)}
              placeholder="Enter target markets (comma-separated)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Market Analysis
            </label>
            <textarea
              value={formData?.marketAnalysis || ''}
              onChange={(e) => handleInputChange('marketAnalysis', e.target.value)}
              placeholder="Enter market analysis"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Competitive Advantage
            </label>
            <textarea
              value={formData?.competitiveAdvantage || ''}
              onChange={(e) => handleInputChange('competitiveAdvantage', e.target.value)}
              placeholder="Describe competitive advantage"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Licensing Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Licensing Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Licensing Opportunities
            </label>
            <textarea
              value={formData?.licensingOpportunities || ''}
              onChange={(e) => handleInputChange('licensingOpportunities', e.target.value)}
              placeholder="Describe licensing opportunities"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Potential Licensees
            </label>
            <textarea
              value={Array.isArray(formData?.potentialLicensees) ? formData.potentialLicensees.join(', ') : (formData?.potentialLicensees || '')}
              onChange={(e) => handleArrayChange('potentialLicensees', e.target.value)}
              placeholder="Enter potential licensees (comma-separated)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Royalty Rates
            </label>
            <textarea
              value={typeof formData?.royaltyRates === 'object' ? JSON.stringify(formData.royaltyRates, null, 2) : (formData?.royaltyRates || '')}
              onChange={(e) => handleObjectChange('royaltyRates', e.target.value)}
              placeholder="Enter royalty rates (JSON format)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Licensing Terms
            </label>
            <textarea
              value={formData?.licensingTerms || ''}
              onChange={(e) => handleInputChange('licensingTerms', e.target.value)}
              placeholder="Enter licensing terms"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Financial Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Financial Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Revenue Projections
            </label>
            <textarea
              value={typeof formData?.revenueProjections === 'object' ? JSON.stringify(formData.revenueProjections, null, 2) : (formData?.revenueProjections || '')}
              onChange={(e) => handleObjectChange('revenueProjections', e.target.value)}
              placeholder="Enter revenue projections (JSON format)"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valuation ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData?.valuation || ''}
              onChange={(e) => handleNumberChange('valuation', e.target.value)}
              placeholder="Enter patent valuation"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Partnership and Technology Transfer */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">Partnership and Technology Transfer</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Partnership Opportunities
            </label>
            <textarea
              value={Array.isArray(formData?.partnershipOpportunities) ? formData.partnershipOpportunities.join(', ') : (formData?.partnershipOpportunities || '')}
              onChange={(e) => handleArrayChange('partnershipOpportunities', e.target.value)}
              placeholder="Enter partnership opportunities (comma-separated)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technology Transfer
            </label>
            <textarea
              value={formData?.technologyTransfer || ''}
              onChange={(e) => handleInputChange('technologyTransfer', e.target.value)}
              placeholder="Describe technology transfer plans"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IP Portfolio
            </label>
            <textarea
              value={formData?.IPPortfolio || ''}
              onChange={(e) => handleInputChange('IPPortfolio', e.target.value)}
              placeholder="Describe IP portfolio"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatentCommercializationDetailsV2;
