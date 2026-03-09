import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import EmberHero from '../components/hero/EmberHero'
import Nav from '../components/nav/Nav'
import DemoCard from '../components/demos/DemoCard'
import DashboardPreview from '../components/demos/DashboardPreview'
import AiChatPreview from '../components/demos/AiChatPreview'
import AutomationPreview from '../components/demos/AutomationPreview'
import WebsitePreview from '../components/demos/WebsitePreview'
import TextSection from '../components/ui/TextSection'
import ProcessSection from '../components/process/ProcessSection'
import BuilderSection from '../components/builder/BuilderSection'
import CtaSection from '../components/cta/CtaSection'
import Footer from '../components/footer/Footer'
import useIntersection from '../hooks/useIntersection'
import styles from './Home.module.css'

export default function Home() {
  const { t } = useTranslation()
  const process = useIntersection({ threshold: 0.15 })
  const cta = useIntersection({ threshold: 0.15 })
  const footer = useIntersection({ threshold: 0.15 })

  return (
    <div className={styles.home}>
      {/* Réteg 2: EmberHero — 1-2. jelenet (parázs hero + IVERSO felirat) */}
      <EmberHero />
      <div id="hero-area" className={styles.heroSpacer}>
        <p className={styles.slogan}>Let&apos;s build something</p>
      </div>

      {/* Nav */}
      <Nav heroElementId="hero-area" />

      {/* 3. jelenet: 4 demó előzetes — új sorrend + layoutok */}
      <section className={styles.demosSection}>

        {/* 1. Dashboard — STANDARD (DemoCard, mint eddig) */}
        <DemoCard
          titleKey="dashboards.title"
          subtitleKey="dashboards.subtitle"
          linkTo="/dashboardok"
        >
          <DashboardPreview />
        </DemoCard>

        <TextSection>
          <p>{t('demos.dashboard.description')}</p>
        </TextSection>

        {/* 2. AI Chat — SPLIT (szöveg bal, demo jobb) */}
        <div className={styles.splitCard}>
          <div className={styles.splitInfo}>
            <h2 className={styles.splitTitle}>{t('ai.title')}</h2>
            <p className={styles.splitSubtitle}>{t('ai.subtitle')}</p>
            <Link to="/ai" className={styles.splitLink}>{t('demos.more')}</Link>
          </div>
          <div className={styles.splitDemo}>
            <AiChatPreview />
          </div>
        </div>

        <TextSection>
          <p>{t('demos.ai.description')}</p>
        </TextSection>

        {/* 3. Weboldal — FORDÍTOTT SPLIT (demo bal, szöveg jobb) */}
        <div className={styles.reverseSplitCard}>
          <div className={styles.reverseSplitDemo}>
            <WebsitePreview />
          </div>
          <div className={styles.splitInfo}>
            <h2 className={styles.splitTitle}>{t('websites.title')}</h2>
            <p className={styles.splitSubtitle}>{t('websites.subtitle')}</p>
            <Link to="/weboldalak" className={styles.splitLink}>{t('demos.more')}</Link>
          </div>
        </div>

        <TextSection>
          <p>{t('demos.websites.description')}</p>
        </TextSection>

        {/* 4. Automatizáció — CINEMA OVERLAY (demo kitölti, cím overlay) */}
        <div className={styles.cinemaCard}>
          <div className={styles.cinemaOverlay}>
            <div>
              <h2 className={styles.cinemaTitle}>{t('automation.title')}</h2>
              <p className={styles.cinemaSubtitle}>{t('automation.subtitle')}</p>
            </div>
            <Link to="/automatizacio" className={styles.splitLink}>{t('demos.more')}</Link>
          </div>
          <div className={styles.cinemaDemo}>
            <AutomationPreview />
          </div>
        </div>

        <TextSection>
          <p>{t('demos.automation.description')}</p>
        </TextSection>

      </section>

      {/* 4. jelenet: Folyamat — node sequence */}
      <section ref={process.ref} className={styles.processScene}>
        <ProcessSection animated={!process.isVisible} />
      </section>

      {/* 5. jelenet: Építős — block drop */}
      <section className={styles.builderScene}>
        <BuilderSection animated />
      </section>

      {/* 6. jelenet: CTA — glow reveal + bubble pop */}
      <section
        ref={cta.ref}
        className={`${styles.ctaScene} ${cta.isVisible ? styles.visible : ''}`}
      >
        <CtaSection />
      </section>

      {/* 7. jelenet: Footer — simple fade */}
      <section
        ref={footer.ref}
        className={`${styles.footerScene} ${footer.isVisible ? styles.visible : ''}`}
      >
        <Footer />
      </section>
    </div>
  )
}
