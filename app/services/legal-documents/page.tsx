import React from 'react';
import { Button } from 'react-bootstrap';
import { FileText } from 'react-feather';

const LegalDocumentsPage = () => {
  return (
    <div>
      {/* Service detail sections */}
      <div>
        {/* Other service details */}
        <Button
          onClick={() => {
            window.location.href = "/#consultation-form"
          }}
          variant="outline"
          className="border-purple-600 text-purple-600 hover:bg-purple-50 bg-transparent"
        >
          <FileText className="h-4 w-4 mr-2" />
          Get Quote
        </Button>
      </div>
      {/* Other service detail sections */}
      {/* Consultation form */}
      <div id="consultation-form">
        {/* Consultation form content */}
      </div>
    </div>
  );
};

export default LegalDocumentsPage;
