import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Header } from '../components/Header';
import logCad from '@/assets/log-cad.webp';

export function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const { signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password);
      setShowEmailVerification(true);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/completar-perfil');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login com Google');
    }
  };

  return (
    <>
      {showEmailVerification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Verifique seu Email
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Enviamos um link de confirmação para <strong>{email}</strong>.
                <br /><br />
                Por favor, verifique sua <strong>caixa de entrada</strong> e também a <strong>pasta de spam</strong>.
                <br /><br />
                Clique no link do email para ativar sua conta e começar a usar o CATOLID.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition shadow-lg"
              >
                Ir para Login
              </button>
            </div>
          </div>
        </div>
      )}
      <Header onLogoClick={() => navigate('/')} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-4 font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>

            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src={logCad}
                alt="CATOLID"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              Cadastro
            </h1>
            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Crie sua carteirinha digital
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-base"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition text-base"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>

            <div className="mt-5 sm:mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">Ou continue com</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="mt-4 w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition shadow-sm text-sm sm:text-base"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Cadastrar com Google
              </button>
            </div>

            <div className="mt-5 sm:mt-6 text-center">
              <button
                onClick={() => navigate('/login')}
                className="text-amber-700 hover:text-amber-800 font-medium text-sm"
              >
                Já tem uma conta? Entre aqui
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
