import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ProfileEditor } from '../components/ProfileEditor';

export function EditProfilePage() {
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

  return <ProfileEditor onSave={() => navigate('/perfil')} onCancel={() => navigate('/perfil')} />;
}
