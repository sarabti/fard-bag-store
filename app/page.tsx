import { useTranslations } from 'next-intl';

function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="wrapper">
      <h1 className="h1-bold">{t('title')}</h1>
      <p>{t('welcome')}</p>
    </div>
  );
}
 
export default HomePage;