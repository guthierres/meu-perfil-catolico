import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Auth } from './components/Auth';
import { ProfileDisplay } from './components/ProfileDisplay';
import { ProfileEditor } from './components/ProfileEditor';
import { LandingPage } from './components/LandingPage';
import { PublicProfile } from './components/PublicProfile';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import SearchCard from './pages/SearchCard';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';

type PageView = 'main' | 'privacy' | 'terms' | 'search';

function AppContent() {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageView>('main');

  const path = window.location.pathname;
  const isPublicProfile = path.startsWith('/p/');
  const isSearchPage = path === '/search' || path === '/buscar';
  const slug = isPublicProfile ? path.replace('/p/', '') : null;

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }, []);

  if (isSearchPage) {
    return (
      <>
        <SEO
          title="Buscar Carteirinha - ID Católico"
          description="Busque e valide carteirinhas católicas pelo ID único de 6 dígitos."
          ogUrl="https://idcatolico.com/search"
        />
        <SearchCard />
      </>
    );
  }

  if (isPublicProfile && slug) {
    return (
      <>
        <SEO
          title={`${slug} - Perfil Católico | ID Católico`}
          description={`Conheça o perfil católico de ${slug}. Informações sobre paróquia, sacramentos e santo de devoção.`}
          ogUrl={`https://idcatolico.com/p/${slug}`}
          canonicalUrl={`https://idcatolico.com/p/${slug}`}
        />
        <PublicProfile slug={slug} />
        <Footer onPrivacyClick={() => setCurrentPage('privacy')} onTermsClick={() => setCurrentPage('terms')} />
      </>
    );
  }

  if (currentPage === 'privacy') {
    return (
      <>
        <SEO
          title="Política de Privacidade - ID Católico"
          description="Conheça nossa Política de Privacidade em conformidade com a LGPD. Saiba como tratamos e protegemos seus dados pessoais."
          ogUrl="https://idcatolico.com/"
        />
        <PrivacyPolicy onBack={() => setCurrentPage('main')} />
      </>
    );
  }

  if (currentPage === 'terms') {
    return (
      <>
        <SEO
          title="Termos de Uso - ID Católico"
          description="Leia os Termos de Uso do ID Católico. Conheça seus direitos e responsabilidades ao usar nossa plataforma."
          ogUrl="https://idcatolico.com/"
        />
        <TermsOfService onBack={() => setCurrentPage('main')} />
      </>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showLanding) {
      return (
        <>
          <SEO />
          <LandingPage onGetStarted={() => setShowLanding(false)} />
          <Footer onPrivacyClick={() => setCurrentPage('privacy')} onTermsClick={() => setCurrentPage('terms')} />
        </>
      );
    }
    return (
      <>
        <SEO title="Entrar - ID Católico" description="Faça login no ID Católico e acesse sua carteirinha católica digital." />
        <Auth />
        <Footer onPrivacyClick={() => setCurrentPage('privacy')} onTermsClick={() => setCurrentPage('terms')} />
      </>
    );
  }

  if (isEditing) {
    return (
      <>
        <SEO title="Editar Perfil - ID Católico" description="Personalize seu perfil católico e carteirinha digital." />
        <ProfileEditor onSave={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
        <Footer onPrivacyClick={() => setCurrentPage('privacy')} onTermsClick={() => setCurrentPage('terms')} />
      </>
    );
  }

  return (
    <>
      <SEO title="Meu Perfil - ID Católico" description="Visualize e gerencie seu perfil católico e carteirinha digital." />
      <ProfileDisplay onEdit={() => setIsEditing(true)} />
      <Footer onPrivacyClick={() => setCurrentPage('privacy')} onTermsClick={() => setCurrentPage('terms')} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
