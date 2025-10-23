import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Voltar"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              Política de Privacidade
            </h1>
          </div>

          <div className="prose prose-amber max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600">
              <strong>Última atualização:</strong> 23 de outubro de 2025
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introdução</h2>
              <p>
                A ID Católico ("nós", "nosso" ou "ID Católico") está comprometida em proteger a privacidade e os dados pessoais
                dos usuários do site <strong>https://idcatolico.com/</strong> ("Site"). Esta Política de Privacidade descreve
                como coletamos, usamos, armazenamos e protegemos suas informações pessoais, em conformidade com a
                Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Dados Coletados</h2>
              <p>Coletamos os seguintes tipos de dados pessoais:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de identificação:</strong> nome completo, e-mail</li>
                <li><strong>Dados religiosos:</strong> paróquia, nome do pároco, data de batismo, santo de devoção, sacramentos recebidos</li>
                <li><strong>Dados de perfil:</strong> estado de vida, pastorais, frases de inspiração, passagens bíblicas</li>
                <li><strong>Imagens:</strong> foto de perfil, imagem de capa, imagem do santo</li>
                <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Finalidade do Tratamento de Dados</h2>
              <p>Os dados pessoais coletados são utilizados para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Criar e gerenciar perfis católicos digitais</li>
                <li>Gerar carteirinhas católicas personalizadas</li>
                <li>Permitir o compartilhamento de perfis públicos</li>
                <li>Melhorar a experiência do usuário no Site</li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Comunicar atualizações e novidades do serviço</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Base Legal para o Tratamento</h2>
              <p>O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consentimento:</strong> ao criar uma conta e fornecer seus dados, você consente com o tratamento conforme descrito nesta política</li>
                <li><strong>Execução de contrato:</strong> para fornecer os serviços solicitados</li>
                <li><strong>Legítimo interesse:</strong> para melhorar nossos serviços e comunicação</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Compartilhamento de Dados</h2>
              <p>
                Seus dados pessoais não serão vendidos, alugados ou compartilhados com terceiros, exceto nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Perfis públicos:</strong> informações que você escolher tornar públicas através do link personalizado</li>
                <li><strong>Prestadores de serviço:</strong> fornecedores de hospedagem e infraestrutura (Supabase, Cloudinary)</li>
                <li><strong>Obrigações legais:</strong> quando exigido por lei ou ordem judicial</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Armazenamento e Segurança</h2>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra
                acesso não autorizado, perda, destruição ou alteração. Os dados são armazenados em servidores seguros
                e criptografados.
              </p>
              <p>
                Os dados serão mantidos pelo tempo necessário para cumprir as finalidades descritas ou conforme
                exigido pela legislação aplicável.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Seus Direitos</h2>
              <p>De acordo com a LGPD, você tem os seguintes direitos:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Confirmação e acesso:</strong> verificar se tratamos seus dados e acessá-los</li>
                <li><strong>Correção:</strong> solicitar a correção de dados incompletos, inexatos ou desatualizados</li>
                <li><strong>Anonimização, bloqueio ou eliminação:</strong> solicitar a exclusão de dados desnecessários ou excessivos</li>
                <li><strong>Portabilidade:</strong> solicitar a transferência de seus dados a outro fornecedor</li>
                <li><strong>Revogação do consentimento:</strong> retirar seu consentimento a qualquer momento</li>
                <li><strong>Informação sobre compartilhamento:</strong> saber com quem compartilhamos seus dados</li>
                <li><strong>Oposição:</strong> opor-se ao tratamento de dados em determinadas situações</li>
              </ul>
              <p className="mt-4">
                Para exercer seus direitos, entre em contato através do e-mail: <strong>privacidade@idcatolico.com</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Cookies</h2>
              <p>
                Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência de navegação,
                analisar o tráfego do site e personalizar conteúdo. Você pode configurar seu navegador para
                recusar cookies, mas isso pode afetar a funcionalidade do Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Links Externos</h2>
              <p>
                O Site pode conter links para sites de terceiros. Não nos responsabilizamos pelas práticas de
                privacidade desses sites. Recomendamos que você leia as políticas de privacidade de cada site visitado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre alterações
                significativas através do e-mail cadastrado ou por meio de aviso no Site. A data da última atualização
                será sempre indicada no início desta política.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Encarregado de Dados (DPO)</h2>
              <p>
                Para questões relacionadas à proteção de dados pessoais, você pode entrar em contato com nosso
                Encarregado de Proteção de Dados:
              </p>
              <p className="mt-2">
                <strong>E-mail:</strong> dpo@idcatolico.com<br />
                <strong>Site:</strong> https://idcatolico.com/
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Legislação Aplicável</h2>
              <p>
                Esta Política de Privacidade é regida pela legislação brasileira, em especial pela Lei Geral de
                Proteção de Dados (Lei nº 13.709/2018), pelo Marco Civil da Internet (Lei nº 12.965/2014) e
                pelo Código de Defesa do Consumidor (Lei nº 8.078/1990).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Contato</h2>
              <p>
                Em caso de dúvidas, sugestões ou solicitações relacionadas a esta Política de Privacidade,
                entre em contato conosco:
              </p>
              <p className="mt-2">
                <strong>E-mail:</strong> contato@idcatolico.com<br />
                <strong>Site:</strong> https://idcatolico.com/
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
