import { ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
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
              Termos de Uso
            </h1>
          </div>

          <div className="prose prose-amber max-w-none space-y-6 text-gray-700">
            <p className="text-sm text-gray-600">
              <strong>Última atualização:</strong> 23 de outubro de 2025
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Aceitação dos Termos</h2>
              <p>
                Ao acessar e usar o site ID Católico (<strong>https://idcatolico.com/</strong>), você concorda em cumprir
                e estar vinculado aos seguintes Termos de Uso. Se você não concorda com estes termos, não utilize nossos serviços.
              </p>
              <p>
                Estes Termos de Uso constituem um acordo legal entre você ("Usuário") e a ID Católico ("nós", "nosso" ou "ID Católico").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Descrição do Serviço</h2>
              <p>
                O ID Católico é uma plataforma digital que permite aos usuários católicos criar perfis personalizados
                e carteirinhas digitais contendo informações religiosas, incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dados pessoais e religiosos</li>
                <li>Informações sobre paróquia e sacramentos</li>
                <li>Santo de devoção e frases inspiradoras</li>
                <li>Carteirinha católica digital para download e compartilhamento</li>
                <li>Perfil público acessível através de link personalizado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Cadastro e Conta do Usuário</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">3.1. Requisitos</h3>
              <p>
                Para utilizar os serviços do ID Católico, você deve criar uma conta fornecendo informações verdadeiras,
                precisas e atualizadas. Você é responsável por manter a confidencialidade de suas credenciais de acesso.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">3.2. Idade Mínima</h3>
              <p>
                O serviço é destinado a maiores de 18 anos. Menores de idade só podem utilizar o serviço com
                consentimento e supervisão de pais ou responsáveis legais.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">3.3. Segurança da Conta</h3>
              <p>
                Você é responsável por todas as atividades realizadas através de sua conta. Notifique-nos imediatamente
                em caso de uso não autorizado de sua conta.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Uso Aceitável</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">4.1. Compromissos do Usuário</h3>
              <p>Ao utilizar o ID Católico, você concorda em:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer informações verdadeiras e precisas</li>
                <li>Respeitar os princípios e valores da fé católica</li>
                <li>Não usar o serviço para fins ilícitos ou não autorizados</li>
                <li>Não violar direitos de propriedade intelectual de terceiros</li>
                <li>Não publicar conteúdo ofensivo, difamatório ou discriminatório</li>
                <li>Não usar o serviço para práticas comerciais não autorizadas</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">4.2. Conteúdo Proibido</h3>
              <p>É expressamente proibido publicar ou compartilhar:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conteúdo que viole leis brasileiras ou internacionais</li>
                <li>Material ofensivo à fé católica ou a qualquer religião</li>
                <li>Informações falsas ou enganosas</li>
                <li>Conteúdo que promova violência, discriminação ou ódio</li>
                <li>Material protegido por direitos autorais sem autorização</li>
                <li>Dados pessoais de terceiros sem consentimento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Propriedade Intelectual</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">5.1. Conteúdo do Site</h3>
              <p>
                Todo o conteúdo disponível no ID Católico, incluindo textos, gráficos, logotipos, ícones, imagens,
                código-fonte e software, é de propriedade da ID Católico ou de seus licenciadores e está protegido
                pelas leis de direitos autorais brasileiras e internacionais.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">5.2. Conteúdo do Usuário</h3>
              <p>
                Você mantém a propriedade do conteúdo que cria e publica no ID Católico. Ao publicar conteúdo,
                você nos concede uma licença mundial, não exclusiva, isenta de royalties para usar, reproduzir,
                modificar e distribuir esse conteúdo exclusivamente para fornecer e melhorar nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Privacidade e Proteção de Dados</h2>
              <p>
                O tratamento de seus dados pessoais está descrito em nossa{' '}
                <strong>Política de Privacidade</strong>, que está em conformidade com a Lei Geral de Proteção
                de Dados (LGPD - Lei nº 13.709/2018). Ao usar nossos serviços, você concorda com o tratamento
                de dados conforme descrito na Política de Privacidade.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Perfis Públicos</h2>
              <p>
                Ao criar um link personalizado e tornar seu perfil público, você compreende e concorda que:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>As informações do perfil público estarão acessíveis a qualquer pessoa com o link</li>
                <li>Você pode alterar a configuração de privacidade a qualquer momento</li>
                <li>É sua responsabilidade escolher quais informações tornar públicas</li>
                <li>Não nos responsabilizamos pelo uso de informações públicas por terceiros</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Limitação de Responsabilidade</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">8.1. Disponibilidade do Serviço</h3>
              <p>
                Nos esforçamos para manter o serviço disponível continuamente, mas não garantimos que o site
                estará livre de interrupções, erros ou vírus. Podemos suspender ou encerrar o serviço
                temporariamente para manutenção ou melhorias.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">8.2. Conteúdo de Terceiros</h3>
              <p>
                Não nos responsabilizamos por conteúdo de terceiros, incluindo links externos, imagens
                ou informações fornecidas por usuários.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">8.3. Uso por Sua Conta e Risco</h3>
              <p>
                O uso do ID Católico é por sua conta e risco. Não garantimos que o serviço atenderá a
                suas expectativas ou necessidades específicas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Indenização</h2>
              <p>
                Você concorda em indenizar e isentar a ID Católico, seus diretores, funcionários e parceiros
                de qualquer reclamação, dano, perda ou despesa (incluindo honorários advocatícios) resultantes de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Seu uso do serviço</li>
                <li>Violação destes Termos de Uso</li>
                <li>Violação de direitos de terceiros</li>
                <li>Conteúdo que você publicar no site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Suspensão e Encerramento</h2>
              <p>
                Reservamos o direito de suspender ou encerrar sua conta e acesso ao serviço, a qualquer momento e
                sem aviso prévio, se você violar estes Termos de Uso ou se considerarmos que seu uso do serviço
                é prejudicial a outros usuários ou à plataforma.
              </p>
              <p>
                Você pode encerrar sua conta a qualquer momento através das configurações do seu perfil ou
                entrando em contato conosco.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Modificações dos Termos</h2>
              <p>
                Podemos modificar estes Termos de Uso a qualquer momento. As alterações entrarão em vigor
                imediatamente após sua publicação no site. Notificaremos você sobre mudanças significativas
                através do e-mail cadastrado ou por meio de aviso no site.
              </p>
              <p>
                O uso continuado do serviço após as alterações constitui aceitação dos novos termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Lei Aplicável e Foro</h2>
              <p>
                Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer
                controvérsia decorrente destes termos será submetida ao foro da comarca de São Paulo/SP,
                com exclusão de qualquer outro, por mais privilegiado que seja.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Disposições Gerais</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">13.1. Acordo Completo</h3>
              <p>
                Estes Termos de Uso, juntamente com a Política de Privacidade, constituem o acordo completo
                entre você e a ID Católico.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">13.2. Independência das Cláusulas</h3>
              <p>
                Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais
                disposições permanecerão em pleno vigor e efeito.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">13.3. Renúncia</h3>
              <p>
                A falha em exercer ou fazer valer qualquer direito ou disposição destes Termos não
                constituirá uma renúncia a tal direito ou disposição.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Contato</h2>
              <p>
                Para questões relacionadas a estes Termos de Uso, entre em contato conosco:
              </p>
              <p className="mt-2">
                <strong>E-mail:</strong> contato@idcatolico.com<br />
                <strong>Site:</strong> https://idcatolico.com/
              </p>
            </section>

            <section className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-sm text-gray-700">
                <strong>Importante:</strong> Ao utilizar o ID Católico, você declara ter lido, compreendido
                e concordado com estes Termos de Uso e com a Política de Privacidade.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
