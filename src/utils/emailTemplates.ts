import { Language } from '@/contexts/LanguageContext';
import { emailTranslations } from '@/contexts/emailTranslations';

interface EmailTemplateParams {
  language: Language;
  t: (key: string) => string;
  type: 'contact' | 'projects' | 'testimonials';
}

// Enhanced translation function for email templates
const getEmailTranslation = (language: Language, key: string, fallbackT: (key: string) => string): string => {
  return emailTranslations[language]?.[key] || fallbackT(key) || key;
};

export const generateEmailTemplate = ({ language, t, type }: EmailTemplateParams): { subject: string; body: string } => {
  const eT = (key: string) => getEmailTranslation(language, key, t);
  
  const subject = eT('email.subject');
  
  let introText = '';
  let extraSection = '';
  
  switch (type) {
    case 'contact':
      introText = eT('email.intro_contact');
      break;
    case 'projects':
      introText = eT('email.intro_projects');
      extraSection = `

${eT('email.portfolio_inspiration')}
${eT('email.portfolio_placeholder')}`;
      break;
    case 'testimonials':
      introText = eT('email.intro_testimonials');
      extraSection = `

${eT('email.expected_results')}
${eT('email.results_placeholder')}`;
      break;
  }

  const body = `${eT('email.greeting')}

${introText}

${eT('email.project_info')}
${eT('email.name_field')}
${eT('email.company_field')}
${eT('email.email_field')}
${eT('email.phone_field')}

${eT('email.service_type')}
${eT('email.service1')}
${eT('email.service2')}
${eT('email.service3')}
${eT('email.service4')}
${eT('email.service5')}
${eT('email.service6')}
${eT('email.service7')}
${eT('email.service8')}${extraSection}

${eT('email.budget')}
${eT('email.budget1')}
${eT('email.budget2')}
${eT('email.budget3')}
${eT('email.budget4')}
${eT('email.budget5')}
${eT('email.budget6')}

${eT('email.timeline')}
${eT('email.timeline1')}
${eT('email.timeline2')}
${eT('email.timeline3')}
${eT('email.timeline4')}
${eT('email.timeline5')}

${eT('email.description')}
${eT('email.description_placeholder')}

${eT('email.closing')}

${eT('email.signature')}
${eT('email.signature_name')}`;

  return {
    subject: encodeURIComponent(subject),
    body: encodeURIComponent(body)
  };
};

export const openEmailClient = (subject: string, body: string) => {
  const mailtoUrl = `mailto:contact.zyflows@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoUrl, '_self');
};