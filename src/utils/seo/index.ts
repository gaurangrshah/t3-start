const config = {
  projectType: 'website',
  projectName: 'T3 Boiler',
  url: 'http://localhost:3000',
  subtitle: '✨',
  description: 'End-to-End type-safe development',
  twitterHandle: '@twitterHandle',
  locale: 'en-US',
  images: [
    {
      url: 'https://cdn.jsdelivr.net/gh/rupistudio/assets@main/brand/rupi-new-logo-md.png',
      width: 300,
      height: 258,
      alt: 'Company Logo',
      type: 'image/png',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: 'https://cdn.jsdelivr.net/gh/rupistudio/assets@main/brand/rupi-new-logo-md.png',
    },
  ],
};

export function SEOConfig(
  title?: string,
  subtitle?: string,
  description?: string
) {
  const titleString = `${title || (config?.projectName ?? '')}`;
  const hasSubtitle = !!subtitle || !!config?.subtitle;
  const subtitleString = hasSubtitle
    ? `| ${subtitle || (config?.subtitle ?? '')}`
    : '';

  return {
    title: `${titleString} ${subtitleString}`,
    description: description || config?.description,
    twitter: {
      cardType: 'summary_large_image',
      handle: config.twitterHandle,
    },
    openGraph: {
      url: config?.url,
      title: `${title || config?.projectName} | DJ Chad`,
      description: description || config?.description,
      locale: config?.locale,
      images: config?.images,
    },
    additionalLinkTags: config.additionalLinkTags,
  };
}
