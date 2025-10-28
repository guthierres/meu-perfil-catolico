import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSuccess('Link de recuperação enviado! Verifique seu email e sua caixa de spam.');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header onLogoClick={() => navigate('/')} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-4 font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Login
            </button>

            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              Recuperar Senha
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Digite seu email para receber o link de recuperação
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
