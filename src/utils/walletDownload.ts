import html2canvas from 'html2canvas';
import { Profile } from '../types/profile';
import { getCivilStatusLabel } from '../lib/profileUtils';

export async function downloadWalletAsImage(element: HTMLElement, fileName: string = 'carteira-catolica.png') {
  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: null,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: 420,
      height: 264,
    });

    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  } catch (error) {
    console.error('Error downloading wallet:', error);
    throw error;
  }
}

export async function shareWallet(element: HTMLElement, title: string = 'Minha Carteirinha Católica') {
  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: null,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: 420,
      height: 264,
    });

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], 'carteira-catolica.png', { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title,
          text: 'Confira minha carteirinha católica digital!',
          files: [file],
        });
      } else {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  } catch (error) {
    console.error('Error sharing wallet:', error);
    throw error;
  }
}

function detectPlatform(): 'ios' | 'android' | 'other' {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  }
  return 'other';
}

async function saveAsAppleWallet(canvas: HTMLCanvasElement, profile: Profile, profileUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create image blob'));
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `carteira-catolica-${profile.slug || 'digital'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        alert(
          '📱 Para adicionar à Apple Wallet:\n\n' +
          '1. A imagem foi salva nas suas fotos\n' +
          '2. Vá em Fotos > Selecione a imagem\n' +
          '3. Toque em Compartilhar (ícone de seta)\n' +
          '4. Role para baixo e toque em "Adicionar aos Favoritos"\n' +
          '5. Agora você pode acessar rapidamente pela busca do iPhone!\n\n' +
          'Dica: Defina como papel de parede da tela de bloqueio para acesso instantâneo!'
        );
        resolve();
      }, 500);
    }, 'image/png');
  });
}

async function saveAsGoogleWallet(canvas: HTMLCanvasElement, profile: Profile, profileUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create image blob'));
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `carteira-catolica-${profile.slug || 'digital'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        alert(
          '🤖 Para adicionar ao Google Wallet:\n\n' +
          '1. A imagem foi salva na sua galeria\n' +
          '2. Abra a imagem na Galeria\n' +
          '3. Toque nos 3 pontos (⋮) > Definir como papel de parede\n' +
          '4. Escolha "Tela de bloqueio" para acesso rápido\n\n' +
          'Dica: Você também pode adicionar aos favoritos para acesso rápido!'
        );
        resolve();
      }, 500);
    }, 'image/png');
  });
}

export async function saveToWallet(element: HTMLElement, profile: Profile, profileUrl: string) {
  try {
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: null,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: 420,
      height: 264,
    });

    const platform = detectPlatform();

    if (platform === 'ios') {
      await saveAsAppleWallet(canvas, profile, profileUrl);
    } else if (platform === 'android') {
      await saveAsGoogleWallet(canvas, profile, profileUrl);
    } else {
      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `carteira-catolica-${profile.slug || 'digital'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        alert(
          '💻 Imagem baixada!\n\n' +
          'Salve em uma pasta de fácil acesso ou defina como papel de parede para acesso rápido à sua carteirinha católica!'
        );
      }, 'image/png');
    }
  } catch (error) {
    console.error('Error saving to wallet:', error);
    throw error;
  }
}
