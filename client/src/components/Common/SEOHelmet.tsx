import { Helmet } from 'react-helmet-async';

interface HelmetProps {
  title: string;
  thumbnail?: string;
}

const SEOHelmet = ({
  title,
  thumbnail
}: HelmetProps) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content="IT 게시글 공유 플렛폼 HLOG" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://metatags.io/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content="IT 게시글 공유 플렛폼 HLOG" />
      <meta property="og:image" content={thumbnail || "https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content="IT 게시글 공유 플렛폼 HLOG" />
      <meta property="twitter:image" content={thumbnail || "https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"} />
    </Helmet>
  )
}

export default SEOHelmet;
