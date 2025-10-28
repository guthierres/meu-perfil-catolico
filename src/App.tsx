import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ProfilePage } from './pages/ProfilePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { CompleteProfilePage } from './pages/CompleteProfilePage';
import { PublicProfile } from './components/PublicProfile';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import SearchCard from './pages/SearchCard';
import NotFound from './pages/NotFound';
import { Footer } from './components/Footer';
import { SEO } from './components/SEO';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
      });
    }
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<><SEO /><LandingPage onGetStarted={() => window.location.href = '/cadastro'} /><Footer /></>} />
        <Route path="/login" element={<><SEO title="Entrar - CATOLID" description="Faça login no CATOLID e acesse sua carteirinha católica digital." /><LoginPage /><Footer /></>} />
        <Route path="/cadastro" element={<><SEO title="Cadastro - CATOLID" description="Crie sua carteirinha católica digital gratuitamente." /><SignUpPage /><Footer /></>} />
        <Route path="/recuperar-senha" element={<><SEO title="Recuperar Senha - CATOLID" description="Recupere o acesso à sua conta CATOLID." /><ForgotPasswordPage /><Footer /></>} />
        
        {/* Protected routes */}
        <Route path="/perfil" element={<><SEO title="Meu Perfil - CATOLID" description="Visualize e gerencie seu perfil católico e carteirinha digital." /><ProfilePage /><Footer /></>} />
        <Route path="/editar-perfil" element={<><SEO title="Editar Perfil - CATOLID" description="Personalize seu perfil católico e carteirinha digital." /><EditProfilePage /><Footer /></>} />
        <Route path="/completar-perfil" element={<><SEO title="Completar Perfil - CATOLID" description="Complete seu perfil católico com suas informações." /><CompleteProfilePage /><Footer /></>} />
        
        {/* Public profile */}
        <Route path="/p/:slug" element={<PublicProfileWrapper />} />
        
        {/* Other pages */}
        <Route path="/search" element={<><SEO title="Buscar Carteirinha - CATOLID" description="Busque e valide carteirinhas católicas pelo ID único de 6 dígitos." /><SearchCard /><Footer /></>} />
        <Route path="/buscar" element={<Navigate to="/search" replace />} />
        <Route path="/privacidade" element={<><SEO title="Política de Privacidade - CATOLID" description="Conheça nossa Política de Privacidade em conformidade com a LGPD." /><PrivacyPolicy onBack={() => window.location.href = '/'} /><Footer /></>} />
        <Route path="/privacy" element={<Navigate to="/privacidade" replace />} />
        <Route path="/termos" element={<><SEO title="Termos de Uso - CATOLID" description="Leia os Termos de Uso do CATOLID." /><TermsOfService onBack={() => window.location.href = '/'} /><Footer /></>} />
        <Route path="/terms" element={<Navigate to="/termos" replace />} />
        
        {/* 404 - Catch all */}
        <Route path="*" element={<><SEO title="Página Não Encontrada - CATOLID" description="A página que você procura não existe." /><NotFound /><Footer /></>} />
      </Routes>
    </AuthProvider>
  );
}

function PublicProfileWrapper() {
  const slug = window.location.pathname.replace('/p/', '');
  return (
    <>
      <SEO
        title={`${slug} - Perfil Católico | CATOLID`}
        description={`Conheça o perfil católico de ${slug}. Informações sobre paróquia, sacramentos e santo de devoção.`}
        ogUrl={`https://catolid.com/p/${slug}`}
        canonicalUrl={`https://catolid.com/p/${slug}`}
      />
      <PublicProfile slug={slug} />
      <Footer />
    </>
  );
}

export default App;
