import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Cross, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';

interface AuthProps {
  onBack?: () => void;
}

export function Auth({ onBack }: AuthProps = {}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isForgotPassword) {
        await resetPassword(email);
        setSuccess('Link de recuperação enviado! Verifique seu email.');
      } else if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-4 font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          )}

          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-amber-600 to-orange-700 p-4 rounded-2xl">
              <Cross className="w-12 h-12 text-white" />
            </div>
          </div>

          {isForgotPassword && (
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setError('');
                setSuccess('');
              }}
              className="flex items-center gap-2 text-amber-700 hover:text-amber-800 mb-4 font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para Login
            </button>
          )}

          <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
            {isForgotPassword ? 'Recuperar Senha' : 'Perfil Católico'}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {isForgotPassword
              ? 'Digite seu email para receber o link de recuperação'
              : isSignUp
              ? 'Crie sua carteirinha digital'
              : 'Entre na sua conta'}
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

            {!isForgotPassword && (
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
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            )}

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
              {loading
                ? 'Processando...'
                : isForgotPassword
                ? 'Enviar Link de Recuperação'
                : isSignUp
                ? 'Criar Conta'
                : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            {!isForgotPassword && (
              <>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-amber-700 hover:text-amber-800 font-medium text-sm block w-full"
                >
                  {isSignUp ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Cadastre-se'}
                </button>
                {!isSignUp && (
                  <button
                    onClick={() => {
                      setIsForgotPassword(true);
                      setError('');
                      setSuccess('');
                    }}
                    className="text-gray-600 hover:text-amber-700 font-medium text-sm"
                  >
                    Esqueceu sua senha?
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
