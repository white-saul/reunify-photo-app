
import React from 'react';
import { FAQ_DATA } from '../constants';
import FaqItem from './FaqItem';

const FaqSection: React.FC = () => {
  return (
    <section id="faq_section" className="py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
