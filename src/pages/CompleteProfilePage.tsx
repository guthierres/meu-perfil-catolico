import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProfileEditor } from '../components/ProfileEditor';

export function CompleteProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

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
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-2">
            Complete seu Perfil
          </h1>
          <p className="text-gray-600">
            Preencha suas informações para criar sua carteirinha católica
          </p>
        </div>
        <ProfileEditor onSave={() => navigate('/perfil')} onCancel={() => navigate('/perfil')} />
      </div>
    </div>
  );
}
