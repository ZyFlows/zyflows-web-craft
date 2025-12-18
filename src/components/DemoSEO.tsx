import { Helmet } from 'react-helmet-async';

interface DemoSEOProps {
  title: string;
  description: string;
  keywords: string;
  path: string;
  image?: string;
  demoType: 'WebApplication' | 'SoftwareApplication' | 'WebSite' | 'Service';
  features?: string[];
  category?: string;
}

const DemoSEO = ({
  title,
  description,
  keywords,
  path,
  image = 'https://zyflows.com/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png',
  demoType = 'WebApplication',
  features = [],
  category = 'Web Development'
}: DemoSEOProps) => {
  const fullTitle = `${title} | zyFlows Demo`;
  const canonicalUrl = `https://zyflows.com${path}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': demoType,
    name: title,
    description: description,
    url: canonicalUrl,
    image: image,
    applicationCategory: category,
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    author: {
      '@type': 'Organization',
      name: 'zyFlows',
      url: 'https://zyflows.com'
    },
    provider: {
      '@type': 'Organization',
      name: 'zyFlows',
      url: 'https://zyflows.com',
      logo: 'https://zyflows.com/lovable-uploads/89832acc-ee39-4d30-bb24-cf59c98cf511.png'
    },
    ...(features.length > 0 && {
      featureList: features.join(', ')
    })
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://zyflows.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Demos',
        item: 'https://zyflows.com/#projects'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: canonicalUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="zyFlows" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
    </Helmet>
  );
};

export default DemoSEO;
